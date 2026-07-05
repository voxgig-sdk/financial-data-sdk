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
class BasicInformationLoadMatch
end

# CryptoCurrency entity data model.
class CryptoCurrency
end

# Request payload for CryptoCurrency#load.
class CryptoCurrencyLoadMatch
end

# DerivativesData entity data model.
class DerivativesData
end

# Request payload for DerivativesData#load.
class DerivativesDataLoadMatch
end

# EsgData entity data model.
class EsgData
end

# Request payload for EsgData#load.
class EsgDataLoadMatch
end

# EtfData entity data model.
class EtfData
end

# Request payload for EtfData#load.
class EtfDataLoadMatch
end

# EventCalendar entity data model.
class EventCalendar
end

# Request payload for EventCalendar#load.
class EventCalendarLoadMatch
end

# FinancialRatio entity data model.
class FinancialRatio
end

# Request payload for FinancialRatio#load.
class FinancialRatioLoadMatch
end

# FinancialStatement entity data model.
class FinancialStatement
end

# Request payload for FinancialStatement#load.
class FinancialStatementLoadMatch
end

# ForexData entity data model.
class ForexData
end

# Request payload for ForexData#load.
class ForexDataLoadMatch
end

# InsiderTrading entity data model.
class InsiderTrading
end

# Request payload for InsiderTrading#load.
class InsiderTradingLoadMatch
end

# InstitutionalTrading entity data model.
class InstitutionalTrading
end

# Request payload for InstitutionalTrading#load.
class InstitutionalTradingLoadMatch
end

# InvestmentAdviser entity data model.
class InvestmentAdviser
end

# Request payload for InvestmentAdviser#load.
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

# Request payload for MarketData#load.
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

# Request payload for MarketData#list.
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

# Request payload for MarketIndex#load.
class MarketIndexLoadMatch
end

# MarketNew entity data model.
class MarketNew
end

# Request payload for MarketNew#load.
class MarketNewLoadMatch
end

# MiscellaneousData entity data model.
class MiscellaneousData
end

# Request payload for MiscellaneousData#load.
class MiscellaneousDataLoadMatch
end

# MutualFund entity data model.
class MutualFund
end

# Request payload for MutualFund#load.
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

# Request payload for SymbolList#list.
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

