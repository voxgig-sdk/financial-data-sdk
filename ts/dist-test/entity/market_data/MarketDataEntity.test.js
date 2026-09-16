"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('MarketDataEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FINANCIAL_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FinancialDataSDK.test();
        const ent = testsdk.MarketData();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'market_data.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "float", "name": "change", "req": false, "type": "`$NUMBER`", "index$": 0 }, { "active": true, "format": "float", "name": "close", "req": false, "type": "`$NUMBER`", "index$": 1 }, { "active": true, "format": "date", "name": "date", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "float", "name": "high", "req": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "format": "float", "name": "low", "req": false, "type": "`$NUMBER`", "index$": 4 }, { "active": true, "format": "float", "name": "open", "req": false, "type": "`$NUMBER`", "index$": 5 }, { "active": true, "format": "float", "name": "percentage_change", "req": false, "type": "`$NUMBER`", "index$": 6 }, { "active": true, "format": "float", "name": "price", "req": false, "type": "`$NUMBER`", "index$": 7 }, { "active": true, "name": "registrant_name", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "time", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "trading_symbol", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "format": "float", "name": "volume", "req": false, "type": "`$NUMBER`", "index$": 11 }], "name": "market_data", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "2020-01-15", "kind": "query", "name": "date", "orig": "date", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "MSFT", "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": 300, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 4 }] }, "contract": { "id": "GET /minute-prices", "json": "{\"operationId\":\"getMinutePrices\",\"parameters\":[{\"description\":\"The trading symbol for a security.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"example\":\"MSFT\",\"type\":\"string\"}},{\"description\":\"The date in YYYY-MM-DD format.\",\"in\":\"query\",\"name\":\"date\",\"required\":true,\"schema\":{\"example\":\"2020-01-15\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"example\":300,\"type\":\"integer\"}},{\"description\":\"The format of the returned data, either JSON or CSV. Defaults to JSON.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"close\":{\"example\":163.25,\"format\":\"float\",\"type\":\"number\"},\"high\":{\"example\":163.26,\"format\":\"float\",\"type\":\"number\"},\"low\":{\"example\":163.1,\"format\":\"float\",\"type\":\"number\"},\"open\":{\"example\":163.14,\"format\":\"float\",\"type\":\"number\"},\"time\":{\"example\":\"2020-01-15 20:59:00\",\"type\":\"string\"},\"trading_symbol\":{\"example\":\"MSFT\",\"type\":\"string\"},\"volume\":{\"example\":5633,\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/minute-prices", "segments": [{ "lit": "minute-prices" }], "select": { "exist": ["date", "format", "identifier", "key", "offset"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "SHEL.L", "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 300, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /international-stock-prices", "json": "{\"operationId\":\"getInternationalStockPrices\",\"parameters\":[{\"description\":\"The trading symbol for a security.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"example\":\"SHEL.L\",\"type\":\"string\"}},{\"description\":\"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"example\":300,\"type\":\"integer\"}},{\"description\":\"The format of the returned data, either JSON or CSV. Defaults to JSON.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"close\":{\"example\":2486.5,\"format\":\"float\",\"type\":\"number\"},\"date\":{\"example\":\"2025-05-02\",\"format\":\"date\",\"type\":\"string\"},\"high\":{\"example\":2543.5,\"format\":\"float\",\"type\":\"number\"},\"low\":{\"example\":2461.5,\"format\":\"float\",\"type\":\"number\"},\"open\":{\"example\":2493,\"format\":\"float\",\"type\":\"number\"},\"trading_symbol\":{\"example\":\"SHEL.L\",\"type\":\"string\"},\"volume\":{\"example\":12476281,\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/international-stock-prices", "segments": [{ "lit": "international-stock-prices" }], "select": { "exist": ["format", "identifier", "key", "offset"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /latest-prices", "json": "{\"operationId\":\"getLatestPrices\",\"parameters\":[{\"description\":\"The trading symbol for a security.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"The format of the returned data, either JSON or CSV. Defaults to JSON.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"close\":{\"format\":\"float\",\"type\":\"number\"},\"high\":{\"format\":\"float\",\"type\":\"number\"},\"low\":{\"format\":\"float\",\"type\":\"number\"},\"open\":{\"format\":\"float\",\"type\":\"number\"},\"time\":{\"type\":\"string\"},\"trading_symbol\":{\"type\":\"string\"},\"volume\":{\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/latest-prices", "segments": [{ "lit": "latest-prices" }], "select": { "exist": ["format", "identifier", "key", "offset"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "MSFT", "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 300, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /stock-prices", "json": "{\"operationId\":\"getStockPrices\",\"parameters\":[{\"description\":\"The trading symbol for a security.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"example\":\"MSFT\",\"type\":\"string\"}},{\"description\":\"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"example\":300,\"type\":\"integer\"}},{\"description\":\"The format of the returned data, either JSON or CSV. Defaults to JSON.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"close\":{\"example\":437.42,\"format\":\"float\",\"type\":\"number\"},\"date\":{\"example\":\"2024-12-04\",\"format\":\"date\",\"type\":\"string\"},\"high\":{\"example\":439.67,\"format\":\"float\",\"type\":\"number\"},\"low\":{\"example\":432.63,\"format\":\"float\",\"type\":\"number\"},\"open\":{\"example\":433.03,\"format\":\"float\",\"type\":\"number\"},\"trading_symbol\":{\"example\":\"MSFT\",\"type\":\"string\"},\"volume\":{\"example\":26009430,\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/stock-prices", "segments": [{ "lit": "stock-prices" }], "select": { "exist": ["format", "identifier", "key", "offset"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "MSFT,AAPL", "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /stock-quotes", "json": "{\"operationId\":\"getStockQuotes\",\"parameters\":[{\"description\":\"The trading symbols for the securities (comma-separated).\",\"in\":\"query\",\"name\":\"identifiers\",\"required\":true,\"schema\":{\"example\":\"MSFT,AAPL\",\"type\":\"string\"}},{\"description\":\"The format of the returned data, either JSON or CSV. Defaults to JSON.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"change\":{\"example\":8.36,\"format\":\"float\",\"type\":\"number\"},\"percentage_change\":{\"example\":3.64,\"format\":\"float\",\"type\":\"number\"},\"price\":{\"example\":238.08,\"format\":\"float\",\"type\":\"number\"},\"registrant_name\":{\"example\":\"Apple Inc.\",\"type\":\"string\"},\"time\":{\"example\":\"2025-09-02 15:56:00\",\"type\":\"string\"},\"trading_symbol\":{\"example\":\"AAPL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/stock-quotes", "segments": [{ "lit": "stock-quotes" }], "select": { "exist": ["format", "identifier", "key"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /commodity-prices", "json": "{\"operationId\":\"getCommodityPrices\",\"parameters\":[{\"description\":\"The trading symbol for a commodity.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The initial position of the record subset.\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/commodity-prices", "segments": [{ "lit": "commodity-prices" }], "select": { "exist": ["format", "identifier", "key", "offset"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /otc-prices", "json": "{\"operationId\":\"getOtcPrices\",\"parameters\":[{\"description\":\"The trading symbol for an OTC security.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The initial position of the record subset.\",\"in\":\"query\",\"name\":\"offset\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/otc-prices", "segments": [{ "lit": "otc-prices" }], "select": { "exist": ["format", "identifier", "key", "offset"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "example": "json", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "identifier", "orig": "identifier", "reqd": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "key", "orig": "key", "reqd": true, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /otc-volume", "json": "{\"operationId\":\"getOtcVolume\",\"parameters\":[{\"description\":\"The trading symbol for an OTC security.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/otc-volume", "segments": [{ "lit": "otc-volume" }], "select": { "exist": ["format", "identifier", "key"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "market_data", "name__orig": "market_data", "Name": "MarketData", "name_": "market_data", "name-": "market-data", "NAME": "MARKET_DATA", "index$": 12 }, { "active": true, "entity": "market_data", "key$": "BasicMarketDataFlow", "kind": "basic", "name": "BasicMarketDataFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "market_data_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "market_data_ref01", "srcdatavar": "market_data_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-market_data_ref01" } }], "index$": 1 }] }, 'MarketData');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let market_data_ref01_data = Object.values(setup.data.existing.market_data)[0];
        // LIST
        const market_data_ref01_ent = client.MarketData();
        const market_data_ref01_match = {};
        const market_data_ref01_list = (await market_data_ref01_ent.list(market_data_ref01_match)).map((e) => e.data());
        // LOAD
        const market_data_ref01_match_dt0 = {};
        const market_data_ref01_data_dt0 = (await market_data_ref01_ent.load(market_data_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != market_data_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/market_data/MarketDataTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FinancialDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['market_data01', 'market_data02', 'market_data03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FINANCIAL_DATA_TEST_MARKET_DATA_ENTID': idmap,
        'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
        'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
        'FINANCIAL_DATA_APIKEY': '',
    });
    idmap = env['FINANCIAL_DATA_TEST_MARKET_DATA_ENTID'];
    const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FINANCIAL_DATA_TEST_MARKET_DATA_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FinancialDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.FINANCIAL_DATA_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FINANCIAL_DATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=MarketDataEntity.test.js.map