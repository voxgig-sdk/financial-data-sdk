-- Typed models for the FinancialData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BasicInformation

---@class BasicInformationLoadMatch
---@field format? string
---@field identifier string
---@field key string

---@class CryptoCurrency

---@class CryptoCurrencyLoadMatch
---@field date? string
---@field format? string
---@field identifier? string
---@field key string

---@class DerivativesData

---@class DerivativesDataLoadMatch
---@field format? string
---@field identifier? string
---@field key string

---@class EsgData

---@class EsgDataLoadMatch
---@field format? string
---@field identifier? string
---@field key string

---@class EtfData

---@class EtfDataLoadMatch
---@field format? string
---@field identifier string
---@field key string

---@class EventCalendar

---@class EventCalendarLoadMatch
---@field format? string
---@field key string

---@class FinancialRatio

---@class FinancialRatioLoadMatch
---@field format? string
---@field identifier string
---@field key string

---@class FinancialStatement

---@class FinancialStatementLoadMatch
---@field format? string
---@field identifier string
---@field key string

---@class ForexData

---@class ForexDataLoadMatch
---@field date? string
---@field format? string
---@field identifier? string
---@field key string

---@class InsiderTrading

---@class InsiderTradingLoadMatch
---@field format? string
---@field identifier? string
---@field key string

---@class InstitutionalTrading

---@class InstitutionalTradingLoadMatch
---@field format? string
---@field identifier? string
---@field key string

---@class InvestmentAdviser

---@class InvestmentAdviserLoadMatch
---@field format? string
---@field key string

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
---@field format? string
---@field identifier string
---@field key string
---@field offset? number

---@class MarketDataListMatch
---@field date? string
---@field format? string
---@field identifier string
---@field key string
---@field offset? number

---@class MarketIndex

---@class MarketIndexLoadMatch
---@field format? string
---@field identifier? string
---@field key string
---@field offset? number

---@class MarketNew

---@class MarketNewLoadMatch
---@field format? string
---@field identifier? string
---@field key string

---@class MiscellaneousData

---@class MiscellaneousDataLoadMatch
---@field format? string
---@field identifier? string
---@field key string

---@class MutualFund

---@class MutualFundLoadMatch
---@field format? string
---@field identifier? string
---@field key string

---@class SymbolList
---@field description? string
---@field registrant_name? string
---@field title_of_security? string
---@field trading_symbol? string

---@class SymbolListListMatch
---@field format? string
---@field key string
---@field offset? number

local M = {}

return M
