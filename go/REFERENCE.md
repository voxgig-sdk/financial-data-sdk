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
basicInformation := client.BasicInformation(nil)
fmt.Println(basicInformation.GetName()) // "basic_information"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.BasicInformation(nil).Load(map[string]any{"identifier": "identifier", "key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
cryptoCurrency := client.CryptoCurrency(nil)
fmt.Println(cryptoCurrency.GetName()) // "crypto_currency"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CryptoCurrency(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
derivativesData := client.DerivativesData(nil)
fmt.Println(derivativesData.GetName()) // "derivatives_data"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DerivativesData(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
esgData := client.EsgData(nil)
fmt.Println(esgData.GetName()) // "esg_data"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EsgData(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
etfData := client.EtfData(nil)
fmt.Println(etfData.GetName()) // "etf_data"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EtfData(nil).Load(map[string]any{"identifier": "identifier", "key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
eventCalendar := client.EventCalendar(nil)
fmt.Println(eventCalendar.GetName()) // "event_calendar"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EventCalendar(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
financialRatio := client.FinancialRatio(nil)
fmt.Println(financialRatio.GetName()) // "financial_ratio"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FinancialRatio(nil).Load(map[string]any{"identifier": "identifier", "key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
financialStatement := client.FinancialStatement(nil)
fmt.Println(financialStatement.GetName()) // "financial_statement"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FinancialStatement(nil).Load(map[string]any{"identifier": "identifier", "key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
forexData := client.ForexData(nil)
fmt.Println(forexData.GetName()) // "forex_data"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ForexData(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
insiderTrading := client.InsiderTrading(nil)
fmt.Println(insiderTrading.GetName()) // "insider_trading"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InsiderTrading(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
institutionalTrading := client.InstitutionalTrading(nil)
fmt.Println(institutionalTrading.GetName()) // "institutional_trading"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InstitutionalTrading(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
investmentAdviser := client.InvestmentAdviser(nil)
fmt.Println(investmentAdviser.GetName()) // "investment_adviser"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InvestmentAdviser(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
marketData := client.MarketData(nil)
fmt.Println(marketData.GetName()) // "market_data"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `change` | `float64` | No |  |
| `close` | `float64` | No |  |
| `date` | `string` | No |  |
| `high` | `float64` | No |  |
| `low` | `float64` | No |  |
| `open` | `float64` | No |  |
| `percentage_change` | `float64` | No |  |
| `price` | `float64` | No |  |
| `registrant_name` | `string` | No |  |
| `time` | `string` | No |  |
| `trading_symbol` | `string` | No |  |
| `volume` | `float64` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.MarketData(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MarketData(nil).Load(map[string]any{"identifier": "identifier", "key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
marketIndex := client.MarketIndex(nil)
fmt.Println(marketIndex.GetName()) // "market_index"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MarketIndex(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
marketNew := client.MarketNew(nil)
fmt.Println(marketNew.GetName()) // "market_new"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MarketNew(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
miscellaneousData := client.MiscellaneousData(nil)
fmt.Println(miscellaneousData.GetName()) // "miscellaneous_data"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MiscellaneousData(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
mutualFund := client.MutualFund(nil)
fmt.Println(mutualFund.GetName()) // "mutual_fund"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MutualFund(nil).Load(map[string]any{"key": "key"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
symbolList := client.SymbolList(nil)
fmt.Println(symbolList.GetName()) // "symbol_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `registrant_name` | `string` | No |  |
| `title_of_security` | `string` | No |  |
| `trading_symbol` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SymbolList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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

