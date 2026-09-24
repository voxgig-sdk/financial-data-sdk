

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


describe('InvestmentAdviserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialDataSDK.test()
    const ent = testsdk.InvestmentAdviser()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'investment_adviser.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"investment_adviser","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /investment-adviser-information","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/investment-adviser-information","q":{"exist":["format","key"]},"r":{},"s":[{"lit":"investment-adviser-information"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /investment-adviser-names","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"json","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"key","or":"key","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/investment-adviser-names","q":{"exist":["format","key"]},"r":{},"s":[{"lit":"investment-adviser-names"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"investment_adviser","name__orig":"investment_adviser","Name":"InvestmentAdviser","name_":"investment_adviser","name-":"investment-adviser","NAME":"INVESTMENT_ADVISER","index$":11}, {"active":true,"entity":"investment_adviser","key$":"BasicInvestmentAdviserFlow","kind":"basic","name":"BasicInvestmentAdviserFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"investment_adviser_ref01","srcdatavar":"investment_adviser_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-investment_adviser_ref01"}}],"index$":0}]}, 'InvestmentAdviser', {"GET /investment-adviser-information":{"protocol":"http","operationId":"getInvestmentAdviserInformation","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":0},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}},"GET /investment-adviser-names":{"protocol":"http","operationId":"getInvestmentAdviserNames","responses":{"200":{"description":"Successful response"}},"parameters":[{"name":"format","in":"query","description":"The format of the returned data.","required":false,"schema":{"type":"string","enum":["json","csv"],"default":"json"},"index$":0},{"name":"key","in":"query","description":"API key for authentication","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"key","description":"API key for authentication. Append ?key=API_KEY to each request URL or &key=API_KEY if other query parameters exist."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let investment_adviser_ref01_data = Object.values(setup.data.existing.investment_adviser)[0] as any

    // LOAD
    const investment_adviser_ref01_ent = client.InvestmentAdviser()
    const investment_adviser_ref01_match_dt0: any = {}
    const investment_adviser_ref01_data_dt0 = (await investment_adviser_ref01_ent.load(investment_adviser_ref01_match_dt0)).data()
    assert(null != investment_adviser_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/investment_adviser/InvestmentAdviserTestData.json')

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
    ['investment_adviser01','investment_adviser02','investment_adviser03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_DATA_TEST_INVESTMENT_ADVISER_ENTID': idmap,
    'FINANCIAL_DATA_TEST_LIVE': 'FALSE',
    'FINANCIAL_DATA_TEST_EXPLAIN': 'FALSE',
    'FINANCIAL_DATA_APIKEY': '',
  })

  idmap = env['FINANCIAL_DATA_TEST_INVESTMENT_ADVISER_ENTID']

  const live = 'TRUE' === env.FINANCIAL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_DATA_TEST_INVESTMENT_ADVISER_ENTID']
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
  
