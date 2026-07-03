# FinancialData Golang SDK Reference

Complete API reference for the FinancialData Golang SDK.


## FinancialDataSDK

### Constructor

```go
func NewFinancialDataSDK(options map[string]any) *FinancialDataSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *FinancialDataSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *FinancialDataSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `BasicInformation(data map[string]any) FinancialDataEntity`

Create a new `BasicInformation` entity instance. Pass `nil` for no initial data.

#### `CryptoCurrency(data map[string]any) FinancialDataEntity`

Create a new `CryptoCurrency` entity instance. Pass `nil` for no initial data.

#### `DerivativesData(data map[string]any) FinancialDataEntity`

Create a new `DerivativesData` entity instance. Pass `nil` for no initial data.

#### `EsgData(data map[string]any) FinancialDataEntity`

Create a new `EsgData` entity instance. Pass `nil` for no initial data.

#### `EtfData(data map[string]any) FinancialDataEntity`

Create a new `EtfData` entity instance. Pass `nil` for no initial data.

#### `EventCalendar(data map[string]any) FinancialDataEntity`

Create a new `EventCalendar` entity instance. Pass `nil` for no initial data.

#### `FinancialRatio(data map[string]any) FinancialDataEntity`

Create a new `FinancialRatio` entity instance. Pass `nil` for no initial data.

#### `FinancialStatement(data map[string]any) FinancialDataEntity`

Create a new `FinancialStatement` entity instance. Pass `nil` for no initial data.

#### `ForexData(data map[string]any) FinancialDataEntity`

Create a new `ForexData` entity instance. Pass `nil` for no initial data.

#### `InsiderTrading(data map[string]any) FinancialDataEntity`

Create a new `InsiderTrading` entity instance. Pass `nil` for no initial data.

#### `InstitutionalTrading(data map[string]any) FinancialDataEntity`

Create a new `InstitutionalTrading` entity instance. Pass `nil` for no initial data.

#### `InvestmentAdviser(data map[string]any) FinancialDataEntity`

Create a new `InvestmentAdviser` entity instance. Pass `nil` for no initial data.

#### `MarketData(data map[string]any) FinancialDataEntity`

Create a new `MarketData` entity instance. Pass `nil` for no initial data.

#### `MarketIndex(data map[string]any) FinancialDataEntity`

Create a new `MarketIndex` entity instance. Pass `nil` for no initial data.

#### `MarketNew(data map[string]any) FinancialDataEntity`

Create a new `MarketNew` entity instance. Pass `nil` for no initial data.

#### `MiscellaneousData(data map[string]any) FinancialDataEntity`

Create a new `MiscellaneousData` entity instance. Pass `nil` for no initial data.

#### `MutualFund(data map[string]any) FinancialDataEntity`

Create a new `MutualFund` entity instance. Pass `nil` for no initial data.

#### `SymbolList(data map[string]any) FinancialDataEntity`

Create a new `SymbolList` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BasicInformationEntity

```go
basic_information := client.BasicInformation(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BasicInformation(nil).Load(map[string]any{"id": "basic_information_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BasicInformationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CryptoCurrencyEntity

```go
crypto_currency := client.CryptoCurrency(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CryptoCurrency(nil).Load(map[string]any{"id": "crypto_currency_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CryptoCurrencyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DerivativesDataEntity

```go
derivatives_data := client.DerivativesData(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DerivativesData(nil).Load(map[string]any{"id": "derivatives_data_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DerivativesDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EsgDataEntity

```go
esg_data := client.EsgData(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EsgData(nil).Load(map[string]any{"id": "esg_data_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EsgDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EtfDataEntity

```go
etf_data := client.EtfData(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EtfData(nil).Load(map[string]any{"id": "etf_data_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EtfDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventCalendarEntity

```go
event_calendar := client.EventCalendar(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EventCalendar(nil).Load(map[string]any{"id": "event_calendar_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventCalendarEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FinancialRatioEntity

```go
financial_ratio := client.FinancialRatio(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FinancialRatio(nil).Load(map[string]any{"id": "financial_ratio_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FinancialRatioEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FinancialStatementEntity

```go
financial_statement := client.FinancialStatement(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FinancialStatement(nil).Load(map[string]any{"id": "financial_statement_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FinancialStatementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ForexDataEntity

```go
forex_data := client.ForexData(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ForexData(nil).Load(map[string]any{"id": "forex_data_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ForexDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InsiderTradingEntity

```go
insider_trading := client.InsiderTrading(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InsiderTrading(nil).Load(map[string]any{"id": "insider_trading_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InsiderTradingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InstitutionalTradingEntity

```go
institutional_trading := client.InstitutionalTrading(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InstitutionalTrading(nil).Load(map[string]any{"id": "institutional_trading_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InstitutionalTradingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InvestmentAdviserEntity

```go
investment_adviser := client.InvestmentAdviser(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InvestmentAdviser(nil).Load(map[string]any{"id": "investment_adviser_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InvestmentAdviserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MarketDataEntity

```go
market_data := client.MarketData(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.MarketData(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MarketData(nil).Load(map[string]any{"id": "market_data_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MarketDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MarketIndexEntity

```go
market_index := client.MarketIndex(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MarketIndex(nil).Load(map[string]any{"id": "market_index_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MarketIndexEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MarketNewEntity

```go
market_new := client.MarketNew(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MarketNew(nil).Load(map[string]any{"id": "market_new_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MarketNewEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MiscellaneousDataEntity

```go
miscellaneous_data := client.MiscellaneousData(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MiscellaneousData(nil).Load(map[string]any{"id": "miscellaneous_data_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MiscellaneousDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MutualFundEntity

```go
mutual_fund := client.MutualFund(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MutualFund(nil).Load(map[string]any{"id": "mutual_fund_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MutualFundEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SymbolListEntity

```go
symbol_list := client.SymbolList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `registrant_name` | ``$STRING`` | No |  |
| `title_of_security` | ``$STRING`` | No |  |
| `trading_symbol` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SymbolList(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SymbolListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewFinancialDataSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

