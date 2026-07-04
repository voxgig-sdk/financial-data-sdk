# FinancialData Python SDK Reference

Complete API reference for the FinancialData Python SDK.


## FinancialDataSDK

### Constructor

```python
from financial-data_sdk import FinancialDataSDK

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
result = client.BasicInformation().load({"id": "basic_information_id"})
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
result = client.CryptoCurrency().load({"id": "crypto_currency_id"})
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
result = client.DerivativesData().load({"id": "derivatives_data_id"})
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
result = client.EsgData().load({"id": "esg_data_id"})
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
result = client.EtfData().load({"id": "etf_data_id"})
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
result = client.EventCalendar().load({"id": "event_calendar_id"})
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
result = client.FinancialRatio().load({"id": "financial_ratio_id"})
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
result = client.FinancialStatement().load({"id": "financial_statement_id"})
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
result = client.ForexData().load({"id": "forex_data_id"})
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
result = client.InsiderTrading().load({"id": "insider_trading_id"})
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
result = client.InstitutionalTrading().load({"id": "institutional_trading_id"})
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
result = client.InvestmentAdviser().load({"id": "investment_adviser_id"})
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.MarketData().list({})
for market_data in results:
    print(market_data)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MarketData().load({"id": "market_data_id"})
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
result = client.MarketIndex().load({"id": "market_index_id"})
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
result = client.MarketNew().load({"id": "market_new_id"})
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
result = client.MiscellaneousData().load({"id": "miscellaneous_data_id"})
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
result = client.MutualFund().load({"id": "mutual_fund_id"})
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
| `description` | ``$STRING`` | No |  |
| `registrant_name` | ``$STRING`` | No |  |
| `title_of_security` | ``$STRING`` | No |  |
| `trading_symbol` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.SymbolList().list({})
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

