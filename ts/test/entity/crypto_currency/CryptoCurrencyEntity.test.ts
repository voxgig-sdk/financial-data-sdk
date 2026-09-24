

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


describe('CryptoCurrencyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialDataSDK.test()
    const ent = testsdk.CryptoCurrency()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'crypto_currency.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"crypto_currency","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /crypto-minute-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/crypto-minute-prices","q":{"exist":["date","format","identifier","key"]},"r":{},"s":[{"lit":"crypto-minute-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /crypto-information","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/crypto-information","q":{"exist":["format","identifier","key"]},"r":{},"s":[{"lit":"crypto-information"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /crypto-prices","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/crypto-prices","q":{"exist":["format","identifier","key"]},"r":{},"s":[{"lit":"crypto-prices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /crypto-quotes","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"identifier","or":"identifier","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/crypto-quotes","q":{"exist":["format","identifier","key"]},"r":{},"s":[{"lit":"crypto-quotes"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /crypto-symbols","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/crypto-symbols","q":{"exist":["format","key"]},"r":{},"s":[{"lit":"crypto-symbols"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"crypto_currency","name__orig":"crypto_currency","Name":"CryptoCurrency","name_":"crypto_currency","name-":"crypto-currency","NAME":"CRYPTO_CURRENCY","index$":1}, {"active":true,"entity":"crypto_currency","key$":"BasicCryptoCurrencyFlow","kind":"basic","name":"BasicCryptoCurrencyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"crypto_currency_ref01","srcdatavar":"crypto_currency_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-crypto_currency_ref01"}}],"index$":0}]}, 'CryptoCurrency', {"GET /crypto-minute-prices":{"protocol":"http","operationId":"getCryptoMinutePrices","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifier","in":"query","description":"The crypto symbol.","required":true,"schema":{"type":"string"},"index$":0},{"name":"date","in":"query","description":"The date in YYYY-MM-DD format.","required":true,"schema":{"type":"string","format":"date"},"index$":1},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":2},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":3}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /crypto-information":{"protocol":"http","operationId":"getCryptoInformation","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifier","in":"query","description":"The crypto symbol.","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /crypto-prices":{"protocol":"http","operationId":"getCryptoPrices","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifier","in":"query","description":"The crypto symbol.","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /crypto-quotes":{"protocol":"http","operationId":"getCryptoQuotes","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"identifiers","in":"query","description":"The crypto symbols (comma-separated).","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":1},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":2}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /crypto-symbols":{"protocol":"http","operationId":"getCryptoSymbols","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":0},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let crypto_currency_ref01_data = Object.values(setup.data.existing.crypto_currency)[0] as any

    // LOAD
    const crypto_currency_ref01_ent = client.CryptoCurrency()
    const crypto_currency_ref01_match_dt0: any = {}
    const crypto_currency_ref01_data_dt0 = (await crypto_currency_ref01_ent.load(crypto_currency_ref01_match_dt0)).data()
    assert(null != crypto_currency_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/crypto_currency/CryptoCurrencyTestData.json')

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
    ['crypto_currency01','crypto_currency02','crypto_currency03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_DATA_TEST_CRYPTO_CURRENCY_ENTID': idmap,
    'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
    'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
    'FINANCIAL_DATA_APIKEY': '',
  })

  idmap = env['FINANCIAL_DATA_TEST_CRYPTO_CURRENCY_ENTID']

  const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_DATA_TEST_CRYPTO_CURRENCY_ENTID']
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
  
