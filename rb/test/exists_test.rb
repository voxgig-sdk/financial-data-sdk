# FinancialData SDK exists test

require "minitest/autorun"
require_relative "../FinancialData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FinancialDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
