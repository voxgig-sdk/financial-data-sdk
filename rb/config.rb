# FinancialData SDK configuration

module FinancialDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "FinancialData",
        "slug" => "financial-data",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://financialdata.net/api/v1",
        "auth" => {
          "prefix" => "",
          "in" => "query",
          "name" => "key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "basic_information" => {},
          "crypto_currency" => {},
          "derivatives_data" => {},
          "esg_data" => {},
          "etf_data" => {},
          "event_calendar" => {},
          "financial_ratio" => {},
          "financial_statement" => {},
          "forex_data" => {},
          "insider_trading" => {},
          "institutional_trading" => {},
          "investment_adviser" => {},
          "market_data" => {},
          "market_index" => {},
          "market_new" => {},
          "miscellaneous_data" => {},
          "mutual_fund" => {},
          "symbol_list" => {},
        },
      },
      "entity" => {
        "basic_information" => {
          "fields" => [],
          "name" => "basic_information",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/company-information",
                  "segments" => [
                    {
                      "lit" => "company-information",
                    },
                  ],
                  "parts" => [
                    "company-information",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/employee-count",
                  "segments" => [
                    {
                      "lit" => "employee-count",
                    },
                  ],
                  "parts" => [
                    "employee-count",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/executive-compensation",
                  "segments" => [
                    {
                      "lit" => "executive-compensation",
                    },
                  ],
                  "parts" => [
                    "executive-compensation",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/international-company-information",
                  "segments" => [
                    {
                      "lit" => "international-company-information",
                    },
                  ],
                  "parts" => [
                    "international-company-information",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/key-metrics",
                  "segments" => [
                    {
                      "lit" => "key-metrics",
                    },
                  ],
                  "parts" => [
                    "key-metrics",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/market-cap",
                  "segments" => [
                    {
                      "lit" => "market-cap",
                    },
                  ],
                  "parts" => [
                    "market-cap",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/securities-information",
                  "segments" => [
                    {
                      "lit" => "securities-information",
                    },
                  ],
                  "parts" => [
                    "securities-information",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "crypto_currency" => {
          "fields" => [],
          "name" => "crypto_currency",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/crypto-minute-prices",
                  "segments" => [
                    {
                      "lit" => "crypto-minute-prices",
                    },
                  ],
                  "parts" => [
                    "crypto-minute-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/crypto-information",
                  "segments" => [
                    {
                      "lit" => "crypto-information",
                    },
                  ],
                  "parts" => [
                    "crypto-information",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/crypto-prices",
                  "segments" => [
                    {
                      "lit" => "crypto-prices",
                    },
                  ],
                  "parts" => [
                    "crypto-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/crypto-quotes",
                  "segments" => [
                    {
                      "lit" => "crypto-quotes",
                    },
                  ],
                  "parts" => [
                    "crypto-quotes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/crypto-symbols",
                  "segments" => [
                    {
                      "lit" => "crypto-symbols",
                    },
                  ],
                  "parts" => [
                    "crypto-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "derivatives_data" => {
          "fields" => [],
          "name" => "derivatives_data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/futures-prices",
                  "segments" => [
                    {
                      "lit" => "futures-prices",
                    },
                  ],
                  "parts" => [
                    "futures-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/option-chain",
                  "segments" => [
                    {
                      "lit" => "option-chain",
                    },
                  ],
                  "parts" => [
                    "option-chain",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/option-greeks",
                  "segments" => [
                    {
                      "lit" => "option-greeks",
                    },
                  ],
                  "parts" => [
                    "option-greeks",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/option-prices",
                  "segments" => [
                    {
                      "lit" => "option-prices",
                    },
                  ],
                  "parts" => [
                    "option-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/futures-symbols",
                  "segments" => [
                    {
                      "lit" => "futures-symbols",
                    },
                  ],
                  "parts" => [
                    "futures-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "esg_data" => {
          "fields" => [],
          "name" => "esg_data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/esg-ratings",
                  "segments" => [
                    {
                      "lit" => "esg-ratings",
                    },
                  ],
                  "parts" => [
                    "esg-ratings",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/esg-scores",
                  "segments" => [
                    {
                      "lit" => "esg-scores",
                    },
                  ],
                  "parts" => [
                    "esg-scores",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/industry-esg-scores",
                  "segments" => [
                    {
                      "lit" => "industry-esg-scores",
                    },
                  ],
                  "parts" => [
                    "industry-esg-scores",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "etf_data" => {
          "fields" => [],
          "name" => "etf_data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/etf-holdings",
                  "segments" => [
                    {
                      "lit" => "etf-holdings",
                    },
                  ],
                  "parts" => [
                    "etf-holdings",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/etf-prices",
                  "segments" => [
                    {
                      "lit" => "etf-prices",
                    },
                  ],
                  "parts" => [
                    "etf-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/etf-quotes",
                  "segments" => [
                    {
                      "lit" => "etf-quotes",
                    },
                  ],
                  "parts" => [
                    "etf-quotes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "event_calendar" => {
          "fields" => [],
          "name" => "event_calendar",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dividends-calendar",
                  "segments" => [
                    {
                      "lit" => "dividends-calendar",
                    },
                  ],
                  "parts" => [
                    "dividends-calendar",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/earnings-calendar",
                  "segments" => [
                    {
                      "lit" => "earnings-calendar",
                    },
                  ],
                  "parts" => [
                    "earnings-calendar",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/economic-calendar",
                  "segments" => [
                    {
                      "lit" => "economic-calendar",
                    },
                  ],
                  "parts" => [
                    "economic-calendar",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ipo-calendar",
                  "segments" => [
                    {
                      "lit" => "ipo-calendar",
                    },
                  ],
                  "parts" => [
                    "ipo-calendar",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/splits-calendar",
                  "segments" => [
                    {
                      "lit" => "splits-calendar",
                    },
                  ],
                  "parts" => [
                    "splits-calendar",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "financial_ratio" => {
          "fields" => [],
          "name" => "financial_ratio",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/efficiency-ratios",
                  "segments" => [
                    {
                      "lit" => "efficiency-ratios",
                    },
                  ],
                  "parts" => [
                    "efficiency-ratios",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/liquidity-ratios",
                  "segments" => [
                    {
                      "lit" => "liquidity-ratios",
                    },
                  ],
                  "parts" => [
                    "liquidity-ratios",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/profitability-ratios",
                  "segments" => [
                    {
                      "lit" => "profitability-ratios",
                    },
                  ],
                  "parts" => [
                    "profitability-ratios",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/solvency-ratios",
                  "segments" => [
                    {
                      "lit" => "solvency-ratios",
                    },
                  ],
                  "parts" => [
                    "solvency-ratios",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/valuation-ratios",
                  "segments" => [
                    {
                      "lit" => "valuation-ratios",
                    },
                  ],
                  "parts" => [
                    "valuation-ratios",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "financial_statement" => {
          "fields" => [],
          "name" => "financial_statement",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/balance-sheet-statements",
                  "segments" => [
                    {
                      "lit" => "balance-sheet-statements",
                    },
                  ],
                  "parts" => [
                    "balance-sheet-statements",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cash-flow-statements",
                  "segments" => [
                    {
                      "lit" => "cash-flow-statements",
                    },
                  ],
                  "parts" => [
                    "cash-flow-statements",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/income-statements",
                  "segments" => [
                    {
                      "lit" => "income-statements",
                    },
                  ],
                  "parts" => [
                    "income-statements",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/international-balance-sheet-statements",
                  "segments" => [
                    {
                      "lit" => "international-balance-sheet-statements",
                    },
                  ],
                  "parts" => [
                    "international-balance-sheet-statements",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/international-cash-flow-statements",
                  "segments" => [
                    {
                      "lit" => "international-cash-flow-statements",
                    },
                  ],
                  "parts" => [
                    "international-cash-flow-statements",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/international-income-statements",
                  "segments" => [
                    {
                      "lit" => "international-income-statements",
                    },
                  ],
                  "parts" => [
                    "international-income-statements",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "forex_data" => {
          "fields" => [],
          "name" => "forex_data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/forex-minute-prices",
                  "segments" => [
                    {
                      "lit" => "forex-minute-prices",
                    },
                  ],
                  "parts" => [
                    "forex-minute-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/forex-prices",
                  "segments" => [
                    {
                      "lit" => "forex-prices",
                    },
                  ],
                  "parts" => [
                    "forex-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/forex-quotes",
                  "segments" => [
                    {
                      "lit" => "forex-quotes",
                    },
                  ],
                  "parts" => [
                    "forex-quotes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/forex-symbols",
                  "segments" => [
                    {
                      "lit" => "forex-symbols",
                    },
                  ],
                  "parts" => [
                    "forex-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "insider_trading" => {
          "fields" => [],
          "name" => "insider_trading",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/insider-transactions",
                  "segments" => [
                    {
                      "lit" => "insider-transactions",
                    },
                  ],
                  "parts" => [
                    "insider-transactions",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/house-trading",
                  "segments" => [
                    {
                      "lit" => "house-trading",
                    },
                  ],
                  "parts" => [
                    "house-trading",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/proposed-sales",
                  "segments" => [
                    {
                      "lit" => "proposed-sales",
                    },
                  ],
                  "parts" => [
                    "proposed-sales",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/senate-trading",
                  "segments" => [
                    {
                      "lit" => "senate-trading",
                    },
                  ],
                  "parts" => [
                    "senate-trading",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "institutional_trading" => {
          "fields" => [],
          "name" => "institutional_trading",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/institutional-holdings",
                  "segments" => [
                    {
                      "lit" => "institutional-holdings",
                    },
                  ],
                  "parts" => [
                    "institutional-holdings",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/institutional-investors",
                  "segments" => [
                    {
                      "lit" => "institutional-investors",
                    },
                  ],
                  "parts" => [
                    "institutional-investors",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/institutional-portfolio-statistics",
                  "segments" => [
                    {
                      "lit" => "institutional-portfolio-statistics",
                    },
                  ],
                  "parts" => [
                    "institutional-portfolio-statistics",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "investment_adviser" => {
          "fields" => [],
          "name" => "investment_adviser",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/investment-adviser-information",
                  "segments" => [
                    {
                      "lit" => "investment-adviser-information",
                    },
                  ],
                  "parts" => [
                    "investment-adviser-information",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/investment-adviser-names",
                  "segments" => [
                    {
                      "lit" => "investment-adviser-names",
                    },
                  ],
                  "parts" => [
                    "investment-adviser-names",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "market_data" => {
          "fields" => [
            {
              "name" => "change",
              "title" => "Change",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
            {
              "name" => "close",
              "title" => "Close",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "format" => "date",
            },
            {
              "name" => "high",
              "title" => "High",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
            {
              "name" => "low",
              "title" => "Low",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
            {
              "name" => "open",
              "title" => "Open",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
            {
              "name" => "percentage_change",
              "title" => "Percentage Change",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
            {
              "name" => "price",
              "title" => "Price",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
            {
              "name" => "registrant_name",
              "title" => "Registrant Name",
              "type" => "`$STRING`",
            },
            {
              "name" => "time",
              "title" => "Time",
              "type" => "`$STRING`",
            },
            {
              "name" => "trading_symbol",
              "title" => "Trading Symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "volume",
              "title" => "Volume",
              "type" => "`$NUMBER`",
              "format" => "float",
            },
          ],
          "name" => "market_data",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/minute-prices",
                  "segments" => [
                    {
                      "lit" => "minute-prices",
                    },
                  ],
                  "parts" => [
                    "minute-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "2020-01-15",
                      },
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "MSFT",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 300,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "date",
                      "format",
                      "identifier",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/international-stock-prices",
                  "segments" => [
                    {
                      "lit" => "international-stock-prices",
                    },
                  ],
                  "parts" => [
                    "international-stock-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "SHEL.L",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 300,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/latest-prices",
                  "segments" => [
                    {
                      "lit" => "latest-prices",
                    },
                  ],
                  "parts" => [
                    "latest-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stock-prices",
                  "segments" => [
                    {
                      "lit" => "stock-prices",
                    },
                  ],
                  "parts" => [
                    "stock-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "MSFT",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 300,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stock-quotes",
                  "segments" => [
                    {
                      "lit" => "stock-quotes",
                    },
                  ],
                  "parts" => [
                    "stock-quotes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "MSFT,AAPL",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/commodity-prices",
                  "segments" => [
                    {
                      "lit" => "commodity-prices",
                    },
                  ],
                  "parts" => [
                    "commodity-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/otc-prices",
                  "segments" => [
                    {
                      "lit" => "otc-prices",
                    },
                  ],
                  "parts" => [
                    "otc-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/otc-volume",
                  "segments" => [
                    {
                      "lit" => "otc-volume",
                    },
                  ],
                  "parts" => [
                    "otc-volume",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "market_index" => {
          "fields" => [],
          "name" => "market_index",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/index-prices",
                  "segments" => [
                    {
                      "lit" => "index-prices",
                    },
                  ],
                  "parts" => [
                    "index-prices",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/index-constituents",
                  "segments" => [
                    {
                      "lit" => "index-constituents",
                    },
                  ],
                  "parts" => [
                    "index-constituents",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/index-quotes",
                  "segments" => [
                    {
                      "lit" => "index-quotes",
                    },
                  ],
                  "parts" => [
                    "index-quotes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/index-symbols",
                  "segments" => [
                    {
                      "lit" => "index-symbols",
                    },
                  ],
                  "parts" => [
                    "index-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "market_new" => {
          "fields" => [],
          "name" => "market_new",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/press-releases",
                  "segments" => [
                    {
                      "lit" => "press-releases",
                    },
                  ],
                  "parts" => [
                    "press-releases",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/fed-press-releases",
                  "segments" => [
                    {
                      "lit" => "fed-press-releases",
                    },
                  ],
                  "parts" => [
                    "fed-press-releases",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/sec-press-releases",
                  "segments" => [
                    {
                      "lit" => "sec-press-releases",
                    },
                  ],
                  "parts" => [
                    "sec-press-releases",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "miscellaneous_data" => {
          "fields" => [],
          "name" => "miscellaneous_data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/dividends",
                  "segments" => [
                    {
                      "lit" => "dividends",
                    },
                  ],
                  "parts" => [
                    "dividends",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/earnings-releases",
                  "segments" => [
                    {
                      "lit" => "earnings-releases",
                    },
                  ],
                  "parts" => [
                    "earnings-releases",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/short-interest",
                  "segments" => [
                    {
                      "lit" => "short-interest",
                    },
                  ],
                  "parts" => [
                    "short-interest",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stock-splits",
                  "segments" => [
                    {
                      "lit" => "stock-splits",
                    },
                  ],
                  "parts" => [
                    "stock-splits",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/initial-public-offerings",
                  "segments" => [
                    {
                      "lit" => "initial-public-offerings",
                    },
                  ],
                  "parts" => [
                    "initial-public-offerings",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "mutual_fund" => {
          "fields" => [],
          "name" => "mutual_fund",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/mutual-fund-holdings",
                  "segments" => [
                    {
                      "lit" => "mutual-fund-holdings",
                    },
                  ],
                  "parts" => [
                    "mutual-fund-holdings",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/mutual-fund-statistics",
                  "segments" => [
                    {
                      "lit" => "mutual-fund-statistics",
                    },
                  ],
                  "parts" => [
                    "mutual-fund-statistics",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "identifier",
                        "orig" => "identifier",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "identifier",
                      "key",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/mutual-fund-symbols",
                  "segments" => [
                    {
                      "lit" => "mutual-fund-symbols",
                    },
                  ],
                  "parts" => [
                    "mutual-fund-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "symbol_list" => {
          "fields" => [
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
            },
            {
              "name" => "registrant_name",
              "title" => "Registrant Name",
              "type" => "`$STRING`",
            },
            {
              "name" => "title_of_security",
              "title" => "Title Of Security",
              "type" => "`$STRING`",
            },
            {
              "name" => "trading_symbol",
              "title" => "Trading Symbol",
              "type" => "`$STRING`",
            },
          ],
          "name" => "symbol_list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/etf-symbols",
                  "segments" => [
                    {
                      "lit" => "etf-symbols",
                    },
                  ],
                  "parts" => [
                    "etf-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 500,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/international-stock-symbols",
                  "segments" => [
                    {
                      "lit" => "international-stock-symbols",
                    },
                  ],
                  "parts" => [
                    "international-stock-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 500,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/otc-symbols",
                  "segments" => [
                    {
                      "lit" => "otc-symbols",
                    },
                  ],
                  "parts" => [
                    "otc-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 500,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stock-symbols",
                  "segments" => [
                    {
                      "lit" => "stock-symbols",
                    },
                  ],
                  "parts" => [
                    "stock-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 500,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                      "offset",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/commodity-symbols",
                  "segments" => [
                    {
                      "lit" => "commodity-symbols",
                    },
                  ],
                  "parts" => [
                    "commodity-symbols",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "json",
                      },
                      {
                        "name" => "key",
                        "orig" => "key",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "format",
                      "key",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FinancialDataFeatures.make_feature(name)
  end
end
