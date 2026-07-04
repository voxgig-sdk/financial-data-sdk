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

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
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


    @property
    def basic_information(self):
        """Idiomatic facade: client.basic_information.list() / client.basic_information.load({"id": ...})."""
        from entity.basic_information_entity import BasicInformationEntity
        cached = getattr(self, "_basic_information", None)
        if cached is None:
            cached = BasicInformationEntity(self, None)
            self._basic_information = cached
        return cached

    def BasicInformation(self, data=None):
        # Deprecated: use client.basic_information instead.
        from entity.basic_information_entity import BasicInformationEntity
        return BasicInformationEntity(self, data)


    @property
    def crypto_currency(self):
        """Idiomatic facade: client.crypto_currency.list() / client.crypto_currency.load({"id": ...})."""
        from entity.crypto_currency_entity import CryptoCurrencyEntity
        cached = getattr(self, "_crypto_currency", None)
        if cached is None:
            cached = CryptoCurrencyEntity(self, None)
            self._crypto_currency = cached
        return cached

    def CryptoCurrency(self, data=None):
        # Deprecated: use client.crypto_currency instead.
        from entity.crypto_currency_entity import CryptoCurrencyEntity
        return CryptoCurrencyEntity(self, data)


    @property
    def derivatives_data(self):
        """Idiomatic facade: client.derivatives_data.list() / client.derivatives_data.load({"id": ...})."""
        from entity.derivatives_data_entity import DerivativesDataEntity
        cached = getattr(self, "_derivatives_data", None)
        if cached is None:
            cached = DerivativesDataEntity(self, None)
            self._derivatives_data = cached
        return cached

    def DerivativesData(self, data=None):
        # Deprecated: use client.derivatives_data instead.
        from entity.derivatives_data_entity import DerivativesDataEntity
        return DerivativesDataEntity(self, data)


    @property
    def esg_data(self):
        """Idiomatic facade: client.esg_data.list() / client.esg_data.load({"id": ...})."""
        from entity.esg_data_entity import EsgDataEntity
        cached = getattr(self, "_esg_data", None)
        if cached is None:
            cached = EsgDataEntity(self, None)
            self._esg_data = cached
        return cached

    def EsgData(self, data=None):
        # Deprecated: use client.esg_data instead.
        from entity.esg_data_entity import EsgDataEntity
        return EsgDataEntity(self, data)


    @property
    def etf_data(self):
        """Idiomatic facade: client.etf_data.list() / client.etf_data.load({"id": ...})."""
        from entity.etf_data_entity import EtfDataEntity
        cached = getattr(self, "_etf_data", None)
        if cached is None:
            cached = EtfDataEntity(self, None)
            self._etf_data = cached
        return cached

    def EtfData(self, data=None):
        # Deprecated: use client.etf_data instead.
        from entity.etf_data_entity import EtfDataEntity
        return EtfDataEntity(self, data)


    @property
    def event_calendar(self):
        """Idiomatic facade: client.event_calendar.list() / client.event_calendar.load({"id": ...})."""
        from entity.event_calendar_entity import EventCalendarEntity
        cached = getattr(self, "_event_calendar", None)
        if cached is None:
            cached = EventCalendarEntity(self, None)
            self._event_calendar = cached
        return cached

    def EventCalendar(self, data=None):
        # Deprecated: use client.event_calendar instead.
        from entity.event_calendar_entity import EventCalendarEntity
        return EventCalendarEntity(self, data)


    @property
    def financial_ratio(self):
        """Idiomatic facade: client.financial_ratio.list() / client.financial_ratio.load({"id": ...})."""
        from entity.financial_ratio_entity import FinancialRatioEntity
        cached = getattr(self, "_financial_ratio", None)
        if cached is None:
            cached = FinancialRatioEntity(self, None)
            self._financial_ratio = cached
        return cached

    def FinancialRatio(self, data=None):
        # Deprecated: use client.financial_ratio instead.
        from entity.financial_ratio_entity import FinancialRatioEntity
        return FinancialRatioEntity(self, data)


    @property
    def financial_statement(self):
        """Idiomatic facade: client.financial_statement.list() / client.financial_statement.load({"id": ...})."""
        from entity.financial_statement_entity import FinancialStatementEntity
        cached = getattr(self, "_financial_statement", None)
        if cached is None:
            cached = FinancialStatementEntity(self, None)
            self._financial_statement = cached
        return cached

    def FinancialStatement(self, data=None):
        # Deprecated: use client.financial_statement instead.
        from entity.financial_statement_entity import FinancialStatementEntity
        return FinancialStatementEntity(self, data)


    @property
    def forex_data(self):
        """Idiomatic facade: client.forex_data.list() / client.forex_data.load({"id": ...})."""
        from entity.forex_data_entity import ForexDataEntity
        cached = getattr(self, "_forex_data", None)
        if cached is None:
            cached = ForexDataEntity(self, None)
            self._forex_data = cached
        return cached

    def ForexData(self, data=None):
        # Deprecated: use client.forex_data instead.
        from entity.forex_data_entity import ForexDataEntity
        return ForexDataEntity(self, data)


    @property
    def insider_trading(self):
        """Idiomatic facade: client.insider_trading.list() / client.insider_trading.load({"id": ...})."""
        from entity.insider_trading_entity import InsiderTradingEntity
        cached = getattr(self, "_insider_trading", None)
        if cached is None:
            cached = InsiderTradingEntity(self, None)
            self._insider_trading = cached
        return cached

    def InsiderTrading(self, data=None):
        # Deprecated: use client.insider_trading instead.
        from entity.insider_trading_entity import InsiderTradingEntity
        return InsiderTradingEntity(self, data)


    @property
    def institutional_trading(self):
        """Idiomatic facade: client.institutional_trading.list() / client.institutional_trading.load({"id": ...})."""
        from entity.institutional_trading_entity import InstitutionalTradingEntity
        cached = getattr(self, "_institutional_trading", None)
        if cached is None:
            cached = InstitutionalTradingEntity(self, None)
            self._institutional_trading = cached
        return cached

    def InstitutionalTrading(self, data=None):
        # Deprecated: use client.institutional_trading instead.
        from entity.institutional_trading_entity import InstitutionalTradingEntity
        return InstitutionalTradingEntity(self, data)


    @property
    def investment_adviser(self):
        """Idiomatic facade: client.investment_adviser.list() / client.investment_adviser.load({"id": ...})."""
        from entity.investment_adviser_entity import InvestmentAdviserEntity
        cached = getattr(self, "_investment_adviser", None)
        if cached is None:
            cached = InvestmentAdviserEntity(self, None)
            self._investment_adviser = cached
        return cached

    def InvestmentAdviser(self, data=None):
        # Deprecated: use client.investment_adviser instead.
        from entity.investment_adviser_entity import InvestmentAdviserEntity
        return InvestmentAdviserEntity(self, data)


    @property
    def market_data(self):
        """Idiomatic facade: client.market_data.list() / client.market_data.load({"id": ...})."""
        from entity.market_data_entity import MarketDataEntity
        cached = getattr(self, "_market_data", None)
        if cached is None:
            cached = MarketDataEntity(self, None)
            self._market_data = cached
        return cached

    def MarketData(self, data=None):
        # Deprecated: use client.market_data instead.
        from entity.market_data_entity import MarketDataEntity
        return MarketDataEntity(self, data)


    @property
    def market_index(self):
        """Idiomatic facade: client.market_index.list() / client.market_index.load({"id": ...})."""
        from entity.market_index_entity import MarketIndexEntity
        cached = getattr(self, "_market_index", None)
        if cached is None:
            cached = MarketIndexEntity(self, None)
            self._market_index = cached
        return cached

    def MarketIndex(self, data=None):
        # Deprecated: use client.market_index instead.
        from entity.market_index_entity import MarketIndexEntity
        return MarketIndexEntity(self, data)


    @property
    def market_new(self):
        """Idiomatic facade: client.market_new.list() / client.market_new.load({"id": ...})."""
        from entity.market_new_entity import MarketNewEntity
        cached = getattr(self, "_market_new", None)
        if cached is None:
            cached = MarketNewEntity(self, None)
            self._market_new = cached
        return cached

    def MarketNew(self, data=None):
        # Deprecated: use client.market_new instead.
        from entity.market_new_entity import MarketNewEntity
        return MarketNewEntity(self, data)


    @property
    def miscellaneous_data(self):
        """Idiomatic facade: client.miscellaneous_data.list() / client.miscellaneous_data.load({"id": ...})."""
        from entity.miscellaneous_data_entity import MiscellaneousDataEntity
        cached = getattr(self, "_miscellaneous_data", None)
        if cached is None:
            cached = MiscellaneousDataEntity(self, None)
            self._miscellaneous_data = cached
        return cached

    def MiscellaneousData(self, data=None):
        # Deprecated: use client.miscellaneous_data instead.
        from entity.miscellaneous_data_entity import MiscellaneousDataEntity
        return MiscellaneousDataEntity(self, data)


    @property
    def mutual_fund(self):
        """Idiomatic facade: client.mutual_fund.list() / client.mutual_fund.load({"id": ...})."""
        from entity.mutual_fund_entity import MutualFundEntity
        cached = getattr(self, "_mutual_fund", None)
        if cached is None:
            cached = MutualFundEntity(self, None)
            self._mutual_fund = cached
        return cached

    def MutualFund(self, data=None):
        # Deprecated: use client.mutual_fund instead.
        from entity.mutual_fund_entity import MutualFundEntity
        return MutualFundEntity(self, data)


    @property
    def symbol_list(self):
        """Idiomatic facade: client.symbol_list.list() / client.symbol_list.load({"id": ...})."""
        from entity.symbol_list_entity import SymbolListEntity
        cached = getattr(self, "_symbol_list", None)
        if cached is None:
            cached = SymbolListEntity(self, None)
            self._symbol_list = cached
        return cached

    def SymbolList(self, data=None):
        # Deprecated: use client.symbol_list instead.
        from entity.symbol_list_entity import SymbolListEntity
        return SymbolListEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
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
