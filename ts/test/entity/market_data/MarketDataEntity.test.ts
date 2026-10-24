

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FinancialDataSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('MarketDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialDataSDK.test()
    const ent = testsdk.MarketData()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('market_data hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FinancialDataSDK.test(offline).MarketData().stream('list')) { }
    }, /offline/)

    for await (const _item of FinancialDataSDK.test(offline).MarketData()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FinancialDataSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.MarketData().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FinancialDataSDK.test().MarketData().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FinancialDataSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.MarketData().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.MarketData().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FinancialDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MarketData().list({"date":1,"identifier":"x","key":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'market_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"change":{"a":true,"fo":"float","h":"Change","n":"change","r":false,"t":"`$NUMBER`","key$":"change","index$":0},"close":{"a":true,"fo":"float","h":"Close","n":"close","r":false,"t":"`$NUMBER`","key$":"close","index$":1},"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":2},"high":{"a":true,"fo":"float","h":"High","n":"high","r":false,"t":"`$NUMBER`","key$":"high","index$":3},"low":{"a":true,"fo":"float","h":"Low","n":"low","r":false,"t":"`$NUMBER`","key$":"low","index$":4},"open":{"a":true,"fo":"float","h":"Open","n":"open","r":false,"t":"`$NUMBER`","key$":"open","index$":5},"percentage_change":{"a":true,"fo":"float","h":"Percentage Change","n":"percentage_change","r":false,"t":"`$NUMBER`","key$":"percentage_change","index$":6},"price":{"a":true,"fo":"float","h":"Price","n":"price","r":false,"t":"`$NUMBER`","key$":"price","index$":7},"registrant_name":{"a":true,"h":"Registrant Name","n":"registrant_name","r":false,"t":"`$STRING`","key$":"registrant_name","index$":8},"time":{"a":true,"h":"Time","n":"time","r":false,"t":"`$STRING`","key$":"time","index$":9},"trading_symbol":{"a":true,"h":"Trading Symbol","n":"trading_symbol","r":false,"t":"`$STRING`","key$":"trading_symbol","index$":10},"volume":{"a":true,"fo":"float","h":"Volume","n":"volume","r":false,"t":"`$NUMBER`","key$":"volume","index$":11}},"name":"market_data","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /minute-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2020-01-15","k":"query","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"MSFT","k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":3},{"a":true,"ex":300,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":4}]},"k":"http","m":"GET","o":"/minute-prices","q":{"exist":["date","identifier","key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"minute-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /international-stock-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"SHEL.L","k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":300,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/international-stock-prices","q":{"exist":["identifier","key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"international-stock-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /latest-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/latest-prices","q":{"exist":["identifier","key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"latest-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /stock-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"MSFT","k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":300,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/stock-prices","q":{"exist":["identifier","key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"stock-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /stock-quotes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"MSFT,AAPL","k":"query","n":"identifier","or":"identifiers","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/stock-quotes","q":{"exist":["identifier","key"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"stock-quotes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /commodity-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/commodity-prices","q":{"exist":["identifier","key"]},"r":{},"s":[{"lit":"commodity-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /otc-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/otc-prices","q":{"exist":["identifier","key"]},"r":{},"s":[{"lit":"otc-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /otc-volume","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/otc-volume","q":{"exist":["identifier","key"]},"r":{},"s":[{"lit":"otc-volume"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"market_data","name__orig":"market_data","Name":"MarketData","name_":"market_data","name-":"market-data","NAME":"MARKET_DATA","index$":12}, {"active":true,"entity":"market_data","key$":"BasicMarketDataFlow","kind":"basic","name":"BasicMarketDataFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"market_data_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"market_data_ref01","srcdatavar":"market_data_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-market_data_ref01"}}],"index$":1}]}, 'MarketData', {"GET /minute-prices":{"protocol":"http","parameters":[{"name":"identifier","in":"query","description":"The trading symbol for a security.","required":true,"schema":{"type":"string","example":"MSFT"},"index$":0},{"name":"date","in":"query","description":"The date in YYYY-MM-DD format.","required":true,"schema":{"type":"string","format":"date","example":"2020-01-15"},"index$":1},{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0,"example":300},"index$":2},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":3},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":4}]},"GET /international-stock-prices":{"protocol":"http","parameters":[{"name":"identifier","in":"query","description":"The trading symbol for a security.","required":true,"schema":{"type":"string","example":"SHEL.L"},"index$":0},{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0,"example":300},"index$":1},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":2},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":3}]},"GET /latest-prices":{"protocol":"http","parameters":[{"name":"identifier","in":"query","description":"The trading symbol for a security.","required":true,"schema":{"type":"string"},"index$":0},{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0},"index$":1},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":2},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":3}]},"GET /stock-prices":{"protocol":"http","parameters":[{"name":"identifier","in":"query","description":"The trading symbol for a security.","required":true,"schema":{"type":"string","example":"MSFT"},"index$":0},{"name":"offset","in":"query","description":"The initial position of the record subset, which indicates how many records to skip. Defaults to 0.","required":false,"schema":{"type":"integer","default":0,"example":300},"index$":1},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":2},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":3}]},"GET /stock-quotes":{"protocol":"http","parameters":[{"name":"identifiers","in":"query","description":"The trading symbols for the securities (comma-separated).","required":true,"schema":{"type":"string","example":"MSFT,AAPL"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data, either JSON or CSV. Defaults to JSON.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}]},"GET /commodity-prices":{"protocol":"http","parameters":[{"name":"identifier","in":"query","description":"The trading symbol for a commodity.","required":true,"schema":{"type":"string"},"index$":0},{"name":"offset","in":"query","description":"The initial position of the record subset.","required":false,"schema":{"type":"integer","default":0},"index$":1},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":2},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":3}]},"GET /otc-prices":{"protocol":"http","parameters":[{"name":"identifier","in":"query","description":"The trading symbol for an OTC security.","required":true,"schema":{"type":"string"},"index$":0},{"name":"offset","in":"query","description":"The initial position of the record subset.","required":false,"schema":{"type":"integer","default":0},"index$":1},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":2},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":3}]},"GET /otc-volume":{"protocol":"http","parameters":[{"name":"identifier","in":"query","description":"The trading symbol for an OTC security.","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let market_data_ref01_data = Object.values(setup.data.existing.market_data)[0] as any

    // LIST
    const market_data_ref01_ent = client.MarketData()
    const market_data_ref01_match: any = {}

    const market_data_ref01_list = (await market_data_ref01_ent.list(market_data_ref01_match)).map((e: any) => e.data())


    // LOAD
    const market_data_ref01_match_dt0: any = {}
    const market_data_ref01_data_dt0 = (await market_data_ref01_ent.load(market_data_ref01_match_dt0)).data()
    assert(null != market_data_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/market_data/MarketDataTestData.json')

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
    ['market_data01','market_data02','market_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_DATA_TEST_MARKET_DATA_ENTID': idmap,
    'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
    'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
    'FINANCIAL_DATA_APIKEY': '',
  })

  idmap = env['FINANCIAL_DATA_TEST_MARKET_DATA_ENTID']

  const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_DATA_TEST_MARKET_DATA_ENTID']
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
  
