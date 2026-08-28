# FinancialData TypeScript SDK



The TypeScript SDK for the FinancialData API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.BasicInformation()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/financial-data-sdk/releases](https://github.com/voxgig-sdk/financial-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FinancialDataSDK } from '@voxgig-sdk/financial-data'

const client = new FinancialDataSDK({
  apikey: process.env.FINANCIAL_DATA_APIKEY,
})
```

### 3. Load a basicinformation

`load()` returns the entity directly and throws on failure:

```ts
try {
  const basicinformation = await client.BasicInformation().load({ identifier: 'example_identifier', key: 'example_key' })
  console.log(basicinformation)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const cryptocurrency = await client.CryptoCurrency().load({ key: "example" })
  console.log(cryptocurrency)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FinancialDataSDK.test()

const cryptocurrency = await client.CryptoCurrency().load({ key: 'example_key' })
// cryptocurrency is the entity, populated with mock response data
// — call cryptocurrency.data() for the record itself
console.log(cryptocurrency)
```

You can also use the instance method:

```ts
const client = new FinancialDataSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.CryptoCurrency()

// First call runs the operation and stores its result
await entity.load({ key: 'example_key' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FinancialDataSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### FinancialDataSDK

#### Constructor

```ts
new FinancialDataSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `BasicInformation(data?)` | `BasicInformationEntity` | Create a BasicInformation entity instance. |
| `CryptoCurrency(data?)` | `CryptoCurrencyEntity` | Create a CryptoCurrency entity instance. |
| `DerivativesData(data?)` | `DerivativesDataEntity` | Create a DerivativesData entity instance. |
| `EsgData(data?)` | `EsgDataEntity` | Create an EsgData entity instance. |
| `EtfData(data?)` | `EtfDataEntity` | Create an EtfData entity instance. |
| `EventCalendar(data?)` | `EventCalendarEntity` | Create an EventCalendar entity instance. |
| `FinancialRatio(data?)` | `FinancialRatioEntity` | Create a FinancialRatio entity instance. |
| `FinancialStatement(data?)` | `FinancialStatementEntity` | Create a FinancialStatement entity instance. |
| `ForexData(data?)` | `ForexDataEntity` | Create a ForexData entity instance. |
| `InsiderTrading(data?)` | `InsiderTradingEntity` | Create an InsiderTrading entity instance. |
| `InstitutionalTrading(data?)` | `InstitutionalTradingEntity` | Create an InstitutionalTrading entity instance. |
| `InvestmentAdviser(data?)` | `InvestmentAdviserEntity` | Create an InvestmentAdviser entity instance. |
| `MarketData(data?)` | `MarketDataEntity` | Create a MarketData entity instance. |
| `MarketIndex(data?)` | `MarketIndexEntity` | Create a MarketIndex entity instance. |
| `MarketNew(data?)` | `MarketNewEntity` | Create a MarketNew entity instance. |
| `MiscellaneousData(data?)` | `MiscellaneousDataEntity` | Create a MiscellaneousData entity instance. |
| `MutualFund(data?)` | `MutualFundEntity` | Create a MutualFund entity instance. |
| `SymbolList(data?)` | `SymbolListEntity` | Create a SymbolList entity instance. |
| `tester(testopts?, sdkopts?)` | `FinancialDataSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FinancialDataSDK.test(testopts?, sdkopts?)` | `FinancialDataSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FinancialDataSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### BasicInformation

| Field | Description |
| --- | --- |

Operations: load.

API path: `/company-information`

#### CryptoCurrency

| Field | Description |
| --- | --- |

Operations: load.

API path: `/crypto-minute-prices`

#### DerivativesData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/futures-prices`

#### EsgData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/esg-ratings`

#### EtfData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/etf-holdings`

#### EventCalendar

| Field | Description |
| --- | --- |

Operations: load.

API path: `/dividends-calendar`

#### FinancialRatio

| Field | Description |
| --- | --- |

Operations: load.

API path: `/efficiency-ratios`

#### FinancialStatement

| Field | Description |
| --- | --- |

Operations: load.

API path: `/balance-sheet-statements`

#### ForexData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/forex-minute-prices`

#### InsiderTrading

| Field | Description |
| --- | --- |

Operations: load.

API path: `/insider-transactions`

#### InstitutionalTrading

| Field | Description |
| --- | --- |

Operations: load.

API path: `/institutional-holdings`

#### InvestmentAdviser

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list, load.

API path: `/minute-prices`

#### MarketIndex

| Field | Description |
| --- | --- |

Operations: load.

API path: `/index-prices`

#### MarketNew

| Field | Description |
| --- | --- |

Operations: load.

API path: `/press-releases`

#### MiscellaneousData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/dividends`

#### MutualFund

| Field | Description |
| --- | --- |

Operations: load.

API path: `/mutual-fund-holdings`

#### SymbolList

| Field | Description |
| --- | --- |
| `description` |  |
| `registrant_name` |  |
| `title_of_security` |  |
| `trading_symbol` |  |

Operations: list.

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
const basic_information = await client.BasicInformation().load({ identifier: 'identifier', key: 'key' })
```


### CryptoCurrency

Create an instance: `const crypto_currency = client.CryptoCurrency()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const crypto_currency = await client.CryptoCurrency().load({ key: 'key' })
```


### DerivativesData

Create an instance: `const derivatives_data = client.DerivativesData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const derivatives_data = await client.DerivativesData().load({ key: 'key' })
```


### EsgData

Create an instance: `const esg_data = client.EsgData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const esg_data = await client.EsgData().load({ key: 'key' })
```


### EtfData

Create an instance: `const etf_data = client.EtfData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const etf_data = await client.EtfData().load({ identifier: 'identifier', key: 'key' })
```


### EventCalendar

Create an instance: `const event_calendar = client.EventCalendar()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const event_calendar = await client.EventCalendar().load({ key: 'key' })
```


### FinancialRatio

Create an instance: `const financial_ratio = client.FinancialRatio()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const financial_ratio = await client.FinancialRatio().load({ identifier: 'identifier', key: 'key' })
```


### FinancialStatement

Create an instance: `const financial_statement = client.FinancialStatement()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const financial_statement = await client.FinancialStatement().load({ identifier: 'identifier', key: 'key' })
```


### ForexData

Create an instance: `const forex_data = client.ForexData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const forex_data = await client.ForexData().load({ key: 'key' })
```


### InsiderTrading

Create an instance: `const insider_trading = client.InsiderTrading()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const insider_trading = await client.InsiderTrading().load({ key: 'key' })
```


### InstitutionalTrading

Create an instance: `const institutional_trading = client.InstitutionalTrading()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const institutional_trading = await client.InstitutionalTrading().load({ key: 'key' })
```


### InvestmentAdviser

Create an instance: `const investment_adviser = client.InvestmentAdviser()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const investment_adviser = await client.InvestmentAdviser().load({ key: 'key' })
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
| `change` | `number` |  |
| `close` | `number` |  |
| `date` | `string` |  |
| `high` | `number` |  |
| `low` | `number` |  |
| `open` | `number` |  |
| `percentage_change` | `number` |  |
| `price` | `number` |  |
| `registrant_name` | `string` |  |
| `time` | `string` |  |
| `trading_symbol` | `string` |  |
| `volume` | `number` |  |

#### Example: Load

```ts
const market_data = await client.MarketData().load({ identifier: 'identifier', key: 'key' })
```

#### Example: List

```ts
const market_datas = await client.MarketData().list({ identifier: "example", key: "example" })
```


### MarketIndex

Create an instance: `const market_index = client.MarketIndex()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const market_index = await client.MarketIndex().load({ key: 'key' })
```


### MarketNew

Create an instance: `const market_new = client.MarketNew()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const market_new = await client.MarketNew().load({ key: 'key' })
```


### MiscellaneousData

Create an instance: `const miscellaneous_data = client.MiscellaneousData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const miscellaneous_data = await client.MiscellaneousData().load({ key: 'key' })
```


### MutualFund

Create an instance: `const mutual_fund = client.MutualFund()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const mutual_fund = await client.MutualFund().load({ key: 'key' })
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
| `description` | `string` |  |
| `registrant_name` | `string` |  |
| `title_of_security` | `string` |  |
| `trading_symbol` | `string` |  |

#### Example: List

```ts
const symbol_lists = await client.SymbolList().list({ key: "example" })
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
financial-data/
├── src/
│   ├── FinancialDataSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FinancialDataSDK } from '@voxgig-sdk/financial-data'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const cryptocurrency = client.CryptoCurrency()
await cryptocurrency.load({ key: "example" })

// cryptocurrency.data() now returns the cryptocurrency data from the last `load`
// cryptocurrency.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
