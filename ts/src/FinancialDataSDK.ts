// FinancialData Ts SDK

import { BasicInformationEntity } from './entity/BasicInformationEntity'
import { CryptoCurrencyEntity } from './entity/CryptoCurrencyEntity'
import { DerivativesDataEntity } from './entity/DerivativesDataEntity'
import { EsgDataEntity } from './entity/EsgDataEntity'
import { EtfDataEntity } from './entity/EtfDataEntity'
import { EventCalendarEntity } from './entity/EventCalendarEntity'
import { FinancialRatioEntity } from './entity/FinancialRatioEntity'
import { FinancialStatementEntity } from './entity/FinancialStatementEntity'
import { ForexDataEntity } from './entity/ForexDataEntity'
import { InsiderTradingEntity } from './entity/InsiderTradingEntity'
import { InstitutionalTradingEntity } from './entity/InstitutionalTradingEntity'
import { InvestmentAdviserEntity } from './entity/InvestmentAdviserEntity'
import { MarketDataEntity } from './entity/MarketDataEntity'
import { MarketIndexEntity } from './entity/MarketIndexEntity'
import { MarketNewEntity } from './entity/MarketNewEntity'
import { MiscellaneousDataEntity } from './entity/MiscellaneousDataEntity'
import { MutualFundEntity } from './entity/MutualFundEntity'
import { SymbolListEntity } from './entity/SymbolListEntity'

export type * from './FinancialDataTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { FinancialDataEntityBase } from './FinancialDataEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class FinancialDataSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('FinancialDataSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Raw GraphQL access: the pressure valve that makes the generated
  // surface's deliberate omissions (per-call selection sets, typed filter
  // builders, batching, subscriptions) livable — the whole schema stays
  // reachable.
  //
  // Thin wrapper over the same prepare/fetch path `direct` uses, with the
  // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
  // HTTP 200 as a top-level `errors` array, so status alone would report a
  // failed query as ok.
  //
  // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
  // ratelimit or paging features apply.
  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('FinancialDataSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('FinancialDataSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.BasicInformation().list()` / `client.BasicInformation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BasicInformation(entopts?: Record<string, any>) {
    const self = this
    return new BasicInformationEntity(self, entopts)
  }


  // Entity access: `client.CryptoCurrency().list()` / `client.CryptoCurrency().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CryptoCurrency(entopts?: Record<string, any>) {
    const self = this
    return new CryptoCurrencyEntity(self, entopts)
  }


  // Entity access: `client.DerivativesData().list()` / `client.DerivativesData().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DerivativesData(entopts?: Record<string, any>) {
    const self = this
    return new DerivativesDataEntity(self, entopts)
  }


  // Entity access: `client.EsgData().list()` / `client.EsgData().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EsgData(entopts?: Record<string, any>) {
    const self = this
    return new EsgDataEntity(self, entopts)
  }


  // Entity access: `client.EtfData().list()` / `client.EtfData().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EtfData(entopts?: Record<string, any>) {
    const self = this
    return new EtfDataEntity(self, entopts)
  }


  // Entity access: `client.EventCalendar().list()` / `client.EventCalendar().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  EventCalendar(entopts?: Record<string, any>) {
    const self = this
    return new EventCalendarEntity(self, entopts)
  }


  // Entity access: `client.FinancialRatio().list()` / `client.FinancialRatio().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FinancialRatio(entopts?: Record<string, any>) {
    const self = this
    return new FinancialRatioEntity(self, entopts)
  }


  // Entity access: `client.FinancialStatement().list()` / `client.FinancialStatement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FinancialStatement(entopts?: Record<string, any>) {
    const self = this
    return new FinancialStatementEntity(self, entopts)
  }


  // Entity access: `client.ForexData().list()` / `client.ForexData().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ForexData(entopts?: Record<string, any>) {
    const self = this
    return new ForexDataEntity(self, entopts)
  }


  // Entity access: `client.InsiderTrading().list()` / `client.InsiderTrading().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InsiderTrading(entopts?: Record<string, any>) {
    const self = this
    return new InsiderTradingEntity(self, entopts)
  }


  // Entity access: `client.InstitutionalTrading().list()` / `client.InstitutionalTrading().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InstitutionalTrading(entopts?: Record<string, any>) {
    const self = this
    return new InstitutionalTradingEntity(self, entopts)
  }


  // Entity access: `client.InvestmentAdviser().list()` / `client.InvestmentAdviser().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InvestmentAdviser(entopts?: Record<string, any>) {
    const self = this
    return new InvestmentAdviserEntity(self, entopts)
  }


  // Entity access: `client.MarketData().list()` / `client.MarketData().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MarketData(entopts?: Record<string, any>) {
    const self = this
    return new MarketDataEntity(self, entopts)
  }


  // Entity access: `client.MarketIndex().list()` / `client.MarketIndex().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MarketIndex(entopts?: Record<string, any>) {
    const self = this
    return new MarketIndexEntity(self, entopts)
  }


  // Entity access: `client.MarketNew().list()` / `client.MarketNew().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MarketNew(entopts?: Record<string, any>) {
    const self = this
    return new MarketNewEntity(self, entopts)
  }


  // Entity access: `client.MiscellaneousData().list()` / `client.MiscellaneousData().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MiscellaneousData(entopts?: Record<string, any>) {
    const self = this
    return new MiscellaneousDataEntity(self, entopts)
  }


  // Entity access: `client.MutualFund().list()` / `client.MutualFund().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MutualFund(entopts?: Record<string, any>) {
    const self = this
    return new MutualFundEntity(self, entopts)
  }


  // Entity access: `client.SymbolList().list()` / `client.SymbolList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SymbolList(entopts?: Record<string, any>) {
    const self = this
    return new SymbolListEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new FinancialDataSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return FinancialDataSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'FinancialData' }
  }

  toString() {
    return 'FinancialData ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = FinancialDataSDK


export {
  stdutil,
  config,

  BaseFeature,
  FinancialDataEntityBase,

  FinancialDataSDK,
  SDK,
}


