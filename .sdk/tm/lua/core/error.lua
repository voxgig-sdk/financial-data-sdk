-- FinancialData SDK error

local FinancialDataError = {}
FinancialDataError.__index = FinancialDataError


function FinancialDataError.new(code, msg, ctx)
  local self = setmetatable({}, FinancialDataError)
  self.is_sdk_error = true
  self.sdk = "FinancialData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FinancialDataError:error()
  return self.msg
end


function FinancialDataError:__tostring()
  return self.msg
end


return FinancialDataError
