# FinancialData Ruby SDK Reference

Complete API reference for the FinancialData Ruby SDK.


## FinancialDataSDK

### Constructor

```ruby
require_relative 'FinancialData_sdk'

client = FinancialDataSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FinancialDataSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = FinancialDataSDK.test
```


### Instance Methods

#### `BasicInformation(data = nil)`

Create a new `BasicInformation` entity instance. Pass `nil` for no initial data.

#### `CryptoCurrency(data = nil)`

Create a new `CryptoCurrency` entity instance. Pass `nil` for no initial data.

#### `DerivativesData(data = nil)`

Create a new `DerivativesData` entity instance. Pass `nil` for no initial data.

#### `EsgData(data = nil)`

Create a new `EsgData` entity instance. Pass `nil` for no initial data.

#### `EtfData(data = nil)`

Create a new `EtfData` entity instance. Pass `nil` for no initial data.

#### `EventCalendar(data = nil)`

Create a new `EventCalendar` entity instance. Pass `nil` for no initial data.

#### `FinancialRatio(data = nil)`

Create a new `FinancialRatio` entity instance. Pass `nil` for no initial data.

#### `FinancialStatement(data = nil)`

Create a new `FinancialStatement` entity instance. Pass `nil` for no initial data.

#### `ForexData(data = nil)`

Create a new `ForexData` entity instance. Pass `nil` for no initial data.

#### `InsiderTrading(data = nil)`

Create a new `InsiderTrading` entity instance. Pass `nil` for no initial data.

#### `InstitutionalTrading(data = nil)`

Create a new `InstitutionalTrading` entity instance. Pass `nil` for no initial data.

#### `InvestmentAdviser(data = nil)`

Create a new `InvestmentAdviser` entity instance. Pass `nil` for no initial data.

#### `MarketData(data = nil)`

Create a new `MarketData` entity instance. Pass `nil` for no initial data.

#### `MarketIndex(data = nil)`

Create a new `MarketIndex` entity instance. Pass `nil` for no initial data.

#### `MarketNew(data = nil)`

Create a new `MarketNew` entity instance. Pass `nil` for no initial data.

#### `MiscellaneousData(data = nil)`

Create a new `MiscellaneousData` entity instance. Pass `nil` for no initial data.

#### `MutualFund(data = nil)`

Create a new `MutualFund` entity instance. Pass `nil` for no initial data.

#### `SymbolList(data = nil)`

Create a new `SymbolList` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BasicInformationEntity

```ruby
basic_information = client.BasicInformation
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.BasicInformation.load({ "identifier" => "identifier", "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BasicInformationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CryptoCurrencyEntity

```ruby
crypto_currency = client.CryptoCurrency
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CryptoCurrency.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CryptoCurrencyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DerivativesDataEntity

```ruby
derivatives_data = client.DerivativesData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.DerivativesData.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DerivativesDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EsgDataEntity

```ruby
esg_data = client.EsgData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.EsgData.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EsgDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EtfDataEntity

```ruby
etf_data = client.EtfData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.EtfData.load({ "identifier" => "identifier", "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EtfDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventCalendarEntity

```ruby
event_calendar = client.EventCalendar
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.EventCalendar.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventCalendarEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FinancialRatioEntity

```ruby
financial_ratio = client.FinancialRatio
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FinancialRatio.load({ "identifier" => "identifier", "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FinancialRatioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FinancialStatementEntity

```ruby
financial_statement = client.FinancialStatement
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FinancialStatement.load({ "identifier" => "identifier", "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FinancialStatementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ForexDataEntity

```ruby
forex_data = client.ForexData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ForexData.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ForexDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InsiderTradingEntity

```ruby
insider_trading = client.InsiderTrading
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InsiderTrading.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InsiderTradingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InstitutionalTradingEntity

```ruby
institutional_trading = client.InstitutionalTrading
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InstitutionalTrading.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InstitutionalTradingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InvestmentAdviserEntity

```ruby
investment_adviser = client.InvestmentAdviser
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InvestmentAdviser.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InvestmentAdviserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MarketDataEntity

```ruby
market_data = client.MarketData
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `change` | `Float` | No |  |
| `close` | `Float` | No |  |
| `date` | `String` | No |  |
| `high` | `Float` | No |  |
| `low` | `Float` | No |  |
| `open` | `Float` | No |  |
| `percentage_change` | `Float` | No |  |
| `price` | `Float` | No |  |
| `registrant_name` | `String` | No |  |
| `time` | `String` | No |  |
| `trading_symbol` | `String` | No |  |
| `volume` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.MarketData.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.MarketData.load({ "identifier" => "identifier", "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MarketDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MarketIndexEntity

```ruby
market_index = client.MarketIndex
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.MarketIndex.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MarketIndexEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MarketNewEntity

```ruby
market_new = client.MarketNew
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.MarketNew.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MarketNewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MiscellaneousDataEntity

```ruby
miscellaneous_data = client.MiscellaneousData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.MiscellaneousData.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MiscellaneousDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MutualFundEntity

```ruby
mutual_fund = client.MutualFund
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.MutualFund.load({ "key" => "key" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MutualFundEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SymbolListEntity

```ruby
symbol_list = client.SymbolList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `registrant_name` | `String` | No |  |
| `title_of_security` | `String` | No |  |
| `trading_symbol` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SymbolList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SymbolListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = FinancialDataSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

