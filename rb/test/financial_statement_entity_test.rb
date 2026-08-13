# FinancialStatement entity test

require "minitest/autorun"
require "json"
require_relative "../FinancialData_sdk"
require_relative "runner"

class FinancialStatementEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FinancialDataSDK.test(nil, nil)
    ent = testsdk.FinancialStatement(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = financial_statement_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "financial_statement." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FINANCIAL_DATA_TEST_FINANCIAL_STATEMENT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    financial_statement_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.financial_statement")))
    financial_statement_ref01_data = nil
    if financial_statement_ref01_data_raw.length > 0
      financial_statement_ref01_data = Helpers.to_map(financial_statement_ref01_data_raw[0][1])
    end

    # LOAD
    financial_statement_ref01_ent = client.FinancialStatement(nil)
    financial_statement_ref01_match_dt0 = {}
    financial_statement_ref01_data_dt0_loaded = financial_statement_ref01_ent.load(financial_statement_ref01_match_dt0, nil)
    assert !financial_statement_ref01_data_dt0_loaded.nil?

  end
end

def financial_statement_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "financial_statement", "FinancialStatementTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FinancialDataSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["financial_statement01", "financial_statement02", "financial_statement03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FINANCIAL_DATA_TEST_FINANCIAL_STATEMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FINANCIAL_DATA_TEST_FINANCIAL_STATEMENT_ENTID" => idmap,
    "FINANCIAL_DATA_TEST_LIVE" => "FALSE",
    "FINANCIAL_DATA_TEST_EXPLAIN" => "FALSE",
    "FINANCIAL_DATA_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["FINANCIAL_DATA_TEST_FINANCIAL_STATEMENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FINANCIAL_DATA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["FINANCIAL_DATA_APIKEY"],
      },
      extra || {},
    ])
    client = FinancialDataSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FINANCIAL_DATA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FINANCIAL_DATA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
