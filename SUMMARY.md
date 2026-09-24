# Financial Data API

This API provides access to a wide range of financial data including market data, company fundamentals, and alternative data. Users can make requests to retrieve stock symbols, prices, company information, ESG scores and ratings, mutual fund holdings, and more. The data covers thousands of securities including stocks, ETFs, funds, and commodities.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 18 entities and 80 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### BasicInformation

Results: Successful response.

SDK operations: `load`.

### CryptoCurrency

Results: Successful response.

SDK operations: `load`.

### DerivativesData

Results: Successful response.

SDK operations: `load`.

### EsgData

Results: Successful response.

SDK operations: `load`.

### EtfData

Results: Successful response.

SDK operations: `load`.

### EventCalendar

Results: Successful response.

SDK operations: `load`.

### FinancialRatio

Results: Successful response.

SDK operations: `load`.

### FinancialStatement

Results: Successful response.

SDK operations: `load`.

### ForexData

Results: Successful response.

SDK operations: `load`.

### InsiderTrading

Results: Successful response.

SDK operations: `load`.

### InstitutionalTrading

Results: Successful response.

SDK operations: `load`.

### InvestmentAdviser

Results: Successful response.

SDK operations: `load`.

### MarketData

Results: Successful response.

SDK operations: `list`, `load`.

### MarketIndex

Results: Successful response.

SDK operations: `load`.

### MarketNew

Results: Successful response.

SDK operations: `load`.

### MiscellaneousData

Results: Successful response.

SDK operations: `load`.

### MutualFund

Results: Successful response.

SDK operations: `load`.

### SymbolList

Results: Successful response.

SDK operations: `list`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| BasicInformation | `load` | `GET /company-information` | Required |
| BasicInformation | `load` | `GET /employee-count` | Required |
| BasicInformation | `load` | `GET /executive-compensation` | Required |
| BasicInformation | `load` | `GET /international-company-information` | Required |
| BasicInformation | `load` | `GET /key-metrics` | Required |
| BasicInformation | `load` | `GET /market-cap` | Required |
| BasicInformation | `load` | `GET /securities-information` | Required |
| CryptoCurrency | `load` | `GET /crypto-minute-prices` | Required |
| CryptoCurrency | `load` | `GET /crypto-information` | Required |
| CryptoCurrency | `load` | `GET /crypto-prices` | Required |
| CryptoCurrency | `load` | `GET /crypto-quotes` | Required |
| CryptoCurrency | `load` | `GET /crypto-symbols` | Required |
| DerivativesData | `load` | `GET /futures-prices` | Required |
| DerivativesData | `load` | `GET /option-chain` | Required |
| DerivativesData | `load` | `GET /option-greeks` | Required |
| DerivativesData | `load` | `GET /option-prices` | Required |
| DerivativesData | `load` | `GET /futures-symbols` | Required |
| EsgData | `load` | `GET /esg-ratings` | Required |
| EsgData | `load` | `GET /esg-scores` | Required |
| EsgData | `load` | `GET /industry-esg-scores` | Required |
| EtfData | `load` | `GET /etf-holdings` | Required |
| EtfData | `load` | `GET /etf-prices` | Required |
| EtfData | `load` | `GET /etf-quotes` | Required |
| EventCalendar | `load` | `GET /dividends-calendar` | Required |
| EventCalendar | `load` | `GET /earnings-calendar` | Required |
| EventCalendar | `load` | `GET /economic-calendar` | Required |
| EventCalendar | `load` | `GET /ipo-calendar` | Required |
| EventCalendar | `load` | `GET /splits-calendar` | Required |
| FinancialRatio | `load` | `GET /efficiency-ratios` | Required |
| FinancialRatio | `load` | `GET /liquidity-ratios` | Required |
| FinancialRatio | `load` | `GET /profitability-ratios` | Required |
| FinancialRatio | `load` | `GET /solvency-ratios` | Required |
| FinancialRatio | `load` | `GET /valuation-ratios` | Required |
| FinancialStatement | `load` | `GET /balance-sheet-statements` | Required |
| FinancialStatement | `load` | `GET /cash-flow-statements` | Required |
| FinancialStatement | `load` | `GET /income-statements` | Required |
| FinancialStatement | `load` | `GET /international-balance-sheet-statements` | Required |
| FinancialStatement | `load` | `GET /international-cash-flow-statements` | Required |
| FinancialStatement | `load` | `GET /international-income-statements` | Required |
| ForexData | `load` | `GET /forex-minute-prices` | Required |
| ForexData | `load` | `GET /forex-prices` | Required |
| ForexData | `load` | `GET /forex-quotes` | Required |
| ForexData | `load` | `GET /forex-symbols` | Required |
| InsiderTrading | `load` | `GET /insider-transactions` | Required |
| InsiderTrading | `load` | `GET /house-trading` | Required |
| InsiderTrading | `load` | `GET /proposed-sales` | Required |
| InsiderTrading | `load` | `GET /senate-trading` | Required |
| InstitutionalTrading | `load` | `GET /institutional-holdings` | Required |
| InstitutionalTrading | `load` | `GET /institutional-investors` | Required |
| InstitutionalTrading | `load` | `GET /institutional-portfolio-statistics` | Required |
| InvestmentAdviser | `load` | `GET /investment-adviser-information` | Required |
| InvestmentAdviser | `load` | `GET /investment-adviser-names` | Required |
| MarketData | `list` | `GET /minute-prices` | Required |
| MarketData | `list` | `GET /international-stock-prices` | Required |
| MarketData | `list` | `GET /latest-prices` | Required |
| MarketData | `list` | `GET /stock-prices` | Required |
| MarketData | `list` | `GET /stock-quotes` | Required |
| MarketData | `load` | `GET /commodity-prices` | Required |
| MarketData | `load` | `GET /otc-prices` | Required |
| MarketData | `load` | `GET /otc-volume` | Required |
| MarketIndex | `load` | `GET /index-prices` | Required |
| MarketIndex | `load` | `GET /index-constituents` | Required |
| MarketIndex | `load` | `GET /index-quotes` | Required |
| MarketIndex | `load` | `GET /index-symbols` | Required |
| MarketNew | `load` | `GET /press-releases` | Required |
| MarketNew | `load` | `GET /fed-press-releases` | Required |
| MarketNew | `load` | `GET /sec-press-releases` | Required |
| MiscellaneousData | `load` | `GET /dividends` | Required |
| MiscellaneousData | `load` | `GET /earnings-releases` | Required |
| MiscellaneousData | `load` | `GET /short-interest` | Required |
| MiscellaneousData | `load` | `GET /stock-splits` | Required |
| MiscellaneousData | `load` | `GET /initial-public-offerings` | Required |
| MutualFund | `load` | `GET /mutual-fund-holdings` | Required |
| MutualFund | `load` | `GET /mutual-fund-statistics` | Required |
| MutualFund | `load` | `GET /mutual-fund-symbols` | Required |
| SymbolList | `list` | `GET /etf-symbols` | Required |
| SymbolList | `list` | `GET /international-stock-symbols` | Required |
| SymbolList | `list` | `GET /otc-symbols` | Required |
| SymbolList | `list` | `GET /stock-symbols` | Required |
| SymbolList | `list` | `GET /commodity-symbols` | Required |

## Connect to the API

- Production server: `https://financialdata.net/api/v1`

The default credential is sent in the `key` query.

API key for authentication. Append ?key=API_KEY to each request URL or &amp;key=API_KEY if other query parameters exist.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `financial-data_list`: List records for an entity. Supported entities: `market_data`, `symbol_list`.
- `financial-data_load`: Load one record for an entity. Supported entities: `basic_information`, `crypto_currency`, `derivatives_data`, `esg_data`, `etf_data`, `event_calendar`, `financial_ratio`, `financial_statement`, `forex_data`, `insider_trading`, `institutional_trading`, `investment_adviser`, `market_data`, `market_index`, `market_new`, `miscellaneous_data`, `mutual_fund`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

