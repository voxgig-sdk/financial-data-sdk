# FinancialData SDK

Stock, ETF, crypto, forex, options, futures and fundamentals across US and international markets from a single REST API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Financial Data API

[Financial Data API](https://financialdata.net) is a commercial REST service that aggregates market data, company fundamentals and alternative datasets for equities, ETFs, mutual funds, options, futures, cryptocurrencies and forex pairs. It covers both US-listed and international securities through a single endpoint surface at `https://financialdata.net/api/v1`.

What you get from the API:

- Symbol catalogues for stocks, international stocks, ETFs, commodities, OTC, indexes, options, futures, crypto and forex
- Real-time and historical quotes and prices, including minute bars for stocks, crypto and forex
- Company basics, key metrics, market cap, employee counts, executive compensation and securities information
- Income statements, balance sheets and cash flow statements for US and international issuers
- Financial ratios across liquidity, solvency, efficiency, profitability and valuation
- Option chains with Greeks, plus futures prices
- Event calendars (earnings, IPOs, dividends), press releases and SEC/Fed releases
- Insider trading, institutional holdings, ETF and mutual fund holdings, ESG scores and investment adviser records

Authentication is via an API key appended as `?key=API_KEY` (or `&key=API_KEY` when other parameters are present). Most list endpoints return 300-500 records per call and support an `offset` parameter for pagination. CORS is disabled on the service.

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

## 30-second quickstart

### TypeScript

```ts
import { FinancialDataSDK } from 'financial-data'

const client = new FinancialDataSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **BasicInformation** | Company-level reference data such as profile, key metrics, market cap, employee count and executive compensation. | `/company-information` |
| **CryptoCurrency** | Cryptocurrency symbols, metadata, quotes and historical/minute prices. | `/crypto-minute-prices` |
| **DerivativesData** | Option chains with prices and Greeks, plus futures symbols and prices. | `/futures-prices` |
| **EsgData** | Environmental, social and governance ratings and scores for covered companies. | `/esg-ratings` |
| **EtfData** | ETF reference data, prices and holdings. | `/etf-holdings` |
| **EventCalendar** | Forward-looking calendars for earnings, IPOs and dividends. | `/dividends-calendar` |
| **FinancialRatio** | Computed liquidity, solvency, efficiency, profitability and valuation ratios per issuer. | `/efficiency-ratios` |
| **FinancialStatement** | Income statements, balance sheets and cash flow statements for US and international companies. | `/balance-sheet-statements` |
| **ForexData** | Currency pair symbols, quotes and historical/minute prices. | `/forex-minute-prices` |
| **InsiderTrading** | Reported insider transactions for covered securities. | `/insider-transactions` |
| **InstitutionalTrading** | Institutional holdings and position changes for covered securities. | `/institutional-holdings` |
| **InvestmentAdviser** | Reference records for registered investment advisers. | `/investment-adviser-information` |
| **MarketData** | Real-time and historical quotes, latest prices, minute bars and volumes across stocks, OTC and commodities. | `/minute-prices` |
| **MarketIndex** | Index symbols, quotes, historical prices and constituent membership. | `/index-prices` |
| **MarketNew** | Press releases plus SEC and Federal Reserve releases relevant to covered issuers. | `/press-releases` |
| **MiscellaneousData** | Supplementary datasets that do not fall into the other entity groups. | `/dividends` |
| **MutualFund** | Mutual fund reference data, prices and holdings. | `/mutual-fund-holdings` |
| **SymbolList** | Master symbol catalogues for stocks, international stocks, ETFs, commodities and OTC securities. | `/etf-symbols` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from financialdata_sdk import FinancialDataSDK

client = FinancialDataSDK({})


# Load a specific basicinformation
basicinformation, err = client.BasicInformation(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'financialdata_sdk.php';

$client = new FinancialDataSDK([]);


// Load a specific basicinformation
[$basicinformation, $err] = $client->BasicInformation(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/financial-data-sdk/go"

client := sdk.NewFinancialDataSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "FinancialData_sdk"

client = FinancialDataSDK.new({})


# Load a specific basicinformation
basicinformation, err = client.BasicInformation(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("financial-data_sdk")

local client = sdk.new({})


-- Load a specific basicinformation
local basicinformation, err = client:BasicInformation(nil):load(
  { id = "example_id" }, nil
)
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
client = FinancialDataSDK.test(None, None)
result, err = client.BasicInformation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FinancialDataSDK::test(null, null);
[$result, $err] = $client->BasicInformation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.BasicInformation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FinancialDataSDK.test(nil, nil)
result, err = client.BasicInformation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:BasicInformation(nil):load(
  { id = "test01" }, nil
)
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

## Using the Financial Data API

- Upstream: [https://financialdata.net](https://financialdata.net)
- API docs: [https://financialdata.net/documentation](https://financialdata.net/documentation)

- Operated commercially by financialdata.net with Free, Standard and Premium tiers
- Requires an API key, passed as a `key` query parameter on every request
- Pricing, redistribution rules and per-tier quotas are governed by the financialdata.net terms of service
- CORS is disabled, so requests should be made from a backend rather than directly from a browser

---

Generated from the Financial Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
