# FinancialData TypeScript SDK



The TypeScript SDK for the FinancialData API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
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

```ts
const result = await client.basicinformation.load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
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

const result = await client.basicinformation.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new FinancialDataSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.basicinformation

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
| `EsgData(data?)` | `EsgDataEntity` | Create a EsgData entity instance. |
| `EtfData(data?)` | `EtfDataEntity` | Create a EtfData entity instance. |
| `EventCalendar(data?)` | `EventCalendarEntity` | Create a EventCalendar entity instance. |
| `FinancialRatio(data?)` | `FinancialRatioEntity` | Create a FinancialRatio entity instance. |
| `FinancialStatement(data?)` | `FinancialStatementEntity` | Create a FinancialStatement entity instance. |
| `ForexData(data?)` | `ForexDataEntity` | Create a ForexData entity instance. |
| `InsiderTrading(data?)` | `InsiderTradingEntity` | Create a InsiderTrading entity instance. |
| `InstitutionalTrading(data?)` | `InstitutionalTradingEntity` | Create a InstitutionalTrading entity instance. |
| `InvestmentAdviser(data?)` | `InvestmentAdviserEntity` | Create a InvestmentAdviser entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FinancialDataSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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

Create an instance: `const basic_information = client.basic_information`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const basic_information = await client.basic_information.load({ id: 'basic_information_id' })
```


### CryptoCurrency

Create an instance: `const crypto_currency = client.crypto_currency`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const crypto_currency = await client.crypto_currency.load({ id: 'crypto_currency_id' })
```


### DerivativesData

Create an instance: `const derivatives_data = client.derivatives_data`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const derivatives_data = await client.derivatives_data.load({ id: 'derivatives_data_id' })
```


### EsgData

Create an instance: `const esg_data = client.esg_data`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const esg_data = await client.esg_data.load({ id: 'esg_data_id' })
```


### EtfData

Create an instance: `const etf_data = client.etf_data`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const etf_data = await client.etf_data.load({ id: 'etf_data_id' })
```


### EventCalendar

Create an instance: `const event_calendar = client.event_calendar`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const event_calendar = await client.event_calendar.load({ id: 'event_calendar_id' })
```


### FinancialRatio

Create an instance: `const financial_ratio = client.financial_ratio`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const financial_ratio = await client.financial_ratio.load({ id: 'financial_ratio_id' })
```


### FinancialStatement

Create an instance: `const financial_statement = client.financial_statement`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const financial_statement = await client.financial_statement.load({ id: 'financial_statement_id' })
```


### ForexData

Create an instance: `const forex_data = client.forex_data`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const forex_data = await client.forex_data.load({ id: 'forex_data_id' })
```


### InsiderTrading

Create an instance: `const insider_trading = client.insider_trading`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const insider_trading = await client.insider_trading.load({ id: 'insider_trading_id' })
```


### InstitutionalTrading

Create an instance: `const institutional_trading = client.institutional_trading`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const institutional_trading = await client.institutional_trading.load({ id: 'institutional_trading_id' })
```


### InvestmentAdviser

Create an instance: `const investment_adviser = client.investment_adviser`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const investment_adviser = await client.investment_adviser.load({ id: 'investment_adviser_id' })
```


### MarketData

Create an instance: `const market_data = client.market_data`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```ts
const market_data = await client.market_data.load({ id: 'market_data_id' })
```

#### Example: List

```ts
const market_datas = await client.market_data.list()
```


### MarketIndex

Create an instance: `const market_index = client.market_index`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const market_index = await client.market_index.load({ id: 'market_index_id' })
```


### MarketNew

Create an instance: `const market_new = client.market_new`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const market_new = await client.market_new.load({ id: 'market_new_id' })
```


### MiscellaneousData

Create an instance: `const miscellaneous_data = client.miscellaneous_data`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const miscellaneous_data = await client.miscellaneous_data.load({ id: 'miscellaneous_data_id' })
```


### MutualFund

Create an instance: `const mutual_fund = client.mutual_fund`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const mutual_fund = await client.mutual_fund.load({ id: 'mutual_fund_id' })
```


### SymbolList

Create an instance: `const symbol_list = client.symbol_list`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `registrant_name` | ``$STRING`` |  |
| `title_of_security` | ``$STRING`` |  |
| `trading_symbol` | ``$STRING`` |  |

#### Example: List

```ts
const symbol_lists = await client.symbol_list.list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
const basicinformation = client.basicinformation
await basicinformation.load({ id: "example_id" })

// basicinformation.data() now returns the loaded basicinformation data
// basicinformation.match() returns { id: "example_id" }
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
