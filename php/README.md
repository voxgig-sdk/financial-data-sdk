# FinancialData PHP SDK



The PHP SDK for the FinancialData API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->BasicInformation()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/financial-data-sdk/releases](https://github.com/voxgig-sdk/financial-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'financialdata_sdk.php';

$client = new FinancialDataSDK([
    "apikey" => getenv("FINANCIAL_DATA_APIKEY"),
]);
```

### 3. Load a basicinformation

```php
try {
    // load() returns the bare BasicInformation record (throws on error).
    $basicinformation = $client->BasicInformation()->load();
    print_r($basicinformation);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $basicinformation = $client->BasicInformation()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = FinancialDataSDK::test();

// Entity ops return the bare mock record (throws on error).
$basicinformation = $client->BasicInformation()->load();
print_r($basicinformation);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new FinancialDataSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
FINANCIAL_DATA_TEST_LIVE=TRUE
FINANCIAL_DATA_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### FinancialDataSDK

```php
require_once 'financialdata_sdk.php';
$client = new FinancialDataSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = FinancialDataSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### FinancialDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `BasicInformation` | `($data): BasicInformationEntity` | Create a BasicInformation entity instance. |
| `CryptoCurrency` | `($data): CryptoCurrencyEntity` | Create a CryptoCurrency entity instance. |
| `DerivativesData` | `($data): DerivativesDataEntity` | Create a DerivativesData entity instance. |
| `EsgData` | `($data): EsgDataEntity` | Create an EsgData entity instance. |
| `EtfData` | `($data): EtfDataEntity` | Create an EtfData entity instance. |
| `EventCalendar` | `($data): EventCalendarEntity` | Create an EventCalendar entity instance. |
| `FinancialRatio` | `($data): FinancialRatioEntity` | Create a FinancialRatio entity instance. |
| `FinancialStatement` | `($data): FinancialStatementEntity` | Create a FinancialStatement entity instance. |
| `ForexData` | `($data): ForexDataEntity` | Create a ForexData entity instance. |
| `InsiderTrading` | `($data): InsiderTradingEntity` | Create an InsiderTrading entity instance. |
| `InstitutionalTrading` | `($data): InstitutionalTradingEntity` | Create an InstitutionalTrading entity instance. |
| `InvestmentAdviser` | `($data): InvestmentAdviserEntity` | Create an InvestmentAdviser entity instance. |
| `MarketData` | `($data): MarketDataEntity` | Create a MarketData entity instance. |
| `MarketIndex` | `($data): MarketIndexEntity` | Create a MarketIndex entity instance. |
| `MarketNew` | `($data): MarketNewEntity` | Create a MarketNew entity instance. |
| `MiscellaneousData` | `($data): MiscellaneousDataEntity` | Create a MiscellaneousData entity instance. |
| `MutualFund` | `($data): MutualFundEntity` | Create a MutualFund entity instance. |
| `SymbolList` | `($data): SymbolListEntity` | Create a SymbolList entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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
| `description` |  |
| `registrant_name` |  |
| `title_of_security` |  |
| `trading_symbol` |  |

Operations: List.

API path: `/etf-symbols`



## Entities


### BasicInformation

Create an instance: `$basic_information = $client->BasicInformation();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare BasicInformation record (throws on error).
$basic_information = $client->BasicInformation()->load();
```


### CryptoCurrency

Create an instance: `$crypto_currency = $client->CryptoCurrency();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare CryptoCurrency record (throws on error).
$crypto_currency = $client->CryptoCurrency()->load();
```


### DerivativesData

Create an instance: `$derivatives_data = $client->DerivativesData();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare DerivativesData record (throws on error).
$derivatives_data = $client->DerivativesData()->load();
```


### EsgData

Create an instance: `$esg_data = $client->EsgData();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare EsgData record (throws on error).
$esg_data = $client->EsgData()->load();
```


### EtfData

Create an instance: `$etf_data = $client->EtfData();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare EtfData record (throws on error).
$etf_data = $client->EtfData()->load();
```


### EventCalendar

Create an instance: `$event_calendar = $client->EventCalendar();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare EventCalendar record (throws on error).
$event_calendar = $client->EventCalendar()->load();
```


### FinancialRatio

Create an instance: `$financial_ratio = $client->FinancialRatio();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare FinancialRatio record (throws on error).
$financial_ratio = $client->FinancialRatio()->load();
```


### FinancialStatement

Create an instance: `$financial_statement = $client->FinancialStatement();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare FinancialStatement record (throws on error).
$financial_statement = $client->FinancialStatement()->load();
```


### ForexData

Create an instance: `$forex_data = $client->ForexData();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare ForexData record (throws on error).
$forex_data = $client->ForexData()->load();
```


### InsiderTrading

Create an instance: `$insider_trading = $client->InsiderTrading();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare InsiderTrading record (throws on error).
$insider_trading = $client->InsiderTrading()->load();
```


### InstitutionalTrading

Create an instance: `$institutional_trading = $client->InstitutionalTrading();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare InstitutionalTrading record (throws on error).
$institutional_trading = $client->InstitutionalTrading()->load();
```


### InvestmentAdviser

Create an instance: `$investment_adviser = $client->InvestmentAdviser();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare InvestmentAdviser record (throws on error).
$investment_adviser = $client->InvestmentAdviser()->load();
```


### MarketData

Create an instance: `$market_data = $client->MarketData();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `change` | `float` |  |
| `close` | `float` |  |
| `date` | `string` |  |
| `high` | `float` |  |
| `low` | `float` |  |
| `open` | `float` |  |
| `percentage_change` | `float` |  |
| `price` | `float` |  |
| `registrant_name` | `string` |  |
| `time` | `string` |  |
| `trading_symbol` | `string` |  |
| `volume` | `float` |  |

#### Example: Load

```php
// load() returns the bare MarketData record (throws on error).
$market_data = $client->MarketData()->load();
```

#### Example: List

```php
// list() returns an array of MarketData records (throws on error).
$market_datas = $client->MarketData()->list();
```


### MarketIndex

Create an instance: `$market_index = $client->MarketIndex();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare MarketIndex record (throws on error).
$market_index = $client->MarketIndex()->load();
```


### MarketNew

Create an instance: `$market_new = $client->MarketNew();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare MarketNew record (throws on error).
$market_new = $client->MarketNew()->load();
```


### MiscellaneousData

Create an instance: `$miscellaneous_data = $client->MiscellaneousData();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare MiscellaneousData record (throws on error).
$miscellaneous_data = $client->MiscellaneousData()->load();
```


### MutualFund

Create an instance: `$mutual_fund = $client->MutualFund();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare MutualFund record (throws on error).
$mutual_fund = $client->MutualFund()->load();
```


### SymbolList

Create an instance: `$symbol_list = $client->SymbolList();`

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

```php
// list() returns an array of SymbolList records (throws on error).
$symbol_lists = $client->SymbolList()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── financialdata_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`financialdata_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$basicinformation = $client->BasicInformation();
$basicinformation->load();

// $basicinformation->data_get() now returns the basicinformation data from the last load
// $basicinformation->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
