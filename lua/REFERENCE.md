# FinancialData Lua SDK Reference

Complete API reference for the FinancialData Lua SDK.


## FinancialDataSDK

### Constructor

```lua
local sdk = require("financial-data_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `BasicInformation(data)`

Create a new `BasicInformation` entity instance. Pass `nil` for no initial data.

#### `CryptoCurrency(data)`

Create a new `CryptoCurrency` entity instance. Pass `nil` for no initial data.

#### `DerivativesData(data)`

Create a new `DerivativesData` entity instance. Pass `nil` for no initial data.

#### `EsgData(data)`

Create a new `EsgData` entity instance. Pass `nil` for no initial data.

#### `EtfData(data)`

Create a new `EtfData` entity instance. Pass `nil` for no initial data.

#### `EventCalendar(data)`

Create a new `EventCalendar` entity instance. Pass `nil` for no initial data.

#### `FinancialRatio(data)`

Create a new `FinancialRatio` entity instance. Pass `nil` for no initial data.

#### `FinancialStatement(data)`

Create a new `FinancialStatement` entity instance. Pass `nil` for no initial data.

#### `ForexData(data)`

Create a new `ForexData` entity instance. Pass `nil` for no initial data.

#### `InsiderTrading(data)`

Create a new `InsiderTrading` entity instance. Pass `nil` for no initial data.

#### `InstitutionalTrading(data)`

Create a new `InstitutionalTrading` entity instance. Pass `nil` for no initial data.

#### `InvestmentAdviser(data)`

Create a new `InvestmentAdviser` entity instance. Pass `nil` for no initial data.

#### `MarketData(data)`

Create a new `MarketData` entity instance. Pass `nil` for no initial data.

#### `MarketIndex(data)`

Create a new `MarketIndex` entity instance. Pass `nil` for no initial data.

#### `MarketNew(data)`

Create a new `MarketNew` entity instance. Pass `nil` for no initial data.

#### `MiscellaneousData(data)`

Create a new `MiscellaneousData` entity instance. Pass `nil` for no initial data.

#### `MutualFund(data)`

Create a new `MutualFund` entity instance. Pass `nil` for no initial data.

#### `SymbolList(data)`

Create a new `SymbolList` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BasicInformationEntity

```lua
local basic_information = client:basic_information(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:basic_information():load({ id = "basic_information_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BasicInformationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CryptoCurrencyEntity

```lua
local crypto_currency = client:crypto_currency(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:crypto_currency():load({ id = "crypto_currency_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CryptoCurrencyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DerivativesDataEntity

```lua
local derivatives_data = client:derivatives_data(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:derivatives_data():load({ id = "derivatives_data_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DerivativesDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EsgDataEntity

```lua
local esg_data = client:esg_data(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:esg_data():load({ id = "esg_data_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EsgDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EtfDataEntity

```lua
local etf_data = client:etf_data(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:etf_data():load({ id = "etf_data_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EtfDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventCalendarEntity

```lua
local event_calendar = client:event_calendar(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:event_calendar():load({ id = "event_calendar_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventCalendarEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FinancialRatioEntity

```lua
local financial_ratio = client:financial_ratio(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:financial_ratio():load({ id = "financial_ratio_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FinancialRatioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FinancialStatementEntity

```lua
local financial_statement = client:financial_statement(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:financial_statement():load({ id = "financial_statement_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FinancialStatementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ForexDataEntity

```lua
local forex_data = client:forex_data(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:forex_data():load({ id = "forex_data_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ForexDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InsiderTradingEntity

```lua
local insider_trading = client:insider_trading(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:insider_trading():load({ id = "insider_trading_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InsiderTradingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InstitutionalTradingEntity

```lua
local institutional_trading = client:institutional_trading(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:institutional_trading():load({ id = "institutional_trading_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InstitutionalTradingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InvestmentAdviserEntity

```lua
local investment_adviser = client:investment_adviser(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:investment_adviser():load({ id = "investment_adviser_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvestmentAdviserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MarketDataEntity

```lua
local market_data = client:market_data(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `change` | ``$NUMBER`` | No |  |
| `close` | ``$NUMBER`` | No |  |
| `date` | ``$STRING`` | No |  |
| `high` | ``$NUMBER`` | No |  |
| `low` | ``$NUMBER`` | No |  |
| `open` | ``$NUMBER`` | No |  |
| `percentage_change` | ``$NUMBER`` | No |  |
| `price` | ``$NUMBER`` | No |  |
| `registrant_name` | ``$STRING`` | No |  |
| `time` | ``$STRING`` | No |  |
| `trading_symbol` | ``$STRING`` | No |  |
| `volume` | ``$NUMBER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:market_data():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:market_data():load({ id = "market_data_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MarketIndexEntity

```lua
local market_index = client:market_index(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:market_index():load({ id = "market_index_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketIndexEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MarketNewEntity

```lua
local market_new = client:market_new(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:market_new():load({ id = "market_new_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketNewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MiscellaneousDataEntity

```lua
local miscellaneous_data = client:miscellaneous_data(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:miscellaneous_data():load({ id = "miscellaneous_data_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MiscellaneousDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MutualFundEntity

```lua
local mutual_fund = client:mutual_fund(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:mutual_fund():load({ id = "mutual_fund_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MutualFundEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SymbolListEntity

```lua
local symbol_list = client:symbol_list(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `registrant_name` | ``$STRING`` | No |  |
| `title_of_security` | ``$STRING`` | No |  |
| `trading_symbol` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:symbol_list():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SymbolListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

