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


class BasicInformationLoadMatch(TypedDict):
    pass


class CryptoCurrency(TypedDict):
    pass


class CryptoCurrencyLoadMatch(TypedDict):
    pass


class DerivativesData(TypedDict):
    pass


class DerivativesDataLoadMatch(TypedDict):
    pass


class EsgData(TypedDict):
    pass


class EsgDataLoadMatch(TypedDict):
    pass


class EtfData(TypedDict):
    pass


class EtfDataLoadMatch(TypedDict):
    pass


class EventCalendar(TypedDict):
    pass


class EventCalendarLoadMatch(TypedDict):
    pass


class FinancialRatio(TypedDict):
    pass


class FinancialRatioLoadMatch(TypedDict):
    pass


class FinancialStatement(TypedDict):
    pass


class FinancialStatementLoadMatch(TypedDict):
    pass


class ForexData(TypedDict):
    pass


class ForexDataLoadMatch(TypedDict):
    pass


class InsiderTrading(TypedDict):
    pass


class InsiderTradingLoadMatch(TypedDict):
    pass


class InstitutionalTrading(TypedDict):
    pass


class InstitutionalTradingLoadMatch(TypedDict):
    pass


class InvestmentAdviser(TypedDict):
    pass


class InvestmentAdviserLoadMatch(TypedDict):
    pass


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


class MarketDataLoadMatch(TypedDict, total=False):
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


class MarketDataListMatch(TypedDict, total=False):
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


class MarketIndex(TypedDict):
    pass


class MarketIndexLoadMatch(TypedDict):
    pass


class MarketNew(TypedDict):
    pass


class MarketNewLoadMatch(TypedDict):
    pass


class MiscellaneousData(TypedDict):
    pass


class MiscellaneousDataLoadMatch(TypedDict):
    pass


class MutualFund(TypedDict):
    pass


class MutualFundLoadMatch(TypedDict):
    pass


class SymbolList(TypedDict, total=False):
    description: str
    registrant_name: str
    title_of_security: str
    trading_symbol: str


class SymbolListListMatch(TypedDict, total=False):
    description: str
    registrant_name: str
    title_of_security: str
    trading_symbol: str
