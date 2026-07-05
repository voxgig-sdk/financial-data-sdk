-- Typed models for the FinancialData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BasicInformation

---@class BasicInformationLoadMatch

---@class CryptoCurrency

---@class CryptoCurrencyLoadMatch

---@class DerivativesData

---@class DerivativesDataLoadMatch

---@class EsgData

---@class EsgDataLoadMatch

---@class EtfData

---@class EtfDataLoadMatch

---@class EventCalendar

---@class EventCalendarLoadMatch

---@class FinancialRatio

---@class FinancialRatioLoadMatch

---@class FinancialStatement

---@class FinancialStatementLoadMatch

---@class ForexData

---@class ForexDataLoadMatch

---@class InsiderTrading

---@class InsiderTradingLoadMatch

---@class InstitutionalTrading

---@class InstitutionalTradingLoadMatch

---@class InvestmentAdviser

---@class InvestmentAdviserLoadMatch

---@class MarketData
---@field change? number
---@field close? number
---@field date? string
---@field high? number
---@field low? number
---@field open? number
---@field percentage_change? number
---@field price? number
---@field registrant_name? string
---@field time? string
---@field trading_symbol? string
---@field volume? number

---@class MarketDataLoadMatch
---@field change? number
---@field close? number
---@field date? string
---@field high? number
---@field low? number
---@field open? number
---@field percentage_change? number
---@field price? number
---@field registrant_name? string
---@field time? string
---@field trading_symbol? string
---@field volume? number

---@class MarketDataListMatch
---@field change? number
---@field close? number
---@field date? string
---@field high? number
---@field low? number
---@field open? number
---@field percentage_change? number
---@field price? number
---@field registrant_name? string
---@field time? string
---@field trading_symbol? string
---@field volume? number

---@class MarketIndex

---@class MarketIndexLoadMatch

---@class MarketNew

---@class MarketNewLoadMatch

---@class MiscellaneousData

---@class MiscellaneousDataLoadMatch

---@class MutualFund

---@class MutualFundLoadMatch

---@class SymbolList
---@field description? string
---@field registrant_name? string
---@field title_of_security? string
---@field trading_symbol? string

---@class SymbolListListMatch
---@field description? string
---@field registrant_name? string
---@field title_of_security? string
---@field trading_symbol? string

local M = {}

return M
