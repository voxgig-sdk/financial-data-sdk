# FinancialData SDK utility: prepare_body
require_relative 'media'
module FinancialDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FinancialDataUtilities.raw_body(ctx.reqdata) if FinancialDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
