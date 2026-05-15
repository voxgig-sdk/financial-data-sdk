# FinancialData SDK utility: make_context
require_relative '../core/context'
module FinancialDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    FinancialDataContext.new(ctxmap, basectx)
  }
end
