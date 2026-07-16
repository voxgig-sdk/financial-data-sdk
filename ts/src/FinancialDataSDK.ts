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
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
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


  async direct(fetchargs?: any) {
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



  // Entity access: `client.BasicInformation().list()` / `client.BasicInformation().load({ id })`.
  BasicInformation(data?: any) {
    const self = this
    return new BasicInformationEntity(self,data)
  }


  // Entity access: `client.CryptoCurrency().list()` / `client.CryptoCurrency().load({ id })`.
  CryptoCurrency(data?: any) {
    const self = this
    return new CryptoCurrencyEntity(self,data)
  }


  // Entity access: `client.DerivativesData().list()` / `client.DerivativesData().load({ id })`.
  DerivativesData(data?: any) {
    const self = this
    return new DerivativesDataEntity(self,data)
  }


  // Entity access: `client.EsgData().list()` / `client.EsgData().load({ id })`.
  EsgData(data?: any) {
    const self = this
    return new EsgDataEntity(self,data)
  }


  // Entity access: `client.EtfData().list()` / `client.EtfData().load({ id })`.
  EtfData(data?: any) {
    const self = this
    return new EtfDataEntity(self,data)
  }


  // Entity access: `client.EventCalendar().list()` / `client.EventCalendar().load({ id })`.
  EventCalendar(data?: any) {
    const self = this
    return new EventCalendarEntity(self,data)
  }


  // Entity access: `client.FinancialRatio().list()` / `client.FinancialRatio().load({ id })`.
  FinancialRatio(data?: any) {
    const self = this
    return new FinancialRatioEntity(self,data)
  }


  // Entity access: `client.FinancialStatement().list()` / `client.FinancialStatement().load({ id })`.
  FinancialStatement(data?: any) {
    const self = this
    return new FinancialStatementEntity(self,data)
  }


  // Entity access: `client.ForexData().list()` / `client.ForexData().load({ id })`.
  ForexData(data?: any) {
    const self = this
    return new ForexDataEntity(self,data)
  }


  // Entity access: `client.InsiderTrading().list()` / `client.InsiderTrading().load({ id })`.
  InsiderTrading(data?: any) {
    const self = this
    return new InsiderTradingEntity(self,data)
  }


  // Entity access: `client.InstitutionalTrading().list()` / `client.InstitutionalTrading().load({ id })`.
  InstitutionalTrading(data?: any) {
    const self = this
    return new InstitutionalTradingEntity(self,data)
  }


  // Entity access: `client.InvestmentAdviser().list()` / `client.InvestmentAdviser().load({ id })`.
  InvestmentAdviser(data?: any) {
    const self = this
    return new InvestmentAdviserEntity(self,data)
  }


  // Entity access: `client.MarketData().list()` / `client.MarketData().load({ id })`.
  MarketData(data?: any) {
    const self = this
    return new MarketDataEntity(self,data)
  }


  // Entity access: `client.MarketIndex().list()` / `client.MarketIndex().load({ id })`.
  MarketIndex(data?: any) {
    const self = this
    return new MarketIndexEntity(self,data)
  }


  // Entity access: `client.MarketNew().list()` / `client.MarketNew().load({ id })`.
  MarketNew(data?: any) {
    const self = this
    return new MarketNewEntity(self,data)
  }


  // Entity access: `client.MiscellaneousData().list()` / `client.MiscellaneousData().load({ id })`.
  MiscellaneousData(data?: any) {
    const self = this
    return new MiscellaneousDataEntity(self,data)
  }


  // Entity access: `client.MutualFund().list()` / `client.MutualFund().load({ id })`.
  MutualFund(data?: any) {
    const self = this
    return new MutualFundEntity(self,data)
  }


  // Entity access: `client.SymbolList().list()` / `client.SymbolList().load({ id })`.
  SymbolList(data?: any) {
    const self = this
    return new SymbolListEntity(self,data)
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


