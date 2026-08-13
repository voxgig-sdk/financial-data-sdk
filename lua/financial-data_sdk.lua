-- FinancialData SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("financial-data_types")

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

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
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

    -- feature: test


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


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function FinancialDataSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function FinancialDataSDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function FinancialDataSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "FinancialDataSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function FinancialDataSDK:_raw_request(fetchargs)
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


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function FinancialDataSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "FinancialDataSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:BasicInformation():list() / client:BasicInformation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:BasicInformation(data)
  local EntityMod = require("entity.basic_information_entity")
  if data == nil then
    if self._basic_information == nil then
      self._basic_information = EntityMod.new(self, nil)
    end
    return self._basic_information
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CryptoCurrency():list() / client:CryptoCurrency():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:CryptoCurrency(data)
  local EntityMod = require("entity.crypto_currency_entity")
  if data == nil then
    if self._crypto_currency == nil then
      self._crypto_currency = EntityMod.new(self, nil)
    end
    return self._crypto_currency
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DerivativesData():list() / client:DerivativesData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:DerivativesData(data)
  local EntityMod = require("entity.derivatives_data_entity")
  if data == nil then
    if self._derivatives_data == nil then
      self._derivatives_data = EntityMod.new(self, nil)
    end
    return self._derivatives_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EsgData():list() / client:EsgData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:EsgData(data)
  local EntityMod = require("entity.esg_data_entity")
  if data == nil then
    if self._esg_data == nil then
      self._esg_data = EntityMod.new(self, nil)
    end
    return self._esg_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EtfData():list() / client:EtfData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:EtfData(data)
  local EntityMod = require("entity.etf_data_entity")
  if data == nil then
    if self._etf_data == nil then
      self._etf_data = EntityMod.new(self, nil)
    end
    return self._etf_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:EventCalendar():list() / client:EventCalendar():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:EventCalendar(data)
  local EntityMod = require("entity.event_calendar_entity")
  if data == nil then
    if self._event_calendar == nil then
      self._event_calendar = EntityMod.new(self, nil)
    end
    return self._event_calendar
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:FinancialRatio():list() / client:FinancialRatio():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:FinancialRatio(data)
  local EntityMod = require("entity.financial_ratio_entity")
  if data == nil then
    if self._financial_ratio == nil then
      self._financial_ratio = EntityMod.new(self, nil)
    end
    return self._financial_ratio
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:FinancialStatement():list() / client:FinancialStatement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:FinancialStatement(data)
  local EntityMod = require("entity.financial_statement_entity")
  if data == nil then
    if self._financial_statement == nil then
      self._financial_statement = EntityMod.new(self, nil)
    end
    return self._financial_statement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ForexData():list() / client:ForexData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:ForexData(data)
  local EntityMod = require("entity.forex_data_entity")
  if data == nil then
    if self._forex_data == nil then
      self._forex_data = EntityMod.new(self, nil)
    end
    return self._forex_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InsiderTrading():list() / client:InsiderTrading():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:InsiderTrading(data)
  local EntityMod = require("entity.insider_trading_entity")
  if data == nil then
    if self._insider_trading == nil then
      self._insider_trading = EntityMod.new(self, nil)
    end
    return self._insider_trading
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InstitutionalTrading():list() / client:InstitutionalTrading():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:InstitutionalTrading(data)
  local EntityMod = require("entity.institutional_trading_entity")
  if data == nil then
    if self._institutional_trading == nil then
      self._institutional_trading = EntityMod.new(self, nil)
    end
    return self._institutional_trading
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InvestmentAdviser():list() / client:InvestmentAdviser():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:InvestmentAdviser(data)
  local EntityMod = require("entity.investment_adviser_entity")
  if data == nil then
    if self._investment_adviser == nil then
      self._investment_adviser = EntityMod.new(self, nil)
    end
    return self._investment_adviser
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MarketData():list() / client:MarketData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:MarketData(data)
  local EntityMod = require("entity.market_data_entity")
  if data == nil then
    if self._market_data == nil then
      self._market_data = EntityMod.new(self, nil)
    end
    return self._market_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MarketIndex():list() / client:MarketIndex():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:MarketIndex(data)
  local EntityMod = require("entity.market_index_entity")
  if data == nil then
    if self._market_index == nil then
      self._market_index = EntityMod.new(self, nil)
    end
    return self._market_index
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MarketNew():list() / client:MarketNew():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:MarketNew(data)
  local EntityMod = require("entity.market_new_entity")
  if data == nil then
    if self._market_new == nil then
      self._market_new = EntityMod.new(self, nil)
    end
    return self._market_new
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MiscellaneousData():list() / client:MiscellaneousData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:MiscellaneousData(data)
  local EntityMod = require("entity.miscellaneous_data_entity")
  if data == nil then
    if self._miscellaneous_data == nil then
      self._miscellaneous_data = EntityMod.new(self, nil)
    end
    return self._miscellaneous_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MutualFund():list() / client:MutualFund():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:MutualFund(data)
  local EntityMod = require("entity.mutual_fund_entity")
  if data == nil then
    if self._mutual_fund == nil then
      self._mutual_fund = EntityMod.new(self, nil)
    end
    return self._mutual_fund
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SymbolList():list() / client:SymbolList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function FinancialDataSDK:SymbolList(data)
  local EntityMod = require("entity.symbol_list_entity")
  if data == nil then
    if self._symbol_list == nil then
      self._symbol_list = EntityMod.new(self, nil)
    end
    return self._symbol_list
  end
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
