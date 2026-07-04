# Typed models for the FinancialData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class BasicInformation:
    pass


@dataclass
class BasicInformationLoadMatch:
    pass


@dataclass
class CryptoCurrency:
    pass


@dataclass
class CryptoCurrencyLoadMatch:
    pass


@dataclass
class DerivativesData:
    pass


@dataclass
class DerivativesDataLoadMatch:
    pass


@dataclass
class EsgData:
    pass


@dataclass
class EsgDataLoadMatch:
    pass


@dataclass
class EtfData:
    pass


@dataclass
class EtfDataLoadMatch:
    pass


@dataclass
class EventCalendar:
    pass


@dataclass
class EventCalendarLoadMatch:
    pass


@dataclass
class FinancialRatio:
    pass


@dataclass
class FinancialRatioLoadMatch:
    pass


@dataclass
class FinancialStatement:
    pass


@dataclass
class FinancialStatementLoadMatch:
    pass


@dataclass
class ForexData:
    pass


@dataclass
class ForexDataLoadMatch:
    pass


@dataclass
class InsiderTrading:
    pass


@dataclass
class InsiderTradingLoadMatch:
    pass


@dataclass
class InstitutionalTrading:
    pass


@dataclass
class InstitutionalTradingLoadMatch:
    pass


@dataclass
class InvestmentAdviser:
    pass


@dataclass
class InvestmentAdviserLoadMatch:
    pass


@dataclass
class MarketData:
    change: Optional[float] = None
    close: Optional[float] = None
    date: Optional[str] = None
    high: Optional[float] = None
    low: Optional[float] = None
    open: Optional[float] = None
    percentage_change: Optional[float] = None
    price: Optional[float] = None
    registrant_name: Optional[str] = None
    time: Optional[str] = None
    trading_symbol: Optional[str] = None
    volume: Optional[float] = None


@dataclass
class MarketDataLoadMatch:
    change: Optional[float] = None
    close: Optional[float] = None
    date: Optional[str] = None
    high: Optional[float] = None
    low: Optional[float] = None
    open: Optional[float] = None
    percentage_change: Optional[float] = None
    price: Optional[float] = None
    registrant_name: Optional[str] = None
    time: Optional[str] = None
    trading_symbol: Optional[str] = None
    volume: Optional[float] = None


@dataclass
class MarketDataListMatch:
    change: Optional[float] = None
    close: Optional[float] = None
    date: Optional[str] = None
    high: Optional[float] = None
    low: Optional[float] = None
    open: Optional[float] = None
    percentage_change: Optional[float] = None
    price: Optional[float] = None
    registrant_name: Optional[str] = None
    time: Optional[str] = None
    trading_symbol: Optional[str] = None
    volume: Optional[float] = None


@dataclass
class MarketIndex:
    pass


@dataclass
class MarketIndexLoadMatch:
    pass


@dataclass
class MarketNew:
    pass


@dataclass
class MarketNewLoadMatch:
    pass


@dataclass
class MiscellaneousData:
    pass


@dataclass
class MiscellaneousDataLoadMatch:
    pass


@dataclass
class MutualFund:
    pass


@dataclass
class MutualFundLoadMatch:
    pass


@dataclass
class SymbolList:
    description: Optional[str] = None
    registrant_name: Optional[str] = None
    title_of_security: Optional[str] = None
    trading_symbol: Optional[str] = None


@dataclass
class SymbolListListMatch:
    description: Optional[str] = None
    registrant_name: Optional[str] = None
    title_of_security: Optional[str] = None
    trading_symbol: Optional[str] = None

