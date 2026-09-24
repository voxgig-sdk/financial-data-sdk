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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BasicInformationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FINANCIAL_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FinancialDataSDK.test();
        const ent = testsdk.BasicInformation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'basic_information.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "basic_information", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /company-information", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "identifier", "or": "identifier", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/company-information", "q": { "exist": ["format", "identifier", "key"] }, "r": {}, "s": [{ "lit": "company-information" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /employee-count", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "identifier", "or": "identifier", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/employee-count", "q": { "exist": ["format", "identifier", "key"] }, "r": {}, "s": [{ "lit": "employee-count" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /executive-compensation", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "identifier", "or": "identifier", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/executive-compensation", "q": { "exist": ["format", "identifier", "key"] }, "r": {}, "s": [{ "lit": "executive-compensation" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /international-company-information", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "identifier", "or": "identifier", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/international-company-information", "q": { "exist": ["format", "identifier", "key"] }, "r": {}, "s": [{ "lit": "international-company-information" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /key-metrics", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "identifier", "or": "identifier", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/key-metrics", "q": { "exist": ["format", "identifier", "key"] }, "r": {}, "s": [{ "lit": "key-metrics" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }, { "a": true, "co": { "id": "GET /market-cap", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "identifier", "or": "identifier", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/market-cap", "q": { "exist": ["format", "identifier", "key"] }, "r": {}, "s": [{ "lit": "market-cap" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 5 }, { "a": true, "co": { "id": "GET /securities-information", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "json", "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "identifier", "or": "identifier", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "key", "or": "key", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/securities-information", "q": { "exist": ["format", "identifier", "key"] }, "r": {}, "s": [{ "lit": "securities-information" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 6 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "basic_information", "name__orig": "basic_information", "Name": "BasicInformation", "name_": "basic_information", "name-": "basic-information", "NAME": "BASIC_INFORMATION", "index$": 0 }, { "active": true, "entity": "basic_information", "key$": "BasicBasicInformationFlow", "kind": "basic", "name": "BasicBasicInformationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "basic_information_ref01", "srcdatavar": "basic_information_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-basic_information_ref01" } }], "index$": 0 }] }, 'BasicInformation', { "GET /company-information": { "protocol": "http", "operationId": "getCompanyInformation", "responses": { "200": { "description": "Successful response" } }, "parameters": [{ "name": "identifier", "in": "query", "description": "The trading symbol.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "The format of the returned data.", "required": false, "schema": { "type": "string", "enum": ["json", "csv"], "default": "json" }, "index$": 1 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist." } } }, "GET /employee-count": { "protocol": "http", "operationId": "getEmployeeCount", "responses": { "200": { "description": "Successful response" } }, "parameters": [{ "name": "identifier", "in": "query", "description": "The trading symbol.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "The format of the returned data.", "required": false, "schema": { "type": "string", "enum": ["json", "csv"], "default": "json" }, "index$": 1 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist." } } }, "GET /executive-compensation": { "protocol": "http", "operationId": "getExecutiveCompensation", "responses": { "200": { "description": "Successful response" } }, "parameters": [{ "name": "identifier", "in": "query", "description": "The trading symbol.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "The format of the returned data.", "required": false, "schema": { "type": "string", "enum": ["json", "csv"], "default": "json" }, "index$": 1 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist." } } }, "GET /international-company-information": { "protocol": "http", "operationId": "getInternationalCompanyInformation", "responses": { "200": { "description": "Successful response" } }, "parameters": [{ "name": "identifier", "in": "query", "description": "The trading symbol.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "The format of the returned data.", "required": false, "schema": { "type": "string", "enum": ["json", "csv"], "default": "json" }, "index$": 1 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist." } } }, "GET /key-metrics": { "protocol": "http", "operationId": "getKeyMetrics", "responses": { "200": { "description": "Successful response" } }, "parameters": [{ "name": "identifier", "in": "query", "description": "The trading symbol.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "The format of the returned data.", "required": false, "schema": { "type": "string", "enum": ["json", "csv"], "default": "json" }, "index$": 1 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist." } } }, "GET /market-cap": { "protocol": "http", "operationId": "getMarketCap", "responses": { "200": { "description": "Successful response" } }, "parameters": [{ "name": "identifier", "in": "query", "description": "The trading symbol.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "The format of the returned data.", "required": false, "schema": { "type": "string", "enum": ["json", "csv"], "default": "json" }, "index$": 1 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist." } } }, "GET /securities-information": { "protocol": "http", "operationId": "getSecuritiesInformation", "responses": { "200": { "description": "Successful response" } }, "parameters": [{ "name": "identifier", "in": "query", "description": "The trading symbol.", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "format", "in": "query", "description": "The format of the returned data.", "required": false, "schema": { "type": "string", "enum": ["json", "csv"], "default": "json" }, "index$": 1 }, { "name": "key", "in": "query", "description": "API key for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "key", "description": "API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let basic_information_ref01_data = Object.values(setup.data.existing.basic_information)[0];
        // LOAD
        const basic_information_ref01_ent = client.BasicInformation();
        const basic_information_ref01_match_dt0 = {};
        const basic_information_ref01_data_dt0 = (await basic_information_ref01_ent.load(basic_information_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != basic_information_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/basic_information/BasicInformationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FinancialDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['basic_information01', 'basic_information02', 'basic_information03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FINANCIAL_DATA_TEST_BASIC_INFORMATION_ENTID': idmap,
        'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
        'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
        'FINANCIAL_DATA_APIKEY': '',
    });
    idmap = env['FINANCIAL_DATA_TEST_BASIC_INFORMATION_ENTID'];
    const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FINANCIAL_DATA_TEST_BASIC_INFORMATION_ENTID'];
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
//# sourceMappingURL=BasicInformationEntity.test.js.map