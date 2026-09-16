# FinancialData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FinancialDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      FinancialDataBaseFeature.new
    when "ratelimit"
      FinancialDataRatelimitFeature.new
    when "retry"
      FinancialDataRetryFeature.new
    when "test"
      FinancialDataTestFeature.new
    when "timeout"
      FinancialDataTimeoutFeature.new
    else
      FinancialDataBaseFeature.new
    end
  end
end
