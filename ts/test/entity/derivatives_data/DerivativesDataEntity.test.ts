

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


describe('DerivativesDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialDataSDK.test()
    const ent = testsdk.DerivativesData()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'derivatives_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"derivatives_data","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /futures-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/futures-prices","q":{"exist":["format","identifier","key"]},"r":{},"s":[{"lit":"futures-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /option-chain","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/option-chain","q":{"exist":["format","identifier","key"]},"r":{},"s":[{"lit":"option-chain"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /option-greeks","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/option-greeks","q":{"exist":["format","identifier","key"]},"r":{},"s":[{"lit":"option-greeks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /option-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/option-prices","q":{"exist":["format","identifier","key"]},"r":{},"s":[{"lit":"option-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /futures-symbols","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/futures-symbols","q":{"exist":["format","key"]},"r":{},"s":[{"lit":"futures-symbols"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"derivatives_data","name__orig":"derivatives_data","Name":"DerivativesData","name_":"derivatives_data","name-":"derivatives-data","NAME":"DERIVATIVES_DATA","index$":2}, {"active":true,"entity":"derivatives_data","key$":"BasicDerivativesDataFlow","kind":"basic","name":"BasicDerivativesDataFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"derivatives_data_ref01","srcdatavar":"derivatives_data_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-derivatives_data_ref01"}}],"index$":0}]}, 'DerivativesData', {"GET /futures-prices":{"protocol":"http","operationId":"getFuturesPrices","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifier","in":"query","description":"The futures symbol.","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /option-chain":{"protocol":"http","operationId":"getOptionChain","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifier","in":"query","description":"The trading symbol.","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /option-greeks":{"protocol":"http","operationId":"getOptionGreeks","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifier","in":"query","description":"The option identifier.","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /option-prices":{"protocol":"http","operationId":"getOptionPrices","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifier","in":"query","description":"The option identifier.","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /futures-symbols":{"protocol":"http","operationId":"getFuturesSymbols","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":0},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let derivatives_data_ref01_data = Object.values(setup.data.existing.derivatives_data)[0] as any

    // LOAD
    const derivatives_data_ref01_ent = client.DerivativesData()
    const derivatives_data_ref01_match_dt0: any = {}
    const derivatives_data_ref01_data_dt0 = (await derivatives_data_ref01_ent.load(derivatives_data_ref01_match_dt0)).data()
    assert(null != derivatives_data_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/derivatives_data/DerivativesDataTestData.json')

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
    ['derivatives_data01','derivatives_data02','derivatives_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_DATA_TEST_DERIVATIVES_DATA_ENTID': idmap,
    'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
    'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
    'FINANCIAL_DATA_APIKEY': '',
  })

  idmap = env['FINANCIAL_DATA_TEST_DERIVATIVES_DATA_ENTID']

  const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_DATA_TEST_DERIVATIVES_DATA_ENTID']
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
  
