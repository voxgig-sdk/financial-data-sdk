# FinancialData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FinancialDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      FinancialDataBaseFeature.new
    when "test"
      FinancialDataTestFeature.new
    else
      FinancialDataBaseFeature.new
    end
  end
end
