

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"crypto_currency","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"date","orig":"date","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /crypto-minute-prices","json":"{\"operationId\":\"getCryptoMinutePrices\",\"parameters\":[{\"description\":\"The crypto symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The date in YYYY-MM-DD format.\",\"in\":\"query\",\"name\":\"date\",\"required\":true,\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/crypto-minute-prices","segments":[{"lit":"crypto-minute-prices"}],"select":{"exist":["date","format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /crypto-information","json":"{\"operationId\":\"getCryptoInformation\",\"parameters\":[{\"description\":\"The crypto symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/crypto-information","segments":[{"lit":"crypto-information"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /crypto-prices","json":"{\"operationId\":\"getCryptoPrices\",\"parameters\":[{\"description\":\"The crypto symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/crypto-prices","segments":[{"lit":"crypto-prices"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /crypto-quotes","json":"{\"operationId\":\"getCryptoQuotes\",\"parameters\":[{\"description\":\"The crypto symbols (comma-separated).\",\"in\":\"query\",\"name\":\"identifiers\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/crypto-quotes","segments":[{"lit":"crypto-quotes"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /crypto-symbols","json":"{\"operationId\":\"getCryptoSymbols\",\"parameters\":[{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/crypto-symbols","segments":[{"lit":"crypto-symbols"}],"select":{"exist":["format","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"crypto_currency","name__orig":"crypto_currency","Name":"CryptoCurrency","name_":"crypto_currency","name-":"crypto-currency","NAME":"CRYPTO_CURRENCY","index$":1}, {"active":true,"entity":"crypto_currency","key$":"BasicCryptoCurrencyFlow","kind":"basic","name":"BasicCryptoCurrencyFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"crypto_currency_ref01","srcdatavar":"crypto_currency_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-crypto_currency_ref01"}}],"index$":0}]}, 'CryptoCurrency')
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
  
