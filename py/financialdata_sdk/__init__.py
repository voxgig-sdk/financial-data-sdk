# FinancialData SDK

from financialdata_sdk.utility.voxgig_struct import voxgig_struct as vs
from financialdata_sdk.core.utility_type import FinancialDataUtility
from financialdata_sdk.core.spec import FinancialDataSpec
from financialdata_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from financialdata_sdk.utility import register

# Load features
from financialdata_sdk.feature.base_feature import FinancialDataBaseFeature
from financialdata_sdk.features import _make_feature


class FinancialDataSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = FinancialDataUtility()
        self._utility = utility

        from financialdata_sdk.config import shared_config
        config = shared_config()

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

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "FinancialDataSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
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

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("FinancialDataSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def BasicInformation(self, data=None) -> "BasicInformationEntity":
        """Entity factory: client.BasicInformation().list() / client.BasicInformation().load({"id": ...})."""
        from financialdata_sdk.entity.basic_information_entity import BasicInformationEntity
        return BasicInformationEntity(self, data)


    def CryptoCurrency(self, data=None) -> "CryptoCurrencyEntity":
        """Entity factory: client.CryptoCurrency().list() / client.CryptoCurrency().load({"id": ...})."""
        from financialdata_sdk.entity.crypto_currency_entity import CryptoCurrencyEntity
        return CryptoCurrencyEntity(self, data)


    def DerivativesData(self, data=None) -> "DerivativesDataEntity":
        """Entity factory: client.DerivativesData().list() / client.DerivativesData().load({"id": ...})."""
        from financialdata_sdk.entity.derivatives_data_entity import DerivativesDataEntity
        return DerivativesDataEntity(self, data)


    def EsgData(self, data=None) -> "EsgDataEntity":
        """Entity factory: client.EsgData().list() / client.EsgData().load({"id": ...})."""
        from financialdata_sdk.entity.esg_data_entity import EsgDataEntity
        return EsgDataEntity(self, data)


    def EtfData(self, data=None) -> "EtfDataEntity":
        """Entity factory: client.EtfData().list() / client.EtfData().load({"id": ...})."""
        from financialdata_sdk.entity.etf_data_entity import EtfDataEntity
        return EtfDataEntity(self, data)


    def EventCalendar(self, data=None) -> "EventCalendarEntity":
        """Entity factory: client.EventCalendar().list() / client.EventCalendar().load({"id": ...})."""
        from financialdata_sdk.entity.event_calendar_entity import EventCalendarEntity
        return EventCalendarEntity(self, data)


    def FinancialRatio(self, data=None) -> "FinancialRatioEntity":
        """Entity factory: client.FinancialRatio().list() / client.FinancialRatio().load({"id": ...})."""
        from financialdata_sdk.entity.financial_ratio_entity import FinancialRatioEntity
        return FinancialRatioEntity(self, data)


    def FinancialStatement(self, data=None) -> "FinancialStatementEntity":
        """Entity factory: client.FinancialStatement().list() / client.FinancialStatement().load({"id": ...})."""
        from financialdata_sdk.entity.financial_statement_entity import FinancialStatementEntity
        return FinancialStatementEntity(self, data)


    def ForexData(self, data=None) -> "ForexDataEntity":
        """Entity factory: client.ForexData().list() / client.ForexData().load({"id": ...})."""
        from financialdata_sdk.entity.forex_data_entity import ForexDataEntity
        return ForexDataEntity(self, data)


    def InsiderTrading(self, data=None) -> "InsiderTradingEntity":
        """Entity factory: client.InsiderTrading().list() / client.InsiderTrading().load({"id": ...})."""
        from financialdata_sdk.entity.insider_trading_entity import InsiderTradingEntity
        return InsiderTradingEntity(self, data)


    def InstitutionalTrading(self, data=None) -> "InstitutionalTradingEntity":
        """Entity factory: client.InstitutionalTrading().list() / client.InstitutionalTrading().load({"id": ...})."""
        from financialdata_sdk.entity.institutional_trading_entity import InstitutionalTradingEntity
        return InstitutionalTradingEntity(self, data)


    def InvestmentAdviser(self, data=None) -> "InvestmentAdviserEntity":
        """Entity factory: client.InvestmentAdviser().list() / client.InvestmentAdviser().load({"id": ...})."""
        from financialdata_sdk.entity.investment_adviser_entity import InvestmentAdviserEntity
        return InvestmentAdviserEntity(self, data)


    def MarketData(self, data=None) -> "MarketDataEntity":
        """Entity factory: client.MarketData().list() / client.MarketData().load({"id": ...})."""
        from financialdata_sdk.entity.market_data_entity import MarketDataEntity
        return MarketDataEntity(self, data)


    def MarketIndex(self, data=None) -> "MarketIndexEntity":
        """Entity factory: client.MarketIndex().list() / client.MarketIndex().load({"id": ...})."""
        from financialdata_sdk.entity.market_index_entity import MarketIndexEntity
        return MarketIndexEntity(self, data)


    def MarketNew(self, data=None) -> "MarketNewEntity":
        """Entity factory: client.MarketNew().list() / client.MarketNew().load({"id": ...})."""
        from financialdata_sdk.entity.market_new_entity import MarketNewEntity
        return MarketNewEntity(self, data)


    def MiscellaneousData(self, data=None) -> "MiscellaneousDataEntity":
        """Entity factory: client.MiscellaneousData().list() / client.MiscellaneousData().load({"id": ...})."""
        from financialdata_sdk.entity.miscellaneous_data_entity import MiscellaneousDataEntity
        return MiscellaneousDataEntity(self, data)


    def MutualFund(self, data=None) -> "MutualFundEntity":
        """Entity factory: client.MutualFund().list() / client.MutualFund().load({"id": ...})."""
        from financialdata_sdk.entity.mutual_fund_entity import MutualFundEntity
        return MutualFundEntity(self, data)


    def SymbolList(self, data=None) -> "SymbolListEntity":
        """Entity factory: client.SymbolList().list() / client.SymbolList().load({"id": ...})."""
        from financialdata_sdk.entity.symbol_list_entity import SymbolListEntity
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
    from financialdata_sdk.entity.basic_information_entity import BasicInformationEntity
    from financialdata_sdk.entity.crypto_currency_entity import CryptoCurrencyEntity
    from financialdata_sdk.entity.derivatives_data_entity import DerivativesDataEntity
    from financialdata_sdk.entity.esg_data_entity import EsgDataEntity
    from financialdata_sdk.entity.etf_data_entity import EtfDataEntity
    from financialdata_sdk.entity.event_calendar_entity import EventCalendarEntity
    from financialdata_sdk.entity.financial_ratio_entity import FinancialRatioEntity
    from financialdata_sdk.entity.financial_statement_entity import FinancialStatementEntity
    from financialdata_sdk.entity.forex_data_entity import ForexDataEntity
    from financialdata_sdk.entity.insider_trading_entity import InsiderTradingEntity
    from financialdata_sdk.entity.institutional_trading_entity import InstitutionalTradingEntity
    from financialdata_sdk.entity.investment_adviser_entity import InvestmentAdviserEntity
    from financialdata_sdk.entity.market_data_entity import MarketDataEntity
    from financialdata_sdk.entity.market_index_entity import MarketIndexEntity
    from financialdata_sdk.entity.market_new_entity import MarketNewEntity
    from financialdata_sdk.entity.miscellaneous_data_entity import MiscellaneousDataEntity
    from financialdata_sdk.entity.mutual_fund_entity import MutualFundEntity
    from financialdata_sdk.entity.symbol_list_entity import SymbolListEntity
