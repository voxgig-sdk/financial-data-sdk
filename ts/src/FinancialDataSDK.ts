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
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

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



  _basic_information?: BasicInformationEntity

  // Idiomatic facade: `client.basic_information.list()` / `client.basic_information.load({ id })`.
  get basic_information(): BasicInformationEntity {
    return (this._basic_information ??= new BasicInformationEntity(this, undefined))
  }

  /** @deprecated Use `client.basic_information` instead. */
  BasicInformation(data?: any) {
    const self = this
    return new BasicInformationEntity(self,data)
  }


  _crypto_currency?: CryptoCurrencyEntity

  // Idiomatic facade: `client.crypto_currency.list()` / `client.crypto_currency.load({ id })`.
  get crypto_currency(): CryptoCurrencyEntity {
    return (this._crypto_currency ??= new CryptoCurrencyEntity(this, undefined))
  }

  /** @deprecated Use `client.crypto_currency` instead. */
  CryptoCurrency(data?: any) {
    const self = this
    return new CryptoCurrencyEntity(self,data)
  }


  _derivatives_data?: DerivativesDataEntity

  // Idiomatic facade: `client.derivatives_data.list()` / `client.derivatives_data.load({ id })`.
  get derivatives_data(): DerivativesDataEntity {
    return (this._derivatives_data ??= new DerivativesDataEntity(this, undefined))
  }

  /** @deprecated Use `client.derivatives_data` instead. */
  DerivativesData(data?: any) {
    const self = this
    return new DerivativesDataEntity(self,data)
  }


  _esg_data?: EsgDataEntity

  // Idiomatic facade: `client.esg_data.list()` / `client.esg_data.load({ id })`.
  get esg_data(): EsgDataEntity {
    return (this._esg_data ??= new EsgDataEntity(this, undefined))
  }

  /** @deprecated Use `client.esg_data` instead. */
  EsgData(data?: any) {
    const self = this
    return new EsgDataEntity(self,data)
  }


  _etf_data?: EtfDataEntity

  // Idiomatic facade: `client.etf_data.list()` / `client.etf_data.load({ id })`.
  get etf_data(): EtfDataEntity {
    return (this._etf_data ??= new EtfDataEntity(this, undefined))
  }

  /** @deprecated Use `client.etf_data` instead. */
  EtfData(data?: any) {
    const self = this
    return new EtfDataEntity(self,data)
  }


  _event_calendar?: EventCalendarEntity

  // Idiomatic facade: `client.event_calendar.list()` / `client.event_calendar.load({ id })`.
  get event_calendar(): EventCalendarEntity {
    return (this._event_calendar ??= new EventCalendarEntity(this, undefined))
  }

  /** @deprecated Use `client.event_calendar` instead. */
  EventCalendar(data?: any) {
    const self = this
    return new EventCalendarEntity(self,data)
  }


  _financial_ratio?: FinancialRatioEntity

  // Idiomatic facade: `client.financial_ratio.list()` / `client.financial_ratio.load({ id })`.
  get financial_ratio(): FinancialRatioEntity {
    return (this._financial_ratio ??= new FinancialRatioEntity(this, undefined))
  }

  /** @deprecated Use `client.financial_ratio` instead. */
  FinancialRatio(data?: any) {
    const self = this
    return new FinancialRatioEntity(self,data)
  }


  _financial_statement?: FinancialStatementEntity

  // Idiomatic facade: `client.financial_statement.list()` / `client.financial_statement.load({ id })`.
  get financial_statement(): FinancialStatementEntity {
    return (this._financial_statement ??= new FinancialStatementEntity(this, undefined))
  }

  /** @deprecated Use `client.financial_statement` instead. */
  FinancialStatement(data?: any) {
    const self = this
    return new FinancialStatementEntity(self,data)
  }


  _forex_data?: ForexDataEntity

  // Idiomatic facade: `client.forex_data.list()` / `client.forex_data.load({ id })`.
  get forex_data(): ForexDataEntity {
    return (this._forex_data ??= new ForexDataEntity(this, undefined))
  }

  /** @deprecated Use `client.forex_data` instead. */
  ForexData(data?: any) {
    const self = this
    return new ForexDataEntity(self,data)
  }


  _insider_trading?: InsiderTradingEntity

  // Idiomatic facade: `client.insider_trading.list()` / `client.insider_trading.load({ id })`.
  get insider_trading(): InsiderTradingEntity {
    return (this._insider_trading ??= new InsiderTradingEntity(this, undefined))
  }

  /** @deprecated Use `client.insider_trading` instead. */
  InsiderTrading(data?: any) {
    const self = this
    return new InsiderTradingEntity(self,data)
  }


  _institutional_trading?: InstitutionalTradingEntity

  // Idiomatic facade: `client.institutional_trading.list()` / `client.institutional_trading.load({ id })`.
  get institutional_trading(): InstitutionalTradingEntity {
    return (this._institutional_trading ??= new InstitutionalTradingEntity(this, undefined))
  }

  /** @deprecated Use `client.institutional_trading` instead. */
  InstitutionalTrading(data?: any) {
    const self = this
    return new InstitutionalTradingEntity(self,data)
  }


  _investment_adviser?: InvestmentAdviserEntity

  // Idiomatic facade: `client.investment_adviser.list()` / `client.investment_adviser.load({ id })`.
  get investment_adviser(): InvestmentAdviserEntity {
    return (this._investment_adviser ??= new InvestmentAdviserEntity(this, undefined))
  }

  /** @deprecated Use `client.investment_adviser` instead. */
  InvestmentAdviser(data?: any) {
    const self = this
    return new InvestmentAdviserEntity(self,data)
  }


  _market_data?: MarketDataEntity

  // Idiomatic facade: `client.market_data.list()` / `client.market_data.load({ id })`.
  get market_data(): MarketDataEntity {
    return (this._market_data ??= new MarketDataEntity(this, undefined))
  }

  /** @deprecated Use `client.market_data` instead. */
  MarketData(data?: any) {
    const self = this
    return new MarketDataEntity(self,data)
  }


  _market_index?: MarketIndexEntity

  // Idiomatic facade: `client.market_index.list()` / `client.market_index.load({ id })`.
  get market_index(): MarketIndexEntity {
    return (this._market_index ??= new MarketIndexEntity(this, undefined))
  }

  /** @deprecated Use `client.market_index` instead. */
  MarketIndex(data?: any) {
    const self = this
    return new MarketIndexEntity(self,data)
  }


  _market_new?: MarketNewEntity

  // Idiomatic facade: `client.market_new.list()` / `client.market_new.load({ id })`.
  get market_new(): MarketNewEntity {
    return (this._market_new ??= new MarketNewEntity(this, undefined))
  }

  /** @deprecated Use `client.market_new` instead. */
  MarketNew(data?: any) {
    const self = this
    return new MarketNewEntity(self,data)
  }


  _miscellaneous_data?: MiscellaneousDataEntity

  // Idiomatic facade: `client.miscellaneous_data.list()` / `client.miscellaneous_data.load({ id })`.
  get miscellaneous_data(): MiscellaneousDataEntity {
    return (this._miscellaneous_data ??= new MiscellaneousDataEntity(this, undefined))
  }

  /** @deprecated Use `client.miscellaneous_data` instead. */
  MiscellaneousData(data?: any) {
    const self = this
    return new MiscellaneousDataEntity(self,data)
  }


  _mutual_fund?: MutualFundEntity

  // Idiomatic facade: `client.mutual_fund.list()` / `client.mutual_fund.load({ id })`.
  get mutual_fund(): MutualFundEntity {
    return (this._mutual_fund ??= new MutualFundEntity(this, undefined))
  }

  /** @deprecated Use `client.mutual_fund` instead. */
  MutualFund(data?: any) {
    const self = this
    return new MutualFundEntity(self,data)
  }


  _symbol_list?: SymbolListEntity

  // Idiomatic facade: `client.symbol_list.list()` / `client.symbol_list.load({ id })`.
  get symbol_list(): SymbolListEntity {
    return (this._symbol_list ??= new SymbolListEntity(this, undefined))
  }

  /** @deprecated Use `client.symbol_list` instead. */
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

  BaseFeature,
  FinancialDataEntityBase,

  FinancialDataSDK,
  SDK,
}


