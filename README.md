# FinancialData SDK

Financial Data API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install financial-data
```

**Python**
```bash
pip install financial-data-sdk
```

**PHP**
```bash
composer require voxgig/financial-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/financial-data-sdk/go
```

**Ruby**
```bash
gem install financial-data-sdk
```

**Lua**
```bash
luarocks install financial-data-sdk
```

## Quickstart

### TypeScript

```ts
import { FinancialDataSDK } from 'financial-data'

const client = new FinancialDataSDK({
  apikey: process.env.FINANCIAL-DATA_APIKEY,
})

// Load basicinformation data
const basicinformation = await client.BasicInformation().load({})
console.log(basicinformation.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o financial-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "financial-data": {
      "command": "/abs/path/to/financial-data-mcp"
    }
  }
}
```

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

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from financialdata_sdk import FinancialDataSDK

client = FinancialDataSDK({
    "apikey": os.environ.get("FINANCIAL-DATA_APIKEY"),
})


# Load a specific basicinformation
basicinformation, err = client.BasicInformation().load({"id": "example_id"})
print(basicinformation)
```

### PHP

```php
<?php
require_once 'financialdata_sdk.php';

$client = new FinancialDataSDK([
    "apikey" => getenv("FINANCIAL-DATA_APIKEY"),
]);


// Load a specific basicinformation
[$basicinformation, $err] = $client->BasicInformation()->load(["id" => "example_id"]);
print_r($basicinformation);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/financial-data-sdk/go"

client := sdk.NewFinancialDataSDK(map[string]any{
    "apikey": os.Getenv("FINANCIAL-DATA_APIKEY"),
})

// Load basicinformation data
basicinformation, err := client.BasicInformation(nil).Load(map[string]any{}, nil)
fmt.Println(basicinformation)
```

### Ruby

```ruby
require_relative "FinancialData_sdk"

client = FinancialDataSDK.new({
  "apikey" => ENV["FINANCIAL-DATA_APIKEY"],
})


# Load a specific basicinformation
basicinformation, err = client.BasicInformation().load({ "id" => "example_id" })
puts basicinformation
```

### Lua

```lua
local sdk = require("financial-data_sdk")

local client = sdk.new({
  apikey = os.getenv("FINANCIAL-DATA_APIKEY"),
})


-- Load a specific basicinformation
local basicinformation, err = client:BasicInformation():load({ id = "example_id" })
print(basicinformation)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FinancialDataSDK.test()
const result = await client.BasicInformation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FinancialDataSDK.test()
result, err = client.BasicInformation().load({"id": "test01"})
```

### PHP

```php
$client = FinancialDataSDK::test();
[$result, $err] = $client->BasicInformation()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.BasicInformation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FinancialDataSDK.test
result, err = client.BasicInformation().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:BasicInformation():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Financial Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
