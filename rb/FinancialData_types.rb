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

# Request payload for BasicInformation#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
BasicInformationLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# CryptoCurrency entity data model.
class CryptoCurrency
end

# Request payload for CryptoCurrency#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
CryptoCurrencyLoadMatch = Struct.new(
  :date,
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# DerivativesData entity data model.
class DerivativesData
end

# Request payload for DerivativesData#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
DerivativesDataLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# EsgData entity data model.
class EsgData
end

# Request payload for EsgData#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
EsgDataLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# EtfData entity data model.
class EtfData
end

# Request payload for EtfData#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
EtfDataLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# EventCalendar entity data model.
class EventCalendar
end

# Request payload for EventCalendar#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
EventCalendarLoadMatch = Struct.new(
  :format,
  :key,
  keyword_init: true
)

# FinancialRatio entity data model.
class FinancialRatio
end

# Request payload for FinancialRatio#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
FinancialRatioLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# FinancialStatement entity data model.
class FinancialStatement
end

# Request payload for FinancialStatement#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
FinancialStatementLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# ForexData entity data model.
class ForexData
end

# Request payload for ForexData#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
ForexDataLoadMatch = Struct.new(
  :date,
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# InsiderTrading entity data model.
class InsiderTrading
end

# Request payload for InsiderTrading#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
InsiderTradingLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# InstitutionalTrading entity data model.
class InstitutionalTrading
end

# Request payload for InstitutionalTrading#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
InstitutionalTradingLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# InvestmentAdviser entity data model.
class InvestmentAdviser
end

# Request payload for InvestmentAdviser#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
InvestmentAdviserLoadMatch = Struct.new(
  :format,
  :key,
  keyword_init: true
)

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

# Request payload for MarketData#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
MarketDataLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  :offset,
  keyword_init: true
)

# Request payload for MarketData#list.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
MarketDataListMatch = Struct.new(
  :date,
  :format,
  :identifier,
  :key,
  :offset,
  keyword_init: true
)

# MarketIndex entity data model.
class MarketIndex
end

# Request payload for MarketIndex#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
MarketIndexLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  :offset,
  keyword_init: true
)

# MarketNew entity data model.
class MarketNew
end

# Request payload for MarketNew#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
MarketNewLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# MiscellaneousData entity data model.
class MiscellaneousData
end

# Request payload for MiscellaneousData#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
MiscellaneousDataLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

# MutualFund entity data model.
class MutualFund
end

# Request payload for MutualFund#load.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] identifier
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
MutualFundLoadMatch = Struct.new(
  :format,
  :identifier,
  :key,
  keyword_init: true
)

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

# Request payload for SymbolList#list.
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
SymbolListListMatch = Struct.new(
  :format,
  :key,
  :offset,
  keyword_init: true
)

