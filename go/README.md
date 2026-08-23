# FinancialData Golang SDK



The Golang SDK for the FinancialData API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.BasicInformation(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/financial-data-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/financial-data-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/financial-data-sdk/go=../financial-data-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/financial-data-sdk/go"
)

func main() {
    client := sdk.NewFinancialDataSDK(map[string]any{
        "apikey": os.Getenv("FINANCIAL_DATA_APIKEY"),
    })

    // Load a single basicInformation — the value is the loaded record.
    basicInformation, err := client.BasicInformation(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(basicInformation)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
cryptocurrency, err := client.CryptoCurrency(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = cryptocurrency
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

cryptoCurrency, err := client.CryptoCurrency(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(cryptoCurrency) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewFinancialDataSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewFinancialDataSDK

```go
func NewFinancialDataSDK(options map[string]any) *FinancialDataSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *FinancialDataSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FinancialDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `BasicInformation` | `(data map[string]any) FinancialDataEntity` | Create a BasicInformation entity instance. |
| `CryptoCurrency` | `(data map[string]any) FinancialDataEntity` | Create a CryptoCurrency entity instance. |
| `DerivativesData` | `(data map[string]any) FinancialDataEntity` | Create a DerivativesData entity instance. |
| `EsgData` | `(data map[string]any) FinancialDataEntity` | Create an EsgData entity instance. |
| `EtfData` | `(data map[string]any) FinancialDataEntity` | Create an EtfData entity instance. |
| `EventCalendar` | `(data map[string]any) FinancialDataEntity` | Create an EventCalendar entity instance. |
| `FinancialRatio` | `(data map[string]any) FinancialDataEntity` | Create a FinancialRatio entity instance. |
| `FinancialStatement` | `(data map[string]any) FinancialDataEntity` | Create a FinancialStatement entity instance. |
| `ForexData` | `(data map[string]any) FinancialDataEntity` | Create a ForexData entity instance. |
| `InsiderTrading` | `(data map[string]any) FinancialDataEntity` | Create an InsiderTrading entity instance. |
| `InstitutionalTrading` | `(data map[string]any) FinancialDataEntity` | Create an InstitutionalTrading entity instance. |
| `InvestmentAdviser` | `(data map[string]any) FinancialDataEntity` | Create an InvestmentAdviser entity instance. |
| `MarketData` | `(data map[string]any) FinancialDataEntity` | Create a MarketData entity instance. |
| `MarketIndex` | `(data map[string]any) FinancialDataEntity` | Create a MarketIndex entity instance. |
| `MarketNew` | `(data map[string]any) FinancialDataEntity` | Create a MarketNew entity instance. |
| `MiscellaneousData` | `(data map[string]any) FinancialDataEntity` | Create a MiscellaneousData entity instance. |
| `MutualFund` | `(data map[string]any) FinancialDataEntity` | Create a MutualFund entity instance. |
| `SymbolList` | `(data map[string]any) FinancialDataEntity` | Create a SymbolList entity instance. |

### Entity interface (FinancialDataEntity)

All entities implement the `FinancialDataEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    basicInformation, err := client.BasicInformation(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // basicInformation is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `"change"` |  |
| `"close"` |  |
| `"date"` |  |
| `"high"` |  |
| `"low"` |  |
| `"open"` |  |
| `"percentage_change"` |  |
| `"price"` |  |
| `"registrant_name"` |  |
| `"time"` |  |
| `"trading_symbol"` |  |
| `"volume"` |  |

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
| `"description"` |  |
| `"registrant_name"` |  |
| `"title_of_security"` |  |
| `"trading_symbol"` |  |

Operations: List.

API path: `/etf-symbols`



## Entities


### BasicInformation

Create an instance: `basicInformation := client.BasicInformation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
basicInformation, err := client.BasicInformation(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(basicInformation) // the loaded record
```


### CryptoCurrency

Create an instance: `cryptoCurrency := client.CryptoCurrency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
cryptoCurrency, err := client.CryptoCurrency(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cryptoCurrency) // the loaded record
```


### DerivativesData

Create an instance: `derivativesData := client.DerivativesData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
derivativesData, err := client.DerivativesData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(derivativesData) // the loaded record
```


### EsgData

Create an instance: `esgData := client.EsgData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
esgData, err := client.EsgData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(esgData) // the loaded record
```


### EtfData

Create an instance: `etfData := client.EtfData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
etfData, err := client.EtfData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(etfData) // the loaded record
```


### EventCalendar

Create an instance: `eventCalendar := client.EventCalendar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
eventCalendar, err := client.EventCalendar(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(eventCalendar) // the loaded record
```


### FinancialRatio

Create an instance: `financialRatio := client.FinancialRatio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
financialRatio, err := client.FinancialRatio(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(financialRatio) // the loaded record
```


### FinancialStatement

Create an instance: `financialStatement := client.FinancialStatement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
financialStatement, err := client.FinancialStatement(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(financialStatement) // the loaded record
```


### ForexData

Create an instance: `forexData := client.ForexData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
forexData, err := client.ForexData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(forexData) // the loaded record
```


### InsiderTrading

Create an instance: `insiderTrading := client.InsiderTrading(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
insiderTrading, err := client.InsiderTrading(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(insiderTrading) // the loaded record
```


### InstitutionalTrading

Create an instance: `institutionalTrading := client.InstitutionalTrading(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
institutionalTrading, err := client.InstitutionalTrading(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(institutionalTrading) // the loaded record
```


### InvestmentAdviser

Create an instance: `investmentAdviser := client.InvestmentAdviser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
investmentAdviser, err := client.InvestmentAdviser(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(investmentAdviser) // the loaded record
```


### MarketData

Create an instance: `marketData := client.MarketData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change` | `float64` |  |
| `close` | `float64` |  |
| `date` | `string` |  |
| `high` | `float64` |  |
| `low` | `float64` |  |
| `open` | `float64` |  |
| `percentage_change` | `float64` |  |
| `price` | `float64` |  |
| `registrant_name` | `string` |  |
| `time` | `string` |  |
| `trading_symbol` | `string` |  |
| `volume` | `float64` |  |

#### Example: Load

```go
marketData, err := client.MarketData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(marketData) // the loaded record
```

#### Example: List

```go
marketDatas, err := client.MarketData(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(marketDatas) // the array of records
```


### MarketIndex

Create an instance: `marketIndex := client.MarketIndex(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
marketIndex, err := client.MarketIndex(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(marketIndex) // the loaded record
```


### MarketNew

Create an instance: `marketNew := client.MarketNew(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
marketNew, err := client.MarketNew(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(marketNew) // the loaded record
```


### MiscellaneousData

Create an instance: `miscellaneousData := client.MiscellaneousData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
miscellaneousData, err := client.MiscellaneousData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(miscellaneousData) // the loaded record
```


### MutualFund

Create an instance: `mutualFund := client.MutualFund(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
mutualFund, err := client.MutualFund(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(mutualFund) // the loaded record
```


### SymbolList

Create an instance: `symbolList := client.SymbolList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `registrant_name` | `string` |  |
| `title_of_security` | `string` |  |
| `trading_symbol` | `string` |  |

#### Example: List

```go
symbolLists, err := client.SymbolList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(symbolLists) // the array of records
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/financial-data-sdk/go/
├── financial-data.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/financial-data-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
cryptocurrency := client.CryptoCurrency(nil)
cryptocurrency.Load(nil, nil)

// cryptocurrency.Data() now returns the cryptocurrency data from the last load
// cryptocurrency.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
