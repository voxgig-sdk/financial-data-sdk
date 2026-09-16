

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


describe('BasicInformationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialDataSDK.test()
    const ent = testsdk.BasicInformation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'basic_information.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"basic_information","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /company-information","json":"{\"operationId\":\"getCompanyInformation\",\"parameters\":[{\"description\":\"The trading symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/company-information","segments":[{"lit":"company-information"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /employee-count","json":"{\"operationId\":\"getEmployeeCount\",\"parameters\":[{\"description\":\"The trading symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/employee-count","segments":[{"lit":"employee-count"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /executive-compensation","json":"{\"operationId\":\"getExecutiveCompensation\",\"parameters\":[{\"description\":\"The trading symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/executive-compensation","segments":[{"lit":"executive-compensation"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /international-company-information","json":"{\"operationId\":\"getInternationalCompanyInformation\",\"parameters\":[{\"description\":\"The trading symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/international-company-information","segments":[{"lit":"international-company-information"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /key-metrics","json":"{\"operationId\":\"getKeyMetrics\",\"parameters\":[{\"description\":\"The trading symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/key-metrics","segments":[{"lit":"key-metrics"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":4},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /market-cap","json":"{\"operationId\":\"getMarketCap\",\"parameters\":[{\"description\":\"The trading symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/market-cap","segments":[{"lit":"market-cap"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":5},{"active":true,"args":{"query":[{"active":true,"example":"json","kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"identifier","orig":"identifier","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /securities-information","json":"{\"operationId\":\"getSecuritiesInformation\",\"parameters\":[{\"description\":\"The trading symbol.\",\"in\":\"query\",\"name\":\"identifier\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The format of the returned data.\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"json\",\"enum\":[\"json\",\"csv\"],\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"description\":\"Successful response\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist.\",\"in\":\"query\",\"name\":\"key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/securities-information","segments":[{"lit":"securities-information"}],"select":{"exist":["format","identifier","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":6}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"basic_information","name__orig":"basic_information","Name":"BasicInformation","name_":"basic_information","name-":"basic-information","NAME":"BASIC_INFORMATION","index$":0}, {"active":true,"entity":"basic_information","key$":"BasicBasicInformationFlow","kind":"basic","name":"BasicBasicInformationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"basic_information_ref01","srcdatavar":"basic_information_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-basic_information_ref01"}}],"index$":0}]}, 'BasicInformation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let basic_information_ref01_data = Object.values(setup.data.existing.basic_information)[0] as any

    // LOAD
    const basic_information_ref01_ent = client.BasicInformation()
    const basic_information_ref01_match_dt0: any = {}
    const basic_information_ref01_data_dt0 = (await basic_information_ref01_ent.load(basic_information_ref01_match_dt0)).data()
    assert(null != basic_information_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/basic_information/BasicInformationTestData.json')

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
    ['basic_information01','basic_information02','basic_information03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_DATA_TEST_BASIC_INFORMATION_ENTID': idmap,
    'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
    'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
    'FINANCIAL_DATA_APIKEY': '',
  })

  idmap = env['FINANCIAL_DATA_TEST_BASIC_INFORMATION_ENTID']

  const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_DATA_TEST_BASIC_INFORMATION_ENTID']
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
  
