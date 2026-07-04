# FinancialData PHP SDK Reference

Complete API reference for the FinancialData PHP SDK.


## FinancialDataSDK

### Constructor

```php
require_once __DIR__ . '/financial-data_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$basic_information = $client->basic_information();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->basic_information()->load(["id" => "basic_information_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BasicInformationEntity`

Create a new `BasicInformationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CryptoCurrencyEntity

```php
$crypto_currency = $client->crypto_currency();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->crypto_currency()->load(["id" => "crypto_currency_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CryptoCurrencyEntity`

Create a new `CryptoCurrencyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DerivativesDataEntity

```php
$derivatives_data = $client->derivatives_data();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->derivatives_data()->load(["id" => "derivatives_data_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DerivativesDataEntity`

Create a new `DerivativesDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EsgDataEntity

```php
$esg_data = $client->esg_data();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->esg_data()->load(["id" => "esg_data_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EsgDataEntity`

Create a new `EsgDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EtfDataEntity

```php
$etf_data = $client->etf_data();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->etf_data()->load(["id" => "etf_data_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EtfDataEntity`

Create a new `EtfDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EventCalendarEntity

```php
$event_calendar = $client->event_calendar();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->event_calendar()->load(["id" => "event_calendar_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EventCalendarEntity`

Create a new `EventCalendarEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FinancialRatioEntity

```php
$financial_ratio = $client->financial_ratio();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->financial_ratio()->load(["id" => "financial_ratio_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FinancialRatioEntity`

Create a new `FinancialRatioEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FinancialStatementEntity

```php
$financial_statement = $client->financial_statement();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->financial_statement()->load(["id" => "financial_statement_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FinancialStatementEntity`

Create a new `FinancialStatementEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ForexDataEntity

```php
$forex_data = $client->forex_data();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->forex_data()->load(["id" => "forex_data_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ForexDataEntity`

Create a new `ForexDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InsiderTradingEntity

```php
$insider_trading = $client->insider_trading();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->insider_trading()->load(["id" => "insider_trading_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InsiderTradingEntity`

Create a new `InsiderTradingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InstitutionalTradingEntity

```php
$institutional_trading = $client->institutional_trading();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->institutional_trading()->load(["id" => "institutional_trading_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InstitutionalTradingEntity`

Create a new `InstitutionalTradingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InvestmentAdviserEntity

```php
$investment_adviser = $client->investment_adviser();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->investment_adviser()->load(["id" => "investment_adviser_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InvestmentAdviserEntity`

Create a new `InvestmentAdviserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MarketDataEntity

```php
$market_data = $client->market_data();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `change` | ``$NUMBER`` | No |  |
| `close` | ``$NUMBER`` | No |  |
| `date` | ``$STRING`` | No |  |
| `high` | ``$NUMBER`` | No |  |
| `low` | ``$NUMBER`` | No |  |
| `open` | ``$NUMBER`` | No |  |
| `percentage_change` | ``$NUMBER`` | No |  |
| `price` | ``$NUMBER`` | No |  |
| `registrant_name` | ``$STRING`` | No |  |
| `time` | ``$STRING`` | No |  |
| `trading_symbol` | ``$STRING`` | No |  |
| `volume` | ``$NUMBER`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->market_data()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->market_data()->load(["id" => "market_data_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MarketDataEntity`

Create a new `MarketDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MarketIndexEntity

```php
$market_index = $client->market_index();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->market_index()->load(["id" => "market_index_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MarketIndexEntity`

Create a new `MarketIndexEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MarketNewEntity

```php
$market_new = $client->market_new();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->market_new()->load(["id" => "market_new_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MarketNewEntity`

Create a new `MarketNewEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MiscellaneousDataEntity

```php
$miscellaneous_data = $client->miscellaneous_data();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->miscellaneous_data()->load(["id" => "miscellaneous_data_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MiscellaneousDataEntity`

Create a new `MiscellaneousDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MutualFundEntity

```php
$mutual_fund = $client->mutual_fund();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->mutual_fund()->load(["id" => "mutual_fund_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MutualFundEntity`

Create a new `MutualFundEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SymbolListEntity

```php
$symbol_list = $client->symbol_list();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `registrant_name` | ``$STRING`` | No |  |
| `title_of_security` | ``$STRING`` | No |  |
| `trading_symbol` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->symbol_list()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SymbolListEntity`

Create a new `SymbolListEntity` instance with the same client and
options.

#### `getName(): string`

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

