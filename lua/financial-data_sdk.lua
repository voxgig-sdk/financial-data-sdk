-- FinancialData SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local FinancialDataSDK = {}
FinancialDataSDK.__index = FinancialDataSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

FinancialDataSDK._make_feature = _make_feature


function FinancialDataSDK.new(options)
  local self = setmetatable({}, FinancialDataSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function FinancialDataSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function FinancialDataSDK:get_utility()
  return Utility.copy(self._utility)
end


function FinancialDataSDK:get_root_ctx()
  return self._rootctx
end


function FinancialDataSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function FinancialDataSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:basic_information():list() / client:basic_information():load({ id = ... })
function FinancialDataSDK:basic_information(data)
  local EntityMod = require("entity.basic_information_entity")
  if data == nil then
    if self._basic_information == nil then
      self._basic_information = EntityMod.new(self, nil)
    end
    return self._basic_information
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:basic_information() instead.
function FinancialDataSDK:BasicInformation(data)
  local EntityMod = require("entity.basic_information_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:crypto_currency():list() / client:crypto_currency():load({ id = ... })
function FinancialDataSDK:crypto_currency(data)
  local EntityMod = require("entity.crypto_currency_entity")
  if data == nil then
    if self._crypto_currency == nil then
      self._crypto_currency = EntityMod.new(self, nil)
    end
    return self._crypto_currency
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:crypto_currency() instead.
function FinancialDataSDK:CryptoCurrency(data)
  local EntityMod = require("entity.crypto_currency_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:derivatives_data():list() / client:derivatives_data():load({ id = ... })
function FinancialDataSDK:derivatives_data(data)
  local EntityMod = require("entity.derivatives_data_entity")
  if data == nil then
    if self._derivatives_data == nil then
      self._derivatives_data = EntityMod.new(self, nil)
    end
    return self._derivatives_data
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:derivatives_data() instead.
function FinancialDataSDK:DerivativesData(data)
  local EntityMod = require("entity.derivatives_data_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:esg_data():list() / client:esg_data():load({ id = ... })
function FinancialDataSDK:esg_data(data)
  local EntityMod = require("entity.esg_data_entity")
  if data == nil then
    if self._esg_data == nil then
      self._esg_data = EntityMod.new(self, nil)
    end
    return self._esg_data
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:esg_data() instead.
function FinancialDataSDK:EsgData(data)
  local EntityMod = require("entity.esg_data_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:etf_data():list() / client:etf_data():load({ id = ... })
function FinancialDataSDK:etf_data(data)
  local EntityMod = require("entity.etf_data_entity")
  if data == nil then
    if self._etf_data == nil then
      self._etf_data = EntityMod.new(self, nil)
    end
    return self._etf_data
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:etf_data() instead.
function FinancialDataSDK:EtfData(data)
  local EntityMod = require("entity.etf_data_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:event_calendar():list() / client:event_calendar():load({ id = ... })
function FinancialDataSDK:event_calendar(data)
  local EntityMod = require("entity.event_calendar_entity")
  if data == nil then
    if self._event_calendar == nil then
      self._event_calendar = EntityMod.new(self, nil)
    end
    return self._event_calendar
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:event_calendar() instead.
function FinancialDataSDK:EventCalendar(data)
  local EntityMod = require("entity.event_calendar_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:financial_ratio():list() / client:financial_ratio():load({ id = ... })
function FinancialDataSDK:financial_ratio(data)
  local EntityMod = require("entity.financial_ratio_entity")
  if data == nil then
    if self._financial_ratio == nil then
      self._financial_ratio = EntityMod.new(self, nil)
    end
    return self._financial_ratio
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:financial_ratio() instead.
function FinancialDataSDK:FinancialRatio(data)
  local EntityMod = require("entity.financial_ratio_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:financial_statement():list() / client:financial_statement():load({ id = ... })
function FinancialDataSDK:financial_statement(data)
  local EntityMod = require("entity.financial_statement_entity")
  if data == nil then
    if self._financial_statement == nil then
      self._financial_statement = EntityMod.new(self, nil)
    end
    return self._financial_statement
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:financial_statement() instead.
function FinancialDataSDK:FinancialStatement(data)
  local EntityMod = require("entity.financial_statement_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:forex_data():list() / client:forex_data():load({ id = ... })
function FinancialDataSDK:forex_data(data)
  local EntityMod = require("entity.forex_data_entity")
  if data == nil then
    if self._forex_data == nil then
      self._forex_data = EntityMod.new(self, nil)
    end
    return self._forex_data
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:forex_data() instead.
function FinancialDataSDK:ForexData(data)
  local EntityMod = require("entity.forex_data_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:insider_trading():list() / client:insider_trading():load({ id = ... })
function FinancialDataSDK:insider_trading(data)
  local EntityMod = require("entity.insider_trading_entity")
  if data == nil then
    if self._insider_trading == nil then
      self._insider_trading = EntityMod.new(self, nil)
    end
    return self._insider_trading
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:insider_trading() instead.
function FinancialDataSDK:InsiderTrading(data)
  local EntityMod = require("entity.insider_trading_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:institutional_trading():list() / client:institutional_trading():load({ id = ... })
function FinancialDataSDK:institutional_trading(data)
  local EntityMod = require("entity.institutional_trading_entity")
  if data == nil then
    if self._institutional_trading == nil then
      self._institutional_trading = EntityMod.new(self, nil)
    end
    return self._institutional_trading
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:institutional_trading() instead.
function FinancialDataSDK:InstitutionalTrading(data)
  local EntityMod = require("entity.institutional_trading_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:investment_adviser():list() / client:investment_adviser():load({ id = ... })
function FinancialDataSDK:investment_adviser(data)
  local EntityMod = require("entity.investment_adviser_entity")
  if data == nil then
    if self._investment_adviser == nil then
      self._investment_adviser = EntityMod.new(self, nil)
    end
    return self._investment_adviser
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:investment_adviser() instead.
function FinancialDataSDK:InvestmentAdviser(data)
  local EntityMod = require("entity.investment_adviser_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:market_data():list() / client:market_data():load({ id = ... })
function FinancialDataSDK:market_data(data)
  local EntityMod = require("entity.market_data_entity")
  if data == nil then
    if self._market_data == nil then
      self._market_data = EntityMod.new(self, nil)
    end
    return self._market_data
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:market_data() instead.
function FinancialDataSDK:MarketData(data)
  local EntityMod = require("entity.market_data_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:market_index():list() / client:market_index():load({ id = ... })
function FinancialDataSDK:market_index(data)
  local EntityMod = require("entity.market_index_entity")
  if data == nil then
    if self._market_index == nil then
      self._market_index = EntityMod.new(self, nil)
    end
    return self._market_index
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:market_index() instead.
function FinancialDataSDK:MarketIndex(data)
  local EntityMod = require("entity.market_index_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:market_new():list() / client:market_new():load({ id = ... })
function FinancialDataSDK:market_new(data)
  local EntityMod = require("entity.market_new_entity")
  if data == nil then
    if self._market_new == nil then
      self._market_new = EntityMod.new(self, nil)
    end
    return self._market_new
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:market_new() instead.
function FinancialDataSDK:MarketNew(data)
  local EntityMod = require("entity.market_new_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:miscellaneous_data():list() / client:miscellaneous_data():load({ id = ... })
function FinancialDataSDK:miscellaneous_data(data)
  local EntityMod = require("entity.miscellaneous_data_entity")
  if data == nil then
    if self._miscellaneous_data == nil then
      self._miscellaneous_data = EntityMod.new(self, nil)
    end
    return self._miscellaneous_data
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:miscellaneous_data() instead.
function FinancialDataSDK:MiscellaneousData(data)
  local EntityMod = require("entity.miscellaneous_data_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:mutual_fund():list() / client:mutual_fund():load({ id = ... })
function FinancialDataSDK:mutual_fund(data)
  local EntityMod = require("entity.mutual_fund_entity")
  if data == nil then
    if self._mutual_fund == nil then
      self._mutual_fund = EntityMod.new(self, nil)
    end
    return self._mutual_fund
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:mutual_fund() instead.
function FinancialDataSDK:MutualFund(data)
  local EntityMod = require("entity.mutual_fund_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:symbol_list():list() / client:symbol_list():load({ id = ... })
function FinancialDataSDK:symbol_list(data)
  local EntityMod = require("entity.symbol_list_entity")
  if data == nil then
    if self._symbol_list == nil then
      self._symbol_list = EntityMod.new(self, nil)
    end
    return self._symbol_list
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:symbol_list() instead.
function FinancialDataSDK:SymbolList(data)
  local EntityMod = require("entity.symbol_list_entity")
  return EntityMod.new(self, data)
end




function FinancialDataSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = FinancialDataSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return FinancialDataSDK
