# FinancialData SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import FinancialDataUtility
from core.spec import FinancialDataSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import FinancialDataBaseFeature
from features import _make_feature


class FinancialDataSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = FinancialDataUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return FinancialDataUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = FinancialDataSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def BasicInformation(self, data=None) -> "BasicInformationEntity":
        """Entity factory: client.BasicInformation().list() / client.BasicInformation().load({"id": ...})."""
        from entity.basic_information_entity import BasicInformationEntity
        return BasicInformationEntity(self, data)


    def CryptoCurrency(self, data=None) -> "CryptoCurrencyEntity":
        """Entity factory: client.CryptoCurrency().list() / client.CryptoCurrency().load({"id": ...})."""
        from entity.crypto_currency_entity import CryptoCurrencyEntity
        return CryptoCurrencyEntity(self, data)


    def DerivativesData(self, data=None) -> "DerivativesDataEntity":
        """Entity factory: client.DerivativesData().list() / client.DerivativesData().load({"id": ...})."""
        from entity.derivatives_data_entity import DerivativesDataEntity
        return DerivativesDataEntity(self, data)


    def EsgData(self, data=None) -> "EsgDataEntity":
        """Entity factory: client.EsgData().list() / client.EsgData().load({"id": ...})."""
        from entity.esg_data_entity import EsgDataEntity
        return EsgDataEntity(self, data)


    def EtfData(self, data=None) -> "EtfDataEntity":
        """Entity factory: client.EtfData().list() / client.EtfData().load({"id": ...})."""
        from entity.etf_data_entity import EtfDataEntity
        return EtfDataEntity(self, data)


    def EventCalendar(self, data=None) -> "EventCalendarEntity":
        """Entity factory: client.EventCalendar().list() / client.EventCalendar().load({"id": ...})."""
        from entity.event_calendar_entity import EventCalendarEntity
        return EventCalendarEntity(self, data)


    def FinancialRatio(self, data=None) -> "FinancialRatioEntity":
        """Entity factory: client.FinancialRatio().list() / client.FinancialRatio().load({"id": ...})."""
        from entity.financial_ratio_entity import FinancialRatioEntity
        return FinancialRatioEntity(self, data)


    def FinancialStatement(self, data=None) -> "FinancialStatementEntity":
        """Entity factory: client.FinancialStatement().list() / client.FinancialStatement().load({"id": ...})."""
        from entity.financial_statement_entity import FinancialStatementEntity
        return FinancialStatementEntity(self, data)


    def ForexData(self, data=None) -> "ForexDataEntity":
        """Entity factory: client.ForexData().list() / client.ForexData().load({"id": ...})."""
        from entity.forex_data_entity import ForexDataEntity
        return ForexDataEntity(self, data)


    def InsiderTrading(self, data=None) -> "InsiderTradingEntity":
        """Entity factory: client.InsiderTrading().list() / client.InsiderTrading().load({"id": ...})."""
        from entity.insider_trading_entity import InsiderTradingEntity
        return InsiderTradingEntity(self, data)


    def InstitutionalTrading(self, data=None) -> "InstitutionalTradingEntity":
        """Entity factory: client.InstitutionalTrading().list() / client.InstitutionalTrading().load({"id": ...})."""
        from entity.institutional_trading_entity import InstitutionalTradingEntity
        return InstitutionalTradingEntity(self, data)


    def InvestmentAdviser(self, data=None) -> "InvestmentAdviserEntity":
        """Entity factory: client.InvestmentAdviser().list() / client.InvestmentAdviser().load({"id": ...})."""
        from entity.investment_adviser_entity import InvestmentAdviserEntity
        return InvestmentAdviserEntity(self, data)


    def MarketData(self, data=None) -> "MarketDataEntity":
        """Entity factory: client.MarketData().list() / client.MarketData().load({"id": ...})."""
        from entity.market_data_entity import MarketDataEntity
        return MarketDataEntity(self, data)


    def MarketIndex(self, data=None) -> "MarketIndexEntity":
        """Entity factory: client.MarketIndex().list() / client.MarketIndex().load({"id": ...})."""
        from entity.market_index_entity import MarketIndexEntity
        return MarketIndexEntity(self, data)


    def MarketNew(self, data=None) -> "MarketNewEntity":
        """Entity factory: client.MarketNew().list() / client.MarketNew().load({"id": ...})."""
        from entity.market_new_entity import MarketNewEntity
        return MarketNewEntity(self, data)


    def MiscellaneousData(self, data=None) -> "MiscellaneousDataEntity":
        """Entity factory: client.MiscellaneousData().list() / client.MiscellaneousData().load({"id": ...})."""
        from entity.miscellaneous_data_entity import MiscellaneousDataEntity
        return MiscellaneousDataEntity(self, data)


    def MutualFund(self, data=None) -> "MutualFundEntity":
        """Entity factory: client.MutualFund().list() / client.MutualFund().load({"id": ...})."""
        from entity.mutual_fund_entity import MutualFundEntity
        return MutualFundEntity(self, data)


    def SymbolList(self, data=None) -> "SymbolListEntity":
        """Entity factory: client.SymbolList().list() / client.SymbolList().load({"id": ...})."""
        from entity.symbol_list_entity import SymbolListEntity
        return SymbolListEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "FinancialDataSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.basic_information_entity import BasicInformationEntity
    from entity.crypto_currency_entity import CryptoCurrencyEntity
    from entity.derivatives_data_entity import DerivativesDataEntity
    from entity.esg_data_entity import EsgDataEntity
    from entity.etf_data_entity import EtfDataEntity
    from entity.event_calendar_entity import EventCalendarEntity
    from entity.financial_ratio_entity import FinancialRatioEntity
    from entity.financial_statement_entity import FinancialStatementEntity
    from entity.forex_data_entity import ForexDataEntity
    from entity.insider_trading_entity import InsiderTradingEntity
    from entity.institutional_trading_entity import InstitutionalTradingEntity
    from entity.investment_adviser_entity import InvestmentAdviserEntity
    from entity.market_data_entity import MarketDataEntity
    from entity.market_index_entity import MarketIndexEntity
    from entity.market_new_entity import MarketNewEntity
    from entity.miscellaneous_data_entity import MiscellaneousDataEntity
    from entity.mutual_fund_entity import MutualFundEntity
    from entity.symbol_list_entity import SymbolListEntity
