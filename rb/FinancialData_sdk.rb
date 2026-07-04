# FinancialData SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'FinancialData_types'


class FinancialDataSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = FinancialDataUtility.new
    @_utility = utility

    config = FinancialDataConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = FinancialDataHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = FinancialDataHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, FinancialDataFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    FinancialDataUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = FinancialDataHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = FinancialDataHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = FinancialDataHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = FinancialDataSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue FinancialDataError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = FinancialDataHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = FinancialDataHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.basic_information.list / client.basic_information.load({ "id" => ... })
  def basic_information
    require_relative 'entity/basic_information_entity'
    @basic_information ||= BasicInformationEntity.new(self, nil)
  end

  # Deprecated: use client.basic_information instead.
  def BasicInformation(data = nil)
    require_relative 'entity/basic_information_entity'
    BasicInformationEntity.new(self, data)
  end


  # Idiomatic facade: client.crypto_currency.list / client.crypto_currency.load({ "id" => ... })
  def crypto_currency
    require_relative 'entity/crypto_currency_entity'
    @crypto_currency ||= CryptoCurrencyEntity.new(self, nil)
  end

  # Deprecated: use client.crypto_currency instead.
  def CryptoCurrency(data = nil)
    require_relative 'entity/crypto_currency_entity'
    CryptoCurrencyEntity.new(self, data)
  end


  # Idiomatic facade: client.derivatives_data.list / client.derivatives_data.load({ "id" => ... })
  def derivatives_data
    require_relative 'entity/derivatives_data_entity'
    @derivatives_data ||= DerivativesDataEntity.new(self, nil)
  end

  # Deprecated: use client.derivatives_data instead.
  def DerivativesData(data = nil)
    require_relative 'entity/derivatives_data_entity'
    DerivativesDataEntity.new(self, data)
  end


  # Idiomatic facade: client.esg_data.list / client.esg_data.load({ "id" => ... })
  def esg_data
    require_relative 'entity/esg_data_entity'
    @esg_data ||= EsgDataEntity.new(self, nil)
  end

  # Deprecated: use client.esg_data instead.
  def EsgData(data = nil)
    require_relative 'entity/esg_data_entity'
    EsgDataEntity.new(self, data)
  end


  # Idiomatic facade: client.etf_data.list / client.etf_data.load({ "id" => ... })
  def etf_data
    require_relative 'entity/etf_data_entity'
    @etf_data ||= EtfDataEntity.new(self, nil)
  end

  # Deprecated: use client.etf_data instead.
  def EtfData(data = nil)
    require_relative 'entity/etf_data_entity'
    EtfDataEntity.new(self, data)
  end


  # Idiomatic facade: client.event_calendar.list / client.event_calendar.load({ "id" => ... })
  def event_calendar
    require_relative 'entity/event_calendar_entity'
    @event_calendar ||= EventCalendarEntity.new(self, nil)
  end

  # Deprecated: use client.event_calendar instead.
  def EventCalendar(data = nil)
    require_relative 'entity/event_calendar_entity'
    EventCalendarEntity.new(self, data)
  end


  # Idiomatic facade: client.financial_ratio.list / client.financial_ratio.load({ "id" => ... })
  def financial_ratio
    require_relative 'entity/financial_ratio_entity'
    @financial_ratio ||= FinancialRatioEntity.new(self, nil)
  end

  # Deprecated: use client.financial_ratio instead.
  def FinancialRatio(data = nil)
    require_relative 'entity/financial_ratio_entity'
    FinancialRatioEntity.new(self, data)
  end


  # Idiomatic facade: client.financial_statement.list / client.financial_statement.load({ "id" => ... })
  def financial_statement
    require_relative 'entity/financial_statement_entity'
    @financial_statement ||= FinancialStatementEntity.new(self, nil)
  end

  # Deprecated: use client.financial_statement instead.
  def FinancialStatement(data = nil)
    require_relative 'entity/financial_statement_entity'
    FinancialStatementEntity.new(self, data)
  end


  # Idiomatic facade: client.forex_data.list / client.forex_data.load({ "id" => ... })
  def forex_data
    require_relative 'entity/forex_data_entity'
    @forex_data ||= ForexDataEntity.new(self, nil)
  end

  # Deprecated: use client.forex_data instead.
  def ForexData(data = nil)
    require_relative 'entity/forex_data_entity'
    ForexDataEntity.new(self, data)
  end


  # Idiomatic facade: client.insider_trading.list / client.insider_trading.load({ "id" => ... })
  def insider_trading
    require_relative 'entity/insider_trading_entity'
    @insider_trading ||= InsiderTradingEntity.new(self, nil)
  end

  # Deprecated: use client.insider_trading instead.
  def InsiderTrading(data = nil)
    require_relative 'entity/insider_trading_entity'
    InsiderTradingEntity.new(self, data)
  end


  # Idiomatic facade: client.institutional_trading.list / client.institutional_trading.load({ "id" => ... })
  def institutional_trading
    require_relative 'entity/institutional_trading_entity'
    @institutional_trading ||= InstitutionalTradingEntity.new(self, nil)
  end

  # Deprecated: use client.institutional_trading instead.
  def InstitutionalTrading(data = nil)
    require_relative 'entity/institutional_trading_entity'
    InstitutionalTradingEntity.new(self, data)
  end


  # Idiomatic facade: client.investment_adviser.list / client.investment_adviser.load({ "id" => ... })
  def investment_adviser
    require_relative 'entity/investment_adviser_entity'
    @investment_adviser ||= InvestmentAdviserEntity.new(self, nil)
  end

  # Deprecated: use client.investment_adviser instead.
  def InvestmentAdviser(data = nil)
    require_relative 'entity/investment_adviser_entity'
    InvestmentAdviserEntity.new(self, data)
  end


  # Idiomatic facade: client.market_data.list / client.market_data.load({ "id" => ... })
  def market_data
    require_relative 'entity/market_data_entity'
    @market_data ||= MarketDataEntity.new(self, nil)
  end

  # Deprecated: use client.market_data instead.
  def MarketData(data = nil)
    require_relative 'entity/market_data_entity'
    MarketDataEntity.new(self, data)
  end


  # Idiomatic facade: client.market_index.list / client.market_index.load({ "id" => ... })
  def market_index
    require_relative 'entity/market_index_entity'
    @market_index ||= MarketIndexEntity.new(self, nil)
  end

  # Deprecated: use client.market_index instead.
  def MarketIndex(data = nil)
    require_relative 'entity/market_index_entity'
    MarketIndexEntity.new(self, data)
  end


  # Idiomatic facade: client.market_new.list / client.market_new.load({ "id" => ... })
  def market_new
    require_relative 'entity/market_new_entity'
    @market_new ||= MarketNewEntity.new(self, nil)
  end

  # Deprecated: use client.market_new instead.
  def MarketNew(data = nil)
    require_relative 'entity/market_new_entity'
    MarketNewEntity.new(self, data)
  end


  # Idiomatic facade: client.miscellaneous_data.list / client.miscellaneous_data.load({ "id" => ... })
  def miscellaneous_data
    require_relative 'entity/miscellaneous_data_entity'
    @miscellaneous_data ||= MiscellaneousDataEntity.new(self, nil)
  end

  # Deprecated: use client.miscellaneous_data instead.
  def MiscellaneousData(data = nil)
    require_relative 'entity/miscellaneous_data_entity'
    MiscellaneousDataEntity.new(self, data)
  end


  # Idiomatic facade: client.mutual_fund.list / client.mutual_fund.load({ "id" => ... })
  def mutual_fund
    require_relative 'entity/mutual_fund_entity'
    @mutual_fund ||= MutualFundEntity.new(self, nil)
  end

  # Deprecated: use client.mutual_fund instead.
  def MutualFund(data = nil)
    require_relative 'entity/mutual_fund_entity'
    MutualFundEntity.new(self, data)
  end


  # Idiomatic facade: client.symbol_list.list / client.symbol_list.load({ "id" => ... })
  def symbol_list
    require_relative 'entity/symbol_list_entity'
    @symbol_list ||= SymbolListEntity.new(self, nil)
  end

  # Deprecated: use client.symbol_list instead.
  def SymbolList(data = nil)
    require_relative 'entity/symbol_list_entity'
    SymbolListEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = FinancialDataSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
