// Typed models for the FinancialData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BasicInformation {
}

export interface BasicInformationLoadMatch {
  format?: string
  identifier: string
  key: string
}

export interface CryptoCurrency {
}

export interface CryptoCurrencyLoadMatch {
  date?: string
  format?: string
  identifier?: string
  key: string
}

export interface DerivativesData {
}

export interface DerivativesDataLoadMatch {
  format?: string
  identifier?: string
  key: string
}

export interface EsgData {
}

export interface EsgDataLoadMatch {
  format?: string
  identifier?: string
  key: string
}

export interface EtfData {
}

export interface EtfDataLoadMatch {
  format?: string
  identifier: string
  key: string
}

export interface EventCalendar {
}

export interface EventCalendarLoadMatch {
  format?: string
  key: string
}

export interface FinancialRatio {
}

export interface FinancialRatioLoadMatch {
  format?: string
  identifier: string
  key: string
}

export interface FinancialStatement {
}

export interface FinancialStatementLoadMatch {
  format?: string
  identifier: string
  key: string
}

export interface ForexData {
}

export interface ForexDataLoadMatch {
  date?: string
  format?: string
  identifier?: string
  key: string
}

export interface InsiderTrading {
}

export interface InsiderTradingLoadMatch {
  format?: string
  identifier?: string
  key: string
}

export interface InstitutionalTrading {
}

export interface InstitutionalTradingLoadMatch {
  format?: string
  identifier?: string
  key: string
}

export interface InvestmentAdviser {
}

export interface InvestmentAdviserLoadMatch {
  format?: string
  key: string
}

export interface MarketData {
  change?: number
  close?: number
  date?: string
  high?: number
  low?: number
  open?: number
  percentage_change?: number
  price?: number
  registrant_name?: string
  time?: string
  trading_symbol?: string
  volume?: number
}

export interface MarketDataLoadMatch {
  format?: string
  identifier: string
  key: string
  offset?: number
}

export interface MarketDataListMatch {
  date?: string
  format?: string
  identifier: string
  key: string
  offset?: number
}

export interface MarketIndex {
}

export interface MarketIndexLoadMatch {
  format?: string
  identifier?: string
  key: string
  offset?: number
}

export interface MarketNew {
}

export interface MarketNewLoadMatch {
  format?: string
  identifier?: string
  key: string
}

export interface MiscellaneousData {
}

export interface MiscellaneousDataLoadMatch {
  format?: string
  identifier?: string
  key: string
}

export interface MutualFund {
}

export interface MutualFundLoadMatch {
  format?: string
  identifier?: string
  key: string
}

export interface SymbolList {
  description?: string
  registrant_name?: string
  title_of_security?: string
  trading_symbol?: string
}

export interface SymbolListListMatch {
  format?: string
  key: string
  offset?: number
}

