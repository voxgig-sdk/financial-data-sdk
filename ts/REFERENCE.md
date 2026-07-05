# FinancialData TypeScript SDK Reference

Complete API reference for the FinancialData TypeScript SDK.


## FinancialDataSDK

### Constructor

```ts
new FinancialDataSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FinancialDataSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FinancialDataSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FinancialDataSDK` instance in test mode.


### Instance Methods

#### `BasicInformation(data?: object)`

Create a new `BasicInformation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BasicInformationEntity` instance.

#### `CryptoCurrency(data?: object)`

Create a new `CryptoCurrency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CryptoCurrencyEntity` instance.

#### `DerivativesData(data?: object)`

Create a new `DerivativesData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DerivativesDataEntity` instance.

#### `EsgData(data?: object)`

Create a new `EsgData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EsgDataEntity` instance.

#### `EtfData(data?: object)`

Create a new `EtfData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EtfDataEntity` instance.

#### `EventCalendar(data?: object)`

Create a new `EventCalendar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventCalendarEntity` instance.

#### `FinancialRatio(data?: object)`

Create a new `FinancialRatio` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FinancialRatioEntity` instance.

#### `FinancialStatement(data?: object)`

Create a new `FinancialStatement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FinancialStatementEntity` instance.

#### `ForexData(data?: object)`

Create a new `ForexData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ForexDataEntity` instance.

#### `InsiderTrading(data?: object)`

Create a new `InsiderTrading` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InsiderTradingEntity` instance.

#### `InstitutionalTrading(data?: object)`

Create a new `InstitutionalTrading` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InstitutionalTradingEntity` instance.

#### `InvestmentAdviser(data?: object)`

Create a new `InvestmentAdviser` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InvestmentAdviserEntity` instance.

#### `MarketData(data?: object)`

Create a new `MarketData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarketDataEntity` instance.

#### `MarketIndex(data?: object)`

Create a new `MarketIndex` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarketIndexEntity` instance.

#### `MarketNew(data?: object)`

Create a new `MarketNew` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarketNewEntity` instance.

#### `MiscellaneousData(data?: object)`

Create a new `MiscellaneousData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MiscellaneousDataEntity` instance.

#### `MutualFund(data?: object)`

Create a new `MutualFund` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MutualFundEntity` instance.

#### `SymbolList(data?: object)`

Create a new `SymbolList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SymbolListEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FinancialDataSDK.test()`.

**Returns:** `FinancialDataSDK` instance in test mode.


---

## BasicInformationEntity

```ts
const basic_information = client.BasicInformation()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BasicInformation().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BasicInformationEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CryptoCurrencyEntity

```ts
const crypto_currency = client.CryptoCurrency()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CryptoCurrency().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CryptoCurrencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DerivativesDataEntity

```ts
const derivatives_data = client.DerivativesData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DerivativesData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DerivativesDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EsgDataEntity

```ts
const esg_data = client.EsgData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EsgData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EsgDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EtfDataEntity

```ts
const etf_data = client.EtfData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EtfData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EtfDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventCalendarEntity

```ts
const event_calendar = client.EventCalendar()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EventCalendar().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventCalendarEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FinancialRatioEntity

```ts
const financial_ratio = client.FinancialRatio()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FinancialRatio().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FinancialRatioEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FinancialStatementEntity

```ts
const financial_statement = client.FinancialStatement()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FinancialStatement().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FinancialStatementEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ForexDataEntity

```ts
const forex_data = client.ForexData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ForexData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ForexDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InsiderTradingEntity

```ts
const insider_trading = client.InsiderTrading()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InsiderTrading().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InsiderTradingEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InstitutionalTradingEntity

```ts
const institutional_trading = client.InstitutionalTrading()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InstitutionalTrading().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InstitutionalTradingEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InvestmentAdviserEntity

```ts
const investment_adviser = client.InvestmentAdviser()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InvestmentAdviser().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InvestmentAdviserEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarketDataEntity

```ts
const market_data = client.MarketData()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `change` | `number` | No |  |
| `close` | `number` | No |  |
| `date` | `string` | No |  |
| `high` | `number` | No |  |
| `low` | `number` | No |  |
| `open` | `number` | No |  |
| `percentage_change` | `number` | No |  |
| `price` | `number` | No |  |
| `registrant_name` | `string` | No |  |
| `time` | `string` | No |  |
| `trading_symbol` | `string` | No |  |
| `volume` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MarketData().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MarketData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarketDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarketIndexEntity

```ts
const market_index = client.MarketIndex()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MarketIndex().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarketIndexEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarketNewEntity

```ts
const market_new = client.MarketNew()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MarketNew().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarketNewEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MiscellaneousDataEntity

```ts
const miscellaneous_data = client.MiscellaneousData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MiscellaneousData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MiscellaneousDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MutualFundEntity

```ts
const mutual_fund = client.MutualFund()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MutualFund().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MutualFundEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SymbolListEntity

```ts
const symbol_list = client.SymbolList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `registrant_name` | `string` | No |  |
| `title_of_security` | `string` | No |  |
| `trading_symbol` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SymbolList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SymbolListEntity` instance with the same client and
options.

#### `client()`

Return the parent `FinancialDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new FinancialDataSDK({
  feature: {
    test: { active: true },
  }
})
```

