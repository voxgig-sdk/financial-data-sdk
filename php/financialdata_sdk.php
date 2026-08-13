<?php
declare(strict_types=1);

// FinancialData SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class FinancialDataSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new FinancialDataUtility();
        $this->_utility = $utility;

        $config = FinancialDataConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = FinancialDataHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = FinancialDataHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, FinancialDataFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return FinancialDataUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = FinancialDataHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = FinancialDataHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = FinancialDataHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new FinancialDataSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new FinancialDataError($op . "_allow",
                "FinancialDataSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = FinancialDataHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = FinancialDataHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new FinancialDataError("graphql_error",
                "FinancialDataSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_basic_information = null;

    // Canonical facade: $client->BasicInformation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->basic_information()
    // resolves here too.
    public function BasicInformation($data = null)
    {
        require_once __DIR__ . '/entity/basic_information_entity.php';
        if ($data === null) {
            if ($this->_basic_information === null) {
                $this->_basic_information = new BasicInformationEntity($this, null);
            }
            return $this->_basic_information;
        }
        return new BasicInformationEntity($this, $data);
    }


    private $_crypto_currency = null;

    // Canonical facade: $client->CryptoCurrency()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->crypto_currency()
    // resolves here too.
    public function CryptoCurrency($data = null)
    {
        require_once __DIR__ . '/entity/crypto_currency_entity.php';
        if ($data === null) {
            if ($this->_crypto_currency === null) {
                $this->_crypto_currency = new CryptoCurrencyEntity($this, null);
            }
            return $this->_crypto_currency;
        }
        return new CryptoCurrencyEntity($this, $data);
    }


    private $_derivatives_data = null;

    // Canonical facade: $client->DerivativesData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->derivatives_data()
    // resolves here too.
    public function DerivativesData($data = null)
    {
        require_once __DIR__ . '/entity/derivatives_data_entity.php';
        if ($data === null) {
            if ($this->_derivatives_data === null) {
                $this->_derivatives_data = new DerivativesDataEntity($this, null);
            }
            return $this->_derivatives_data;
        }
        return new DerivativesDataEntity($this, $data);
    }


    private $_esg_data = null;

    // Canonical facade: $client->EsgData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->esg_data()
    // resolves here too.
    public function EsgData($data = null)
    {
        require_once __DIR__ . '/entity/esg_data_entity.php';
        if ($data === null) {
            if ($this->_esg_data === null) {
                $this->_esg_data = new EsgDataEntity($this, null);
            }
            return $this->_esg_data;
        }
        return new EsgDataEntity($this, $data);
    }


    private $_etf_data = null;

    // Canonical facade: $client->EtfData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->etf_data()
    // resolves here too.
    public function EtfData($data = null)
    {
        require_once __DIR__ . '/entity/etf_data_entity.php';
        if ($data === null) {
            if ($this->_etf_data === null) {
                $this->_etf_data = new EtfDataEntity($this, null);
            }
            return $this->_etf_data;
        }
        return new EtfDataEntity($this, $data);
    }


    private $_event_calendar = null;

    // Canonical facade: $client->EventCalendar()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->event_calendar()
    // resolves here too.
    public function EventCalendar($data = null)
    {
        require_once __DIR__ . '/entity/event_calendar_entity.php';
        if ($data === null) {
            if ($this->_event_calendar === null) {
                $this->_event_calendar = new EventCalendarEntity($this, null);
            }
            return $this->_event_calendar;
        }
        return new EventCalendarEntity($this, $data);
    }


    private $_financial_ratio = null;

    // Canonical facade: $client->FinancialRatio()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->financial_ratio()
    // resolves here too.
    public function FinancialRatio($data = null)
    {
        require_once __DIR__ . '/entity/financial_ratio_entity.php';
        if ($data === null) {
            if ($this->_financial_ratio === null) {
                $this->_financial_ratio = new FinancialRatioEntity($this, null);
            }
            return $this->_financial_ratio;
        }
        return new FinancialRatioEntity($this, $data);
    }


    private $_financial_statement = null;

    // Canonical facade: $client->FinancialStatement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->financial_statement()
    // resolves here too.
    public function FinancialStatement($data = null)
    {
        require_once __DIR__ . '/entity/financial_statement_entity.php';
        if ($data === null) {
            if ($this->_financial_statement === null) {
                $this->_financial_statement = new FinancialStatementEntity($this, null);
            }
            return $this->_financial_statement;
        }
        return new FinancialStatementEntity($this, $data);
    }


    private $_forex_data = null;

    // Canonical facade: $client->ForexData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->forex_data()
    // resolves here too.
    public function ForexData($data = null)
    {
        require_once __DIR__ . '/entity/forex_data_entity.php';
        if ($data === null) {
            if ($this->_forex_data === null) {
                $this->_forex_data = new ForexDataEntity($this, null);
            }
            return $this->_forex_data;
        }
        return new ForexDataEntity($this, $data);
    }


    private $_insider_trading = null;

    // Canonical facade: $client->InsiderTrading()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->insider_trading()
    // resolves here too.
    public function InsiderTrading($data = null)
    {
        require_once __DIR__ . '/entity/insider_trading_entity.php';
        if ($data === null) {
            if ($this->_insider_trading === null) {
                $this->_insider_trading = new InsiderTradingEntity($this, null);
            }
            return $this->_insider_trading;
        }
        return new InsiderTradingEntity($this, $data);
    }


    private $_institutional_trading = null;

    // Canonical facade: $client->InstitutionalTrading()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->institutional_trading()
    // resolves here too.
    public function InstitutionalTrading($data = null)
    {
        require_once __DIR__ . '/entity/institutional_trading_entity.php';
        if ($data === null) {
            if ($this->_institutional_trading === null) {
                $this->_institutional_trading = new InstitutionalTradingEntity($this, null);
            }
            return $this->_institutional_trading;
        }
        return new InstitutionalTradingEntity($this, $data);
    }


    private $_investment_adviser = null;

    // Canonical facade: $client->InvestmentAdviser()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->investment_adviser()
    // resolves here too.
    public function InvestmentAdviser($data = null)
    {
        require_once __DIR__ . '/entity/investment_adviser_entity.php';
        if ($data === null) {
            if ($this->_investment_adviser === null) {
                $this->_investment_adviser = new InvestmentAdviserEntity($this, null);
            }
            return $this->_investment_adviser;
        }
        return new InvestmentAdviserEntity($this, $data);
    }


    private $_market_data = null;

    // Canonical facade: $client->MarketData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->market_data()
    // resolves here too.
    public function MarketData($data = null)
    {
        require_once __DIR__ . '/entity/market_data_entity.php';
        if ($data === null) {
            if ($this->_market_data === null) {
                $this->_market_data = new MarketDataEntity($this, null);
            }
            return $this->_market_data;
        }
        return new MarketDataEntity($this, $data);
    }


    private $_market_index = null;

    // Canonical facade: $client->MarketIndex()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->market_index()
    // resolves here too.
    public function MarketIndex($data = null)
    {
        require_once __DIR__ . '/entity/market_index_entity.php';
        if ($data === null) {
            if ($this->_market_index === null) {
                $this->_market_index = new MarketIndexEntity($this, null);
            }
            return $this->_market_index;
        }
        return new MarketIndexEntity($this, $data);
    }


    private $_market_new = null;

    // Canonical facade: $client->MarketNew()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->market_new()
    // resolves here too.
    public function MarketNew($data = null)
    {
        require_once __DIR__ . '/entity/market_new_entity.php';
        if ($data === null) {
            if ($this->_market_new === null) {
                $this->_market_new = new MarketNewEntity($this, null);
            }
            return $this->_market_new;
        }
        return new MarketNewEntity($this, $data);
    }


    private $_miscellaneous_data = null;

    // Canonical facade: $client->MiscellaneousData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->miscellaneous_data()
    // resolves here too.
    public function MiscellaneousData($data = null)
    {
        require_once __DIR__ . '/entity/miscellaneous_data_entity.php';
        if ($data === null) {
            if ($this->_miscellaneous_data === null) {
                $this->_miscellaneous_data = new MiscellaneousDataEntity($this, null);
            }
            return $this->_miscellaneous_data;
        }
        return new MiscellaneousDataEntity($this, $data);
    }


    private $_mutual_fund = null;

    // Canonical facade: $client->MutualFund()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->mutual_fund()
    // resolves here too.
    public function MutualFund($data = null)
    {
        require_once __DIR__ . '/entity/mutual_fund_entity.php';
        if ($data === null) {
            if ($this->_mutual_fund === null) {
                $this->_mutual_fund = new MutualFundEntity($this, null);
            }
            return $this->_mutual_fund;
        }
        return new MutualFundEntity($this, $data);
    }


    private $_symbol_list = null;

    // Canonical facade: $client->SymbolList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->symbol_list()
    // resolves here too.
    public function SymbolList($data = null)
    {
        require_once __DIR__ . '/entity/symbol_list_entity.php';
        if ($data === null) {
            if ($this->_symbol_list === null) {
                $this->_symbol_list = new SymbolListEntity($this, null);
            }
            return $this->_symbol_list;
        }
        return new SymbolListEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new FinancialDataSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
