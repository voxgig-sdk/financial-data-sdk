# FinancialData Ruby SDK



The Ruby SDK for the FinancialData API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
gem install financial-data-sdk
```

Or add to your `Gemfile`:

```ruby
gem "financial-data-sdk"
```

Then run:

```bash
bundle install
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FinancialData_sdk"

client = FinancialDataSDK.new({
  "apikey" => ENV["FINANCIAL-DATA_APIKEY"],
})
```

### 3. Load a basicinformation

```ruby
result, err = client.BasicInformation().load({ "id" => "example_id" })
raise err if err
puts result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
raise err if err

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
end
```

### Prepare a request without sending it

```ruby
fetchdef, err = client.prepare({
  "path" => "/api/resource/{id}",
  "method" => "DELETE",
  "params" => { "id" => "example" },
})
raise err if err

puts fetchdef["url"]
puts fetchdef["method"]
puts fetchdef["headers"]
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = FinancialDataSDK.test

result, err = client.FinancialData().load({ "id" => "test01" })
# result contains mock response data
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
FINANCIAL-DATA_TEST_LIVE=TRUE
FINANCIAL-DATA_APIKEY=<your-key>
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
| `prepare` | `(fetchargs) -> [Hash, err]` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> [Hash, err]` | Build and send an HTTP request. |
| `BasicInformation` | `(data) -> BasicInformationEntity` | Create a BasicInformation entity instance. |
| `CryptoCurrency` | `(data) -> CryptoCurrencyEntity` | Create a CryptoCurrency entity instance. |
| `DerivativesData` | `(data) -> DerivativesDataEntity` | Create a DerivativesData entity instance. |
| `EsgData` | `(data) -> EsgDataEntity` | Create a EsgData entity instance. |
| `EtfData` | `(data) -> EtfDataEntity` | Create a EtfData entity instance. |
| `EventCalendar` | `(data) -> EventCalendarEntity` | Create a EventCalendar entity instance. |
| `FinancialRatio` | `(data) -> FinancialRatioEntity` | Create a FinancialRatio entity instance. |
| `FinancialStatement` | `(data) -> FinancialStatementEntity` | Create a FinancialStatement entity instance. |
| `ForexData` | `(data) -> ForexDataEntity` | Create a ForexData entity instance. |
| `InsiderTrading` | `(data) -> InsiderTradingEntity` | Create a InsiderTrading entity instance. |
| `InstitutionalTrading` | `(data) -> InstitutionalTradingEntity` | Create a InstitutionalTrading entity instance. |
| `InvestmentAdviser` | `(data) -> InvestmentAdviserEntity` | Create a InvestmentAdviser entity instance. |
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
| `load` | `(reqmatch, ctrl) -> [any, err]` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> [any, err]` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> [any, err]` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> [any, err]` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> [any, err]` | Remove an entity. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return `[any, err]`. The first value is a
`Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

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

Create an instance: `const basic_information = client.BasicInformation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const basic_information = await client.BasicInformation().load({ id: 'basic_information_id' })
```


### CryptoCurrency

Create an instance: `const crypto_currency = client.CryptoCurrency()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const crypto_currency = await client.CryptoCurrency().load({ id: 'crypto_currency_id' })
```


### DerivativesData

Create an instance: `const derivatives_data = client.DerivativesData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const derivatives_data = await client.DerivativesData().load({ id: 'derivatives_data_id' })
```


### EsgData

Create an instance: `const esg_data = client.EsgData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const esg_data = await client.EsgData().load({ id: 'esg_data_id' })
```


### EtfData

Create an instance: `const etf_data = client.EtfData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const etf_data = await client.EtfData().load({ id: 'etf_data_id' })
```


### EventCalendar

Create an instance: `const event_calendar = client.EventCalendar()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const event_calendar = await client.EventCalendar().load({ id: 'event_calendar_id' })
```


### FinancialRatio

Create an instance: `const financial_ratio = client.FinancialRatio()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const financial_ratio = await client.FinancialRatio().load({ id: 'financial_ratio_id' })
```


### FinancialStatement

Create an instance: `const financial_statement = client.FinancialStatement()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const financial_statement = await client.FinancialStatement().load({ id: 'financial_statement_id' })
```


### ForexData

Create an instance: `const forex_data = client.ForexData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const forex_data = await client.ForexData().load({ id: 'forex_data_id' })
```


### InsiderTrading

Create an instance: `const insider_trading = client.InsiderTrading()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const insider_trading = await client.InsiderTrading().load({ id: 'insider_trading_id' })
```


### InstitutionalTrading

Create an instance: `const institutional_trading = client.InstitutionalTrading()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const institutional_trading = await client.InstitutionalTrading().load({ id: 'institutional_trading_id' })
```


### InvestmentAdviser

Create an instance: `const investment_adviser = client.InvestmentAdviser()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const investment_adviser = await client.InvestmentAdviser().load({ id: 'investment_adviser_id' })
```


### MarketData

Create an instance: `const market_data = client.MarketData()`

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

```ts
const market_data = await client.MarketData().load({ id: 'market_data_id' })
```

#### Example: List

```ts
const market_datas = await client.MarketData().list()
```


### MarketIndex

Create an instance: `const market_index = client.MarketIndex()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const market_index = await client.MarketIndex().load({ id: 'market_index_id' })
```


### MarketNew

Create an instance: `const market_new = client.MarketNew()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const market_new = await client.MarketNew().load({ id: 'market_new_id' })
```


### MiscellaneousData

Create an instance: `const miscellaneous_data = client.MiscellaneousData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const miscellaneous_data = await client.MiscellaneousData().load({ id: 'miscellaneous_data_id' })
```


### MutualFund

Create an instance: `const mutual_fund = client.MutualFund()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const mutual_fund = await client.MutualFund().load({ id: 'mutual_fund_id' })
```


### SymbolList

Create an instance: `const symbol_list = client.SymbolList()`

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

```ts
const symbol_lists = await client.SymbolList().list()
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
moon = client.Moon
moon.load({ "planet_id" => "earth", "id" => "luna" })

# moon.data_get now returns the loaded moon data
# moon.match_get returns the last match criteria
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
