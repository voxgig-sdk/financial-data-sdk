# FinancialData PHP SDK Reference

Complete API reference for the FinancialData PHP SDK.


## FinancialDataSDK

### Constructor

```php
require_once __DIR__ . '/financialdata_sdk.php';

$client = new FinancialDataSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FinancialDataSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = FinancialDataSDK::test();
```


### Instance Methods

#### `BasicInformation($data = null)`

Create a new `BasicInformationEntity` instance. Pass `null` for no initial data.

#### `CryptoCurrency($data = null)`

Create a new `CryptoCurrencyEntity` instance. Pass `null` for no initial data.

#### `DerivativesData($data = null)`

Create a new `DerivativesDataEntity` instance. Pass `null` for no initial data.

#### `EsgData($data = null)`

Create a new `EsgDataEntity` instance. Pass `null` for no initial data.

#### `EtfData($data = null)`

Create a new `EtfDataEntity` instance. Pass `null` for no initial data.

#### `EventCalendar($data = null)`

Create a new `EventCalendarEntity` instance. Pass `null` for no initial data.

#### `FinancialRatio($data = null)`

Create a new `FinancialRatioEntity` instance. Pass `null` for no initial data.

#### `FinancialStatement($data = null)`

Create a new `FinancialStatementEntity` instance. Pass `null` for no initial data.

#### `ForexData($data = null)`

Create a new `ForexDataEntity` instance. Pass `null` for no initial data.

#### `InsiderTrading($data = null)`

Create a new `InsiderTradingEntity` instance. Pass `null` for no initial data.

#### `InstitutionalTrading($data = null)`

Create a new `InstitutionalTradingEntity` instance. Pass `null` for no initial data.

#### `InvestmentAdviser($data = null)`

Create a new `InvestmentAdviserEntity` instance. Pass `null` for no initial data.

#### `MarketData($data = null)`

Create a new `MarketDataEntity` instance. Pass `null` for no initial data.

#### `MarketIndex($data = null)`

Create a new `MarketIndexEntity` instance. Pass `null` for no initial data.

#### `MarketNew($data = null)`

Create a new `MarketNewEntity` instance. Pass `null` for no initial data.

#### `MiscellaneousData($data = null)`

Create a new `MiscellaneousDataEntity` instance. Pass `null` for no initial data.

#### `MutualFund($data = null)`

Create a new `MutualFundEntity` instance. Pass `null` for no initial data.

#### `SymbolList($data = null)`

Create a new `SymbolListEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): FinancialDataUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BasicInformationEntity

```php
$basic_information = $client->BasicInformation();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BasicInformation()->load(["identifier" => "identifier", "key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BasicInformationEntity`

Create a new `BasicInformationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CryptoCurrencyEntity

```php
$crypto_currency = $client->CryptoCurrency();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CryptoCurrency()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CryptoCurrencyEntity`

Create a new `CryptoCurrencyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DerivativesDataEntity

```php
$derivatives_data = $client->DerivativesData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->DerivativesData()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DerivativesDataEntity`

Create a new `DerivativesDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EsgDataEntity

```php
$esg_data = $client->EsgData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EsgData()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EsgDataEntity`

Create a new `EsgDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EtfDataEntity

```php
$etf_data = $client->EtfData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EtfData()->load(["identifier" => "identifier", "key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EtfDataEntity`

Create a new `EtfDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventCalendarEntity

```php
$event_calendar = $client->EventCalendar();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EventCalendar()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventCalendarEntity`

Create a new `EventCalendarEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FinancialRatioEntity

```php
$financial_ratio = $client->FinancialRatio();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FinancialRatio()->load(["identifier" => "identifier", "key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FinancialRatioEntity`

Create a new `FinancialRatioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FinancialStatementEntity

```php
$financial_statement = $client->FinancialStatement();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FinancialStatement()->load(["identifier" => "identifier", "key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FinancialStatementEntity`

Create a new `FinancialStatementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ForexDataEntity

```php
$forex_data = $client->ForexData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ForexData()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ForexDataEntity`

Create a new `ForexDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InsiderTradingEntity

```php
$insider_trading = $client->InsiderTrading();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->InsiderTrading()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InsiderTradingEntity`

Create a new `InsiderTradingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InstitutionalTradingEntity

```php
$institutional_trading = $client->InstitutionalTrading();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->InstitutionalTrading()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InstitutionalTradingEntity`

Create a new `InstitutionalTradingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InvestmentAdviserEntity

```php
$investment_adviser = $client->InvestmentAdviser();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->InvestmentAdviser()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InvestmentAdviserEntity`

Create a new `InvestmentAdviserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MarketDataEntity

```php
$market_data = $client->MarketData();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `change` | `float` | No |  |
| `close` | `float` | No |  |
| `date` | `string` | No |  |
| `high` | `float` | No |  |
| `low` | `float` | No |  |
| `open` | `float` | No |  |
| `percentage_change` | `float` | No |  |
| `price` | `float` | No |  |
| `registrant_name` | `string` | No |  |
| `time` | `string` | No |  |
| `trading_symbol` | `string` | No |  |
| `volume` | `float` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->MarketData()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MarketData()->load(["identifier" => "identifier", "key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MarketDataEntity`

Create a new `MarketDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MarketIndexEntity

```php
$market_index = $client->MarketIndex();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MarketIndex()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MarketIndexEntity`

Create a new `MarketIndexEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MarketNewEntity

```php
$market_new = $client->MarketNew();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MarketNew()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MarketNewEntity`

Create a new `MarketNewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MiscellaneousDataEntity

```php
$miscellaneous_data = $client->MiscellaneousData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MiscellaneousData()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MiscellaneousDataEntity`

Create a new `MiscellaneousDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MutualFundEntity

```php
$mutual_fund = $client->MutualFund();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MutualFund()->load(["key" => "key"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MutualFundEntity`

Create a new `MutualFundEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SymbolListEntity

```php
$symbol_list = $client->SymbolList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `registrant_name` | `string` | No |  |
| `title_of_security` | `string` | No |  |
| `trading_symbol` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->SymbolList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SymbolListEntity`

Create a new `SymbolListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new FinancialDataSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
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

