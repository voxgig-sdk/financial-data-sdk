# FinancialData Golang SDK

The Golang SDK for the FinancialData API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/financial-data-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/financial-data-sdk/go=../path/to/github.com/voxgig-sdk/financial-data-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/financial-data-sdk/go"
    "github.com/voxgig-sdk/financial-data-sdk/go/core"
)

func main() {
    client := sdk.NewFinancialDataSDK(map[string]any{
        "apikey": os.Getenv("FINANCIAL-DATA_APIKEY"),
    })
```

### 3. Load a basicinformation

```go
    result, err = client.BasicInformation(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
FINANCIAL-DATA_TEST_LIVE=TRUE
FINANCIAL-DATA_APIKEY=<your-key>
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
| `EsgData` | `(data map[string]any) FinancialDataEntity` | Create a EsgData entity instance. |
| `EtfData` | `(data map[string]any) FinancialDataEntity` | Create a EtfData entity instance. |
| `EventCalendar` | `(data map[string]any) FinancialDataEntity` | Create a EventCalendar entity instance. |
| `FinancialRatio` | `(data map[string]any) FinancialDataEntity` | Create a FinancialRatio entity instance. |
| `FinancialStatement` | `(data map[string]any) FinancialDataEntity` | Create a FinancialStatement entity instance. |
| `ForexData` | `(data map[string]any) FinancialDataEntity` | Create a ForexData entity instance. |
| `InsiderTrading` | `(data map[string]any) FinancialDataEntity` | Create a InsiderTrading entity instance. |
| `InstitutionalTrading` | `(data map[string]any) FinancialDataEntity` | Create a InstitutionalTrading entity instance. |
| `InvestmentAdviser` | `(data map[string]any) FinancialDataEntity` | Create a InvestmentAdviser entity instance. |
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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

Create an instance: `basic_information := client.BasicInformation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.BasicInformation(nil).Load(map[string]any{"id": "basic_information_id"}, nil)
```


### CryptoCurrency

Create an instance: `crypto_currency := client.CryptoCurrency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.CryptoCurrency(nil).Load(map[string]any{"id": "crypto_currency_id"}, nil)
```


### DerivativesData

Create an instance: `derivatives_data := client.DerivativesData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.DerivativesData(nil).Load(map[string]any{"id": "derivatives_data_id"}, nil)
```


### EsgData

Create an instance: `esg_data := client.EsgData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.EsgData(nil).Load(map[string]any{"id": "esg_data_id"}, nil)
```


### EtfData

Create an instance: `etf_data := client.EtfData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.EtfData(nil).Load(map[string]any{"id": "etf_data_id"}, nil)
```


### EventCalendar

Create an instance: `event_calendar := client.EventCalendar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.EventCalendar(nil).Load(map[string]any{"id": "event_calendar_id"}, nil)
```


### FinancialRatio

Create an instance: `financial_ratio := client.FinancialRatio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.FinancialRatio(nil).Load(map[string]any{"id": "financial_ratio_id"}, nil)
```


### FinancialStatement

Create an instance: `financial_statement := client.FinancialStatement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.FinancialStatement(nil).Load(map[string]any{"id": "financial_statement_id"}, nil)
```


### ForexData

Create an instance: `forex_data := client.ForexData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.ForexData(nil).Load(map[string]any{"id": "forex_data_id"}, nil)
```


### InsiderTrading

Create an instance: `insider_trading := client.InsiderTrading(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.InsiderTrading(nil).Load(map[string]any{"id": "insider_trading_id"}, nil)
```


### InstitutionalTrading

Create an instance: `institutional_trading := client.InstitutionalTrading(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.InstitutionalTrading(nil).Load(map[string]any{"id": "institutional_trading_id"}, nil)
```


### InvestmentAdviser

Create an instance: `investment_adviser := client.InvestmentAdviser(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.InvestmentAdviser(nil).Load(map[string]any{"id": "investment_adviser_id"}, nil)
```


### MarketData

Create an instance: `market_data := client.MarketData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.MarketData(nil).Load(map[string]any{"id": "market_data_id"}, nil)
```

#### Example: List

```go
results, err := client.MarketData(nil).List(nil, nil)
```


### MarketIndex

Create an instance: `market_index := client.MarketIndex(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.MarketIndex(nil).Load(map[string]any{"id": "market_index_id"}, nil)
```


### MarketNew

Create an instance: `market_new := client.MarketNew(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.MarketNew(nil).Load(map[string]any{"id": "market_new_id"}, nil)
```


### MiscellaneousData

Create an instance: `miscellaneous_data := client.MiscellaneousData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.MiscellaneousData(nil).Load(map[string]any{"id": "miscellaneous_data_id"}, nil)
```


### MutualFund

Create an instance: `mutual_fund := client.MutualFund(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.MutualFund(nil).Load(map[string]any{"id": "mutual_fund_id"}, nil)
```


### SymbolList

Create an instance: `symbol_list := client.SymbolList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `registrant_name` | ``$STRING`` |  |
| `title_of_security` | ``$STRING`` |  |
| `trading_symbol` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.SymbolList(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
