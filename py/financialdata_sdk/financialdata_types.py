# Typed models for the FinancialData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BasicInformation(TypedDict):
    pass


class BasicInformationLoadMatchRequired(TypedDict):
    identifier: str
    key: str


class BasicInformationLoadMatch(BasicInformationLoadMatchRequired, total=False):
    format: str


class CryptoCurrency(TypedDict):
    pass


class CryptoCurrencyLoadMatchRequired(TypedDict):
    key: str


class CryptoCurrencyLoadMatch(CryptoCurrencyLoadMatchRequired, total=False):
    date: str
    format: str
    identifier: str


class DerivativesData(TypedDict):
    pass


class DerivativesDataLoadMatchRequired(TypedDict):
    key: str


class DerivativesDataLoadMatch(DerivativesDataLoadMatchRequired, total=False):
    format: str
    identifier: str


class EsgData(TypedDict):
    pass


class EsgDataLoadMatchRequired(TypedDict):
    key: str


class EsgDataLoadMatch(EsgDataLoadMatchRequired, total=False):
    format: str
    identifier: str


class EtfData(TypedDict):
    pass


class EtfDataLoadMatchRequired(TypedDict):
    identifier: str
    key: str


class EtfDataLoadMatch(EtfDataLoadMatchRequired, total=False):
    format: str


class EventCalendar(TypedDict):
    pass


class EventCalendarLoadMatchRequired(TypedDict):
    key: str


class EventCalendarLoadMatch(EventCalendarLoadMatchRequired, total=False):
    format: str


class FinancialRatio(TypedDict):
    pass


class FinancialRatioLoadMatchRequired(TypedDict):
    identifier: str
    key: str


class FinancialRatioLoadMatch(FinancialRatioLoadMatchRequired, total=False):
    format: str


class FinancialStatement(TypedDict):
    pass


class FinancialStatementLoadMatchRequired(TypedDict):
    identifier: str
    key: str


class FinancialStatementLoadMatch(FinancialStatementLoadMatchRequired, total=False):
    format: str


class ForexData(TypedDict):
    pass


class ForexDataLoadMatchRequired(TypedDict):
    key: str


class ForexDataLoadMatch(ForexDataLoadMatchRequired, total=False):
    date: str
    format: str
    identifier: str


class InsiderTrading(TypedDict):
    pass


class InsiderTradingLoadMatchRequired(TypedDict):
    key: str


class InsiderTradingLoadMatch(InsiderTradingLoadMatchRequired, total=False):
    format: str
    identifier: str


class InstitutionalTrading(TypedDict):
    pass


class InstitutionalTradingLoadMatchRequired(TypedDict):
    key: str


class InstitutionalTradingLoadMatch(InstitutionalTradingLoadMatchRequired, total=False):
    format: str
    identifier: str


class InvestmentAdviser(TypedDict):
    pass


class InvestmentAdviserLoadMatchRequired(TypedDict):
    key: str


class InvestmentAdviserLoadMatch(InvestmentAdviserLoadMatchRequired, total=False):
    format: str


class MarketData(TypedDict, total=False):
    change: float
    close: float
    date: str
    high: float
    low: float
    open: float
    percentage_change: float
    price: float
    registrant_name: str
    time: str
    trading_symbol: str
    volume: float


class MarketDataLoadMatchRequired(TypedDict):
    identifier: str
    key: str


class MarketDataLoadMatch(MarketDataLoadMatchRequired, total=False):
    format: str
    offset: int


class MarketDataListMatchRequired(TypedDict):
    identifier: str
    key: str


class MarketDataListMatch(MarketDataListMatchRequired, total=False):
    date: str
    format: str
    offset: int


class MarketIndex(TypedDict):
    pass


class MarketIndexLoadMatchRequired(TypedDict):
    key: str


class MarketIndexLoadMatch(MarketIndexLoadMatchRequired, total=False):
    format: str
    identifier: str
    offset: int


class MarketNew(TypedDict):
    pass


class MarketNewLoadMatchRequired(TypedDict):
    key: str


class MarketNewLoadMatch(MarketNewLoadMatchRequired, total=False):
    format: str
    identifier: str


class MiscellaneousData(TypedDict):
    pass


class MiscellaneousDataLoadMatchRequired(TypedDict):
    key: str


class MiscellaneousDataLoadMatch(MiscellaneousDataLoadMatchRequired, total=False):
    format: str
    identifier: str


class MutualFund(TypedDict):
    pass


class MutualFundLoadMatchRequired(TypedDict):
    key: str


class MutualFundLoadMatch(MutualFundLoadMatchRequired, total=False):
    format: str
    identifier: str


class SymbolList(TypedDict, total=False):
    description: str
    registrant_name: str
    title_of_security: str
    trading_symbol: str


class SymbolListListMatchRequired(TypedDict):
    key: str


class SymbolListListMatch(SymbolListListMatchRequired, total=False):
    format: str
    offset: int
