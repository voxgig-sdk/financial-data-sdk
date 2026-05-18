# FinancialData SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Go MCP server](go-mcp/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 18 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **BasicInformation** |  | `/company-information` |
| **CryptoCurrency** |  | `/crypto-minute-prices` |
| **DerivativesData** |  | `/futures-prices` |
| **EsgData** |  | `/esg-ratings` |
| **EtfData** |  | `/etf-holdings` |
| **EventCalendar** |  | `/dividends-calendar` |
| **FinancialRatio** |  | `/efficiency-ratios` |
| **FinancialStatement** |  | `/balance-sheet-statements` |
| **ForexData** |  | `/forex-minute-prices` |
| **InsiderTrading** |  | `/insider-transactions` |
| **InstitutionalTrading** |  | `/institutional-holdings` |
| **InvestmentAdviser** |  | `/investment-adviser-information` |
| **MarketData** |  | `/minute-prices` |
| **MarketIndex** |  | `/index-prices` |
| **MarketNew** |  | `/press-releases` |
| **MiscellaneousData** |  | `/dividends` |
| **MutualFund** |  | `/mutual-fund-holdings` |
| **SymbolList** |  | `/etf-symbols` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/financial-data-sdk/go"

client := sdk.NewFinancialDataSDK(map[string]any{
    "apikey": os.Getenv("FINANCIAL-DATA_APIKEY"),
})

```

### Lua

```lua
local sdk = require("financial-data_sdk")

local client = sdk.new({
  apikey = os.getenv("FINANCIAL-DATA_APIKEY"),
})


-- Load a specific basicinformation
local basicinformation, err = client:BasicInformation(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'financialdata_sdk.php';

$client = new FinancialDataSDK([
    "apikey" => getenv("FINANCIAL-DATA_APIKEY"),
]);


// Load a specific basicinformation
[$basicinformation, $err] = $client->BasicInformation(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from financialdata_sdk import FinancialDataSDK

client = FinancialDataSDK({
    "apikey": os.environ.get("FINANCIAL-DATA_APIKEY"),
})


# Load a specific basicinformation
basicinformation, err = client.BasicInformation(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "FinancialData_sdk"

client = FinancialDataSDK.new({
  "apikey" => ENV["FINANCIAL-DATA_APIKEY"],
})


# Load a specific basicinformation
basicinformation, err = client.BasicInformation(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { FinancialDataSDK } from 'financial-data'

const client = new FinancialDataSDK({
  apikey: process.env.FINANCIAL-DATA_APIKEY,
})

```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.BasicInformation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:BasicInformation(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = FinancialDataSDK::test(null, null);
[$result, $err] = $client->BasicInformation(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = FinancialDataSDK.test(None, None)
result, err = client.BasicInformation(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = FinancialDataSDK.test(nil, nil)
result, err = client.BasicInformation(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = FinancialDataSDK.test()
const result = await client.BasicInformation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Go MCP server SDK](go-mcp/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

