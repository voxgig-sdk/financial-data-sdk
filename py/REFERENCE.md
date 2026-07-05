# FinancialData Python SDK Reference

Complete API reference for the FinancialData Python SDK.


## FinancialDataSDK

### Constructor

```python
from financialdata_sdk import FinancialDataSDK

client = FinancialDataSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FinancialDataSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = FinancialDataSDK.test()
```


### Instance Methods

#### `BasicInformation(data=None)`

Create a new `BasicInformationEntity` instance. Pass `None` for no initial data.

#### `CryptoCurrency(data=None)`

Create a new `CryptoCurrencyEntity` instance. Pass `None` for no initial data.

#### `DerivativesData(data=None)`

Create a new `DerivativesDataEntity` instance. Pass `None` for no initial data.

#### `EsgData(data=None)`

Create a new `EsgDataEntity` instance. Pass `None` for no initial data.

#### `EtfData(data=None)`

Create a new `EtfDataEntity` instance. Pass `None` for no initial data.

#### `EventCalendar(data=None)`

Create a new `EventCalendarEntity` instance. Pass `None` for no initial data.

#### `FinancialRatio(data=None)`

Create a new `FinancialRatioEntity` instance. Pass `None` for no initial data.

#### `FinancialStatement(data=None)`

Create a new `FinancialStatementEntity` instance. Pass `None` for no initial data.

#### `ForexData(data=None)`

Create a new `ForexDataEntity` instance. Pass `None` for no initial data.

#### `InsiderTrading(data=None)`

Create a new `InsiderTradingEntity` instance. Pass `None` for no initial data.

#### `InstitutionalTrading(data=None)`

Create a new `InstitutionalTradingEntity` instance. Pass `None` for no initial data.

#### `InvestmentAdviser(data=None)`

Create a new `InvestmentAdviserEntity` instance. Pass `None` for no initial data.

#### `MarketData(data=None)`

Create a new `MarketDataEntity` instance. Pass `None` for no initial data.

#### `MarketIndex(data=None)`

Create a new `MarketIndexEntity` instance. Pass `None` for no initial data.

#### `MarketNew(data=None)`

Create a new `MarketNewEntity` instance. Pass `None` for no initial data.

#### `MiscellaneousData(data=None)`

Create a new `MiscellaneousDataEntity` instance. Pass `None` for no initial data.

#### `MutualFund(data=None)`

Create a new `MutualFundEntity` instance. Pass `None` for no initial data.

#### `SymbolList(data=None)`

Create a new `SymbolListEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BasicInformationEntity

```python
basic_information = client.BasicInformation()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.BasicInformation().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BasicInformationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CryptoCurrencyEntity

```python
crypto_currency = client.CryptoCurrency()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CryptoCurrency().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CryptoCurrencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DerivativesDataEntity

```python
derivatives_data = client.DerivativesData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DerivativesData().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DerivativesDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EsgDataEntity

```python
esg_data = client.EsgData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EsgData().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EsgDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EtfDataEntity

```python
etf_data = client.EtfData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EtfData().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EtfDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventCalendarEntity

```python
event_calendar = client.EventCalendar()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EventCalendar().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventCalendarEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FinancialRatioEntity

```python
financial_ratio = client.FinancialRatio()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FinancialRatio().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FinancialRatioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FinancialStatementEntity

```python
financial_statement = client.FinancialStatement()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FinancialStatement().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FinancialStatementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ForexDataEntity

```python
forex_data = client.ForexData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ForexData().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ForexDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InsiderTradingEntity

```python
insider_trading = client.InsiderTrading()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InsiderTrading().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InsiderTradingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InstitutionalTradingEntity

```python
institutional_trading = client.InstitutionalTrading()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InstitutionalTrading().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InstitutionalTradingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InvestmentAdviserEntity

```python
investment_adviser = client.InvestmentAdviser()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InvestmentAdviser().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvestmentAdviserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarketDataEntity

```python
market_data = client.MarketData()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `change` | `float` | No |  |
| `close` | `float` | No |  |
| `date` | `str` | No |  |
| `high` | `float` | No |  |
| `low` | `float` | No |  |
| `open` | `float` | No |  |
| `percentage_change` | `float` | No |  |
| `price` | `float` | No |  |
| `registrant_name` | `str` | No |  |
| `time` | `str` | No |  |
| `trading_symbol` | `str` | No |  |
| `volume` | `float` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MarketData().list()
for market_data in results:
    print(market_data)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MarketData().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarketIndexEntity

```python
market_index = client.MarketIndex()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MarketIndex().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketIndexEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarketNewEntity

```python
market_new = client.MarketNew()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MarketNew().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketNewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MiscellaneousDataEntity

```python
miscellaneous_data = client.MiscellaneousData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MiscellaneousData().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MiscellaneousDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MutualFundEntity

```python
mutual_fund = client.MutualFund()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MutualFund().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MutualFundEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SymbolListEntity

```python
symbol_list = client.SymbolList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `registrant_name` | `str` | No |  |
| `title_of_security` | `str` | No |  |
| `trading_symbol` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SymbolList().list()
for symbol_list in results:
    print(symbol_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SymbolListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = FinancialDataSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

