# FinancialData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FinancialDataUtility.registrar = ->(u) {
  u.clean = FinancialDataUtilities::Clean
  u.done = FinancialDataUtilities::Done
  u.make_error = FinancialDataUtilities::MakeError
  u.feature_add = FinancialDataUtilities::FeatureAdd
  u.feature_hook = FinancialDataUtilities::FeatureHook
  u.feature_init = FinancialDataUtilities::FeatureInit
  u.fetcher = FinancialDataUtilities::Fetcher
  u.make_fetch_def = FinancialDataUtilities::MakeFetchDef
  u.make_context = FinancialDataUtilities::MakeContext
  u.make_options = FinancialDataUtilities::MakeOptions
  u.make_request = FinancialDataUtilities::MakeRequest
  u.make_response = FinancialDataUtilities::MakeResponse
  u.make_result = FinancialDataUtilities::MakeResult
  u.make_point = FinancialDataUtilities::MakePoint
  u.make_spec = FinancialDataUtilities::MakeSpec
  u.make_url = FinancialDataUtilities::MakeUrl
  u.param = FinancialDataUtilities::Param
  u.prepare_auth = FinancialDataUtilities::PrepareAuth
  u.prepare_body = FinancialDataUtilities::PrepareBody
  u.prepare_headers = FinancialDataUtilities::PrepareHeaders
  u.prepare_method = FinancialDataUtilities::PrepareMethod
  u.prepare_params = FinancialDataUtilities::PrepareParams
  u.prepare_path = FinancialDataUtilities::PreparePath
  u.prepare_query = FinancialDataUtilities::PrepareQuery
  u.result_basic = FinancialDataUtilities::ResultBasic
  u.result_body = FinancialDataUtilities::ResultBody
  u.result_headers = FinancialDataUtilities::ResultHeaders
  u.transform_request = FinancialDataUtilities::TransformRequest
  u.transform_response = FinancialDataUtilities::TransformResponse
}
