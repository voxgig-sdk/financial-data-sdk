"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "crypto_currency",
        "accessor": "CryptoCurrency",
        "op": "load",
        "method": "GET",
        "path": "/crypto-minute-prices",
        "args": [],
        "select": {
            "date": "v1",
            "identifier": "v1",
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "identifier",
            "date",
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "identifier",
                "wire": "identifier"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
    },
    {
        "entity": "crypto_currency",
        "accessor": "CryptoCurrency",
        "op": "load",
        "method": "GET",
        "path": "/crypto-symbols",
        "args": [],
        "select": {
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
    },
    {
        "entity": "derivatives_data",
        "accessor": "DerivativesData",
        "op": "load",
        "method": "GET",
        "path": "/futures-symbols",
        "args": [],
        "select": {
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
    },
    {
        "entity": "esg_data",
        "accessor": "EsgData",
        "op": "load",
        "method": "GET",
        "path": "/industry-esg-scores",
        "args": [],
        "select": {
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
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
            "identifier": "v1",
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "identifier",
            "date",
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "identifier",
                "wire": "identifier"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
    },
    {
        "entity": "forex_data",
        "accessor": "ForexData",
        "op": "load",
        "method": "GET",
        "path": "/forex-symbols",
        "args": [],
        "select": {
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
    },
    {
        "entity": "institutional_trading",
        "accessor": "InstitutionalTrading",
        "op": "load",
        "method": "GET",
        "path": "/institutional-holdings",
        "args": [],
        "select": {
            "identifier": "v1",
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "identifier",
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "identifier",
                "wire": "identifier"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
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
            "identifier": "MSFT",
            "key": "v1",
            "format": "json",
            "offset": 300
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "identifier",
            "date",
            "offset",
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "date",
                "wire": "date"
            },
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "identifier",
                "wire": "identifier"
            },
            {
                "name": "key",
                "wire": "key"
            },
            {
                "name": "offset",
                "wire": "offset"
            }
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
        "idField": "id",
        "ownQuery": "key"
    },
    {
        "entity": "market_index",
        "accessor": "MarketIndex",
        "op": "load",
        "method": "GET",
        "path": "/index-symbols",
        "args": [],
        "select": {
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
    },
    {
        "entity": "mutual_fund",
        "accessor": "MutualFund",
        "op": "load",
        "method": "GET",
        "path": "/mutual-fund-symbols",
        "args": [],
        "select": {
            "key": "v1",
            "format": "json"
        },
        "headers": [],
        "cookies": [],
        "query": [
            "format",
            "key"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "key",
                "wire": "key"
            }
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
        "idField": "id",
        "ownQuery": "key"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map