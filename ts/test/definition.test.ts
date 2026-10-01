import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "crypto_currency",
    "accessor": "CryptoCurrency",
    "op": "load",
    "method": "GET",
    "path": "/crypto-minute-prices",
    "args": [],
    "select": {
      "date": "v1",
      "format": "v1",
      "identifier": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "identifier",
      "date",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "crypto_currency",
    "accessor": "CryptoCurrency",
    "op": "load",
    "method": "GET",
    "path": "/crypto-symbols",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "derivatives_data",
    "accessor": "DerivativesData",
    "op": "load",
    "method": "GET",
    "path": "/futures-symbols",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "esg_data",
    "accessor": "EsgData",
    "op": "load",
    "method": "GET",
    "path": "/industry-esg-scores",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "forex_data",
    "accessor": "ForexData",
    "op": "load",
    "method": "GET",
    "path": "/forex-minute-prices",
    "args": [],
    "select": {
      "date": "v1",
      "format": "v1",
      "identifier": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "identifier",
      "date",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "forex_data",
    "accessor": "ForexData",
    "op": "load",
    "method": "GET",
    "path": "/forex-symbols",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "insider_trading",
    "accessor": "InsiderTrading",
    "op": "load",
    "method": "GET",
    "path": "/insider-transactions",
    "args": [],
    "select": {
      "format": "v1",
      "identifier": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "identifier",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "institutional_trading",
    "accessor": "InstitutionalTrading",
    "op": "load",
    "method": "GET",
    "path": "/institutional-holdings",
    "args": [],
    "select": {
      "format": "v1",
      "identifier": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "identifier",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "market_data",
    "accessor": "MarketData",
    "op": "list",
    "method": "GET",
    "path": "/minute-prices",
    "args": [],
    "select": {
      "date": "2020-01-15",
      "format": "v1",
      "identifier": "MSFT",
      "key": "v1",
      "offset": 300
    },
    "headers": [],
    "query": [
      "identifier",
      "date",
      "offset",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "trading_symbol": "MSFT",
        "time": "2020-01-15 20:59:00",
        "open": 163.14,
        "high": 163.26,
        "low": 163.1,
        "close": 163.25,
        "volume": 5633
      }
    ],
    "idField": "id"
  },
  {
    "entity": "market_data",
    "accessor": "MarketData",
    "op": "list",
    "method": "GET",
    "path": "/stock-quotes",
    "args": [],
    "select": {
      "format": "v1",
      "identifier": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "identifiers",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "trading_symbol": "AAPL",
        "registrant_name": "Apple Inc.",
        "time": "2025-09-02 15:56:00",
        "price": 238.08,
        "change": 8.36,
        "percentage_change": 3.64
      }
    ],
    "idField": "id"
  },
  {
    "entity": "market_data",
    "accessor": "MarketData",
    "op": "load",
    "method": "GET",
    "path": "/otc-volume",
    "args": [],
    "select": {
      "format": "v1",
      "identifier": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "identifier",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "market_index",
    "accessor": "MarketIndex",
    "op": "load",
    "method": "GET",
    "path": "/index-prices",
    "args": [],
    "select": {
      "format": "v1",
      "identifier": "v1",
      "key": "v1",
      "offset": "v1"
    },
    "headers": [],
    "query": [
      "identifier",
      "offset",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "market_index",
    "accessor": "MarketIndex",
    "op": "load",
    "method": "GET",
    "path": "/index-symbols",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "market_new",
    "accessor": "MarketNew",
    "op": "load",
    "method": "GET",
    "path": "/press-releases",
    "args": [],
    "select": {
      "format": "v1",
      "identifier": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "identifier",
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "miscellaneous_data",
    "accessor": "MiscellaneousData",
    "op": "load",
    "method": "GET",
    "path": "/initial-public-offerings",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "mutual_fund",
    "accessor": "MutualFund",
    "op": "load",
    "method": "GET",
    "path": "/mutual-fund-symbols",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "symbol_list",
    "accessor": "SymbolList",
    "op": "list",
    "method": "GET",
    "path": "/commodity-symbols",
    "args": [],
    "select": {
      "format": "v1",
      "key": "v1"
    },
    "headers": [],
    "query": [
      "format",
      "key"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "key"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "trading_symbol": "BZ",
        "description": "Brent Crude Oil Futures (NYMEX)"
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
