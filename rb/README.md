# FinancialData Ruby SDK



The Ruby SDK for the FinancialData API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/financial-data-sdk/releases](https://github.com/voxgig-sdk/financial-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FinancialData_sdk"

client = FinancialDataSDK.new({
  "apikey" => ENV["FINANCIAL_DATA_APIKEY"],
})
```

### 3. Load a basicinformation

```ruby
begin
  # load returns the bare BasicInformation record (raises on error).
  basicinformation = client.BasicInformation.load({ "id" => "example_id" })
  puts basicinformation
rescue => err
  warn "load failed: #{err}"
end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = FinancialDataSDK.test({
  "entity" => { "basicinformation" => { "test01" => { "id" => "test01" } } },
})

# load returns the bare mock record (raises on error).
basicinformation = client.BasicInformation.load({ "id" => "test01" })
puts basicinformation
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = FinancialDataSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FINANCIAL_DATA_TEST_LIVE=TRUE
FINANCIAL_DATA_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### FinancialDataSDK

```ruby
require_relative "FinancialData_sdk"
client = FinancialDataSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = FinancialDataSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FinancialDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `BasicInformation` | `(data) -> BasicInformationEntity` | Create a BasicInformation entity instance. |
| `CryptoCurrency` | `(data) -> CryptoCurrencyEntity` | Create a CryptoCurrency entity instance. |
| `DerivativesData` | `(data) -> DerivativesDataEntity` | Create a DerivativesData entity instance. |
| `EsgData` | `(data) -> EsgDataEntity` | Create an EsgData entity instance. |
| `EtfData` | `(data) -> EtfDataEntity` | Create an EtfData entity instance. |
| `EventCalendar` | `(data) -> EventCalendarEntity` | Create an EventCalendar entity instance. |
| `FinancialRatio` | `(data) -> FinancialRatioEntity` | Create a FinancialRatio entity instance. |
| `FinancialStatement` | `(data) -> FinancialStatementEntity` | Create a FinancialStatement entity instance. |
| `ForexData` | `(data) -> ForexDataEntity` | Create a ForexData entity instance. |
| `InsiderTrading` | `(data) -> InsiderTradingEntity` | Create an InsiderTrading entity instance. |
| `InstitutionalTrading` | `(data) -> InstitutionalTradingEntity` | Create an InstitutionalTrading entity instance. |
| `InvestmentAdviser` | `(data) -> InvestmentAdviserEntity` | Create an InvestmentAdviser entity instance. |
| `MarketData` | `(data) -> MarketDataEntity` | Create a MarketData entity instance. |
| `MarketIndex` | `(data) -> MarketIndexEntity` | Create a MarketIndex entity instance. |
| `MarketNew` | `(data) -> MarketNewEntity` | Create a MarketNew entity instance. |
| `MiscellaneousData` | `(data) -> MiscellaneousDataEntity` | Create a MiscellaneousData entity instance. |
| `MutualFund` | `(data) -> MutualFundEntity` | Create a MutualFund entity instance. |
| `SymbolList` | `(data) -> SymbolListEntity` | Create a SymbolList entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `FinancialDataError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### BasicInformation

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/company-information`

#### CryptoCurrency

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/crypto-minute-prices`

#### DerivativesData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/futures-prices`

#### EsgData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/esg-ratings`

#### EtfData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/etf-holdings`

#### EventCalendar

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/dividends-calendar`

#### FinancialRatio

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/efficiency-ratios`

#### FinancialStatement

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/balance-sheet-statements`

#### ForexData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/forex-minute-prices`

#### InsiderTrading

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/insider-transactions`

#### InstitutionalTrading

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/institutional-holdings`

#### InvestmentAdviser

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/investment-adviser-information`

#### MarketData

| Field | Description |
| --- | --- |
| `change` |  |
| `close` |  |
| `date` |  |
| `high` |  |
| `low` |  |
| `open` |  |
| `percentage_change` |  |
| `price` |  |
| `registrant_name` |  |
| `time` |  |
| `trading_symbol` |  |
| `volume` |  |

Operations: List, Load.

API path: `/minute-prices`

#### MarketIndex

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/index-prices`

#### MarketNew

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/press-releases`

#### MiscellaneousData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/dividends`

#### MutualFund

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/mutual-fund-holdings`

#### SymbolList

| Field | Description |
| --- | --- |
| `description` |  |
| `registrant_name` |  |
| `title_of_security` |  |
| `trading_symbol` |  |

Operations: List.

API path: `/etf-symbols`



## Entities


### BasicInformation

Create an instance: `basic_information = client.BasicInformation`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare BasicInformation record (raises on error).
basic_information = client.BasicInformation.load({ "id" => "basic_information_id" })
```


### CryptoCurrency

Create an instance: `crypto_currency = client.CryptoCurrency`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare CryptoCurrency record (raises on error).
crypto_currency = client.CryptoCurrency.load({ "id" => "crypto_currency_id" })
```


### DerivativesData

Create an instance: `derivatives_data = client.DerivativesData`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare DerivativesData record (raises on error).
derivatives_data = client.DerivativesData.load({ "id" => "derivatives_data_id" })
```


### EsgData

Create an instance: `esg_data = client.EsgData`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare EsgData record (raises on error).
esg_data = client.EsgData.load({ "id" => "esg_data_id" })
```


### EtfData

Create an instance: `etf_data = client.EtfData`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare EtfData record (raises on error).
etf_data = client.EtfData.load({ "id" => "etf_data_id" })
```


### EventCalendar

Create an instance: `event_calendar = client.EventCalendar`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare EventCalendar record (raises on error).
event_calendar = client.EventCalendar.load({ "id" => "event_calendar_id" })
```


### FinancialRatio

Create an instance: `financial_ratio = client.FinancialRatio`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare FinancialRatio record (raises on error).
financial_ratio = client.FinancialRatio.load({ "id" => "financial_ratio_id" })
```


### FinancialStatement

Create an instance: `financial_statement = client.FinancialStatement`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare FinancialStatement record (raises on error).
financial_statement = client.FinancialStatement.load({ "id" => "financial_statement_id" })
```


### ForexData

Create an instance: `forex_data = client.ForexData`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare ForexData record (raises on error).
forex_data = client.ForexData.load({ "id" => "forex_data_id" })
```


### InsiderTrading

Create an instance: `insider_trading = client.InsiderTrading`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare InsiderTrading record (raises on error).
insider_trading = client.InsiderTrading.load({ "id" => "insider_trading_id" })
```


### InstitutionalTrading

Create an instance: `institutional_trading = client.InstitutionalTrading`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare InstitutionalTrading record (raises on error).
institutional_trading = client.InstitutionalTrading.load({ "id" => "institutional_trading_id" })
```


### InvestmentAdviser

Create an instance: `investment_adviser = client.InvestmentAdviser`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare InvestmentAdviser record (raises on error).
investment_adviser = client.InvestmentAdviser.load({ "id" => "investment_adviser_id" })
```


### MarketData

Create an instance: `market_data = client.MarketData`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change` | ``$NUMBER`` |  |
| `close` | ``$NUMBER`` |  |
| `date` | ``$STRING`` |  |
| `high` | ``$NUMBER`` |  |
| `low` | ``$NUMBER`` |  |
| `open` | ``$NUMBER`` |  |
| `percentage_change` | ``$NUMBER`` |  |
| `price` | ``$NUMBER`` |  |
| `registrant_name` | ``$STRING`` |  |
| `time` | ``$STRING`` |  |
| `trading_symbol` | ``$STRING`` |  |
| `volume` | ``$NUMBER`` |  |

#### Example: Load

```ruby
# load returns the bare MarketData record (raises on error).
market_data = client.MarketData.load({ "id" => "market_data_id" })
```

#### Example: List

```ruby
# list returns an Array of MarketData records (raises on error).
market_datas = client.MarketData.list
```


### MarketIndex

Create an instance: `market_index = client.MarketIndex`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare MarketIndex record (raises on error).
market_index = client.MarketIndex.load({ "id" => "market_index_id" })
```


### MarketNew

Create an instance: `market_new = client.MarketNew`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare MarketNew record (raises on error).
market_new = client.MarketNew.load({ "id" => "market_new_id" })
```


### MiscellaneousData

Create an instance: `miscellaneous_data = client.MiscellaneousData`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare MiscellaneousData record (raises on error).
miscellaneous_data = client.MiscellaneousData.load({ "id" => "miscellaneous_data_id" })
```


### MutualFund

Create an instance: `mutual_fund = client.MutualFund`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare MutualFund record (raises on error).
mutual_fund = client.MutualFund.load({ "id" => "mutual_fund_id" })
```


### SymbolList

Create an instance: `symbol_list = client.SymbolList`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `registrant_name` | ``$STRING`` |  |
| `title_of_security` | ``$STRING`` |  |
| `trading_symbol` | ``$STRING`` |  |

#### Example: List

```ruby
# list returns an Array of SymbolList records (raises on error).
symbol_lists = client.SymbolList.list
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── FinancialData_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`FinancialData_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
basicinformation = client.BasicInformation
basicinformation.load({ "id" => "example_id" })

# basicinformation.data_get now returns the loaded basicinformation data
# basicinformation.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
