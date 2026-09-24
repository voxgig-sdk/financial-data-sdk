

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FinancialDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SymbolListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialDataSDK.test()
    const ent = testsdk.SymbolList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'symbol_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":0},"registrant_name":{"a":true,"h":"Registrant Name","n":"registrant_name","r":false,"t":"`$STRING`","key$":"registrant_name","index$":1},"title_of_security":{"a":true,"h":"Title Of Security","n":"title_of_security","r":false,"t":"`$STRING`","key$":"title_of_security","index$":2},"trading_symbol":{"a":true,"h":"Trading Symbol","n":"trading_symbol","r":false,"t":"`$STRING`","key$":"trading_symbol","index$":3}},"name":"symbol_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /etf-symbols","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":500,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/etf-symbols","q":{"exist":["format","key","offset"]},"r":{},"s":[{"lit":"etf-symbols"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /international-stock-symbols","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":500,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/international-stock-symbols","q":{"exist":["format","key","offset"]},"r":{},"s":[{"lit":"international-stock-symbols"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /otc-symbols","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":500,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/otc-symbols","q":{"exist":["format","key","offset"]},"r":{},"s":[{"lit":"otc-symbols"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /stock-symbols","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":500,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/stock-symbols","q":{"exist":["format","key","offset"]},"r":{},"s":[{"lit":"stock-symbols"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /commodity-symbols","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/commodity-symbols","q":{"exist":["format","key"]},"r":{},"s":[{"lit":"commodity-symbols"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"symbol_list","name__orig":"symbol_list","Name":"SymbolList","name_":"symbol_list","name-":"symbol-list","NAME":"SYMBOL_LIST","index$":17}, {"active":true,"entity":"symbol_list","key$":"BasicSymbolListFlow","kind":"basic","name":"BasicSymbolListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"symbol_list_ref01"}}],"index$":0}]}, 'SymbolList', {"GET /etf-symbols":{"protocol":"http","operationId":"getEtfSymbols","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"trading_symbol":{"type":"string","example":"AAA","key$":"trading_symbol"},"description":{"type":"string","example":"AAF First Priority CLO Bond ETF","key$":"description"}},"index$":0}}}}}},"parameters":[{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0,"example":500},"index$":0},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /international-stock-symbols":{"protocol":"http","operationId":"getInternationalStockSymbols","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"trading_symbol":{"type":"string","example":"000080.KS","key$":"trading_symbol"},"registrant_name":{"type":"string","example":"HiteJinro Co., Ltd.","key$":"registrant_name"}},"index$":0}}}}}},"parameters":[{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0,"example":500},"index$":0},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /otc-symbols":{"protocol":"http","operationId":"getOtcSymbols","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"trading_symbol":{"type":"string","example":"AAALY","key$":"trading_symbol"},"title_of_security":{"type":"string","example":"Aareal Bank AG Unsponsored American Depository Receipt (Germany)","key$":"title_of_security"}},"index$":0}}}}}},"parameters":[{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0,"example":500},"index$":0},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /stock-symbols":{"protocol":"http","operationId":"getStockSymbols","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"trading_symbol":{"type":"string","example":"A","key$":"trading_symbol"},"registrant_name":{"type":"string","example":"AGILENT TECHNOLOGIES, INC.","key$":"registrant_name"}},"index$":0}}}}}},"parameters":[{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0,"example":500},"index$":0},{"name":"format","in":"query","description":"The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /commodity-symbols":{"protocol":"http","operationId":"getCommoditySymbols","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"trading_symbol":{"type":"string","example":"BZ","key$":"trading_symbol"},"description":{"type":"string","example":"Brent Crude Oil Futures (NYMEX)","key$":"description"}},"index$":0}}}}}},"parameters":[{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":0},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let symbol_list_ref01_data = Object.values(setup.data.existing.symbol_list)[0] as any

    // LIST
    const symbol_list_ref01_ent = client.SymbolList()
    const symbol_list_ref01_match: any = {}

    const symbol_list_ref01_list = (await symbol_list_ref01_ent.list(symbol_list_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/symbol_list/SymbolListTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FinancialDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['symbol_list01','symbol_list02','symbol_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_DATA_TEST_SYMBOL_LIST_ENTID': idmap,
    'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
    'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
    'FINANCIAL_DATA_APIKEY': '',
  })

  idmap = env['FINANCIAL_DATA_TEST_SYMBOL_LIST_ENTID']

  const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_DATA_TEST_SYMBOL_LIST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FinancialDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
