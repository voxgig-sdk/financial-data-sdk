# frozen_string_literal: true

# Typed models for the FinancialData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BasicInformation entity data model.
class BasicInformation
end

# Match filter for BasicInformation#load (any subset of BasicInformation fields).
class BasicInformationLoadMatch
end

# CryptoCurrency entity data model.
class CryptoCurrency
end

# Match filter for CryptoCurrency#load (any subset of CryptoCurrency fields).
class CryptoCurrencyLoadMatch
end

# DerivativesData entity data model.
class DerivativesData
end

# Match filter for DerivativesData#load (any subset of DerivativesData fields).
class DerivativesDataLoadMatch
end

# EsgData entity data model.
class EsgData
end

# Match filter for EsgData#load (any subset of EsgData fields).
class EsgDataLoadMatch
end

# EtfData entity data model.
class EtfData
end

# Match filter for EtfData#load (any subset of EtfData fields).
class EtfDataLoadMatch
end

# EventCalendar entity data model.
class EventCalendar
end

# Match filter for EventCalendar#load (any subset of EventCalendar fields).
class EventCalendarLoadMatch
end

# FinancialRatio entity data model.
class FinancialRatio
end

# Match filter for FinancialRatio#load (any subset of FinancialRatio fields).
class FinancialRatioLoadMatch
end

# FinancialStatement entity data model.
class FinancialStatement
end

# Match filter for FinancialStatement#load (any subset of FinancialStatement fields).
class FinancialStatementLoadMatch
end

# ForexData entity data model.
class ForexData
end

# Match filter for ForexData#load (any subset of ForexData fields).
class ForexDataLoadMatch
end

# InsiderTrading entity data model.
class InsiderTrading
end

# Match filter for InsiderTrading#load (any subset of InsiderTrading fields).
class InsiderTradingLoadMatch
end

# InstitutionalTrading entity data model.
class InstitutionalTrading
end

# Match filter for InstitutionalTrading#load (any subset of InstitutionalTrading fields).
class InstitutionalTradingLoadMatch
end

# InvestmentAdviser entity data model.
class InvestmentAdviser
end

# Match filter for InvestmentAdviser#load (any subset of InvestmentAdviser fields).
class InvestmentAdviserLoadMatch
end

# MarketData entity data model.
#
# @!attribute [rw] change
#   @return [Float, nil]
#
# @!attribute [rw] close
#   @return [Float, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] high
#   @return [Float, nil]
#
# @!attribute [rw] low
#   @return [Float, nil]
#
# @!attribute [rw] open
#   @return [Float, nil]
#
# @!attribute [rw] percentage_change
#   @return [Float, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] registrant_name
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] trading_symbol
#   @return [String, nil]
#
# @!attribute [rw] volume
#   @return [Float, nil]
MarketData = Struct.new(
  :change,
  :close,
  :date,
  :high,
  :low,
  :open,
  :percentage_change,
  :price,
  :registrant_name,
  :time,
  :trading_symbol,
  :volume,
  keyword_init: true
)

# Match filter for MarketData#load (any subset of MarketData fields).
#
# @!attribute [rw] change
#   @return [Float, nil]
#
# @!attribute [rw] close
#   @return [Float, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] high
#   @return [Float, nil]
#
# @!attribute [rw] low
#   @return [Float, nil]
#
# @!attribute [rw] open
#   @return [Float, nil]
#
# @!attribute [rw] percentage_change
#   @return [Float, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] registrant_name
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] trading_symbol
#   @return [String, nil]
#
# @!attribute [rw] volume
#   @return [Float, nil]
MarketDataLoadMatch = Struct.new(
  :change,
  :close,
  :date,
  :high,
  :low,
  :open,
  :percentage_change,
  :price,
  :registrant_name,
  :time,
  :trading_symbol,
  :volume,
  keyword_init: true
)

# Match filter for MarketData#list (any subset of MarketData fields).
#
# @!attribute [rw] change
#   @return [Float, nil]
#
# @!attribute [rw] close
#   @return [Float, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] high
#   @return [Float, nil]
#
# @!attribute [rw] low
#   @return [Float, nil]
#
# @!attribute [rw] open
#   @return [Float, nil]
#
# @!attribute [rw] percentage_change
#   @return [Float, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] registrant_name
#   @return [String, nil]
#
# @!attribute [rw] time
#   @return [String, nil]
#
# @!attribute [rw] trading_symbol
#   @return [String, nil]
#
# @!attribute [rw] volume
#   @return [Float, nil]
MarketDataListMatch = Struct.new(
  :change,
  :close,
  :date,
  :high,
  :low,
  :open,
  :percentage_change,
  :price,
  :registrant_name,
  :time,
  :trading_symbol,
  :volume,
  keyword_init: true
)

# MarketIndex entity data model.
class MarketIndex
end

# Match filter for MarketIndex#load (any subset of MarketIndex fields).
class MarketIndexLoadMatch
end

# MarketNew entity data model.
class MarketNew
end

# Match filter for MarketNew#load (any subset of MarketNew fields).
class MarketNewLoadMatch
end

# MiscellaneousData entity data model.
class MiscellaneousData
end

# Match filter for MiscellaneousData#load (any subset of MiscellaneousData fields).
class MiscellaneousDataLoadMatch
end

# MutualFund entity data model.
class MutualFund
end

# Match filter for MutualFund#load (any subset of MutualFund fields).
class MutualFundLoadMatch
end

# SymbolList entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] registrant_name
#   @return [String, nil]
#
# @!attribute [rw] title_of_security
#   @return [String, nil]
#
# @!attribute [rw] trading_symbol
#   @return [String, nil]
SymbolList = Struct.new(
  :description,
  :registrant_name,
  :title_of_security,
  :trading_symbol,
  keyword_init: true
)

# Match filter for SymbolList#list (any subset of SymbolList fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] registrant_name
#   @return [String, nil]
#
# @!attribute [rw] title_of_security
#   @return [String, nil]
#
# @!attribute [rw] trading_symbol
#   @return [String, nil]
SymbolListListMatch = Struct.new(
  :description,
  :registrant_name,
  :title_of_security,
  :trading_symbol,
  keyword_init: true
)

