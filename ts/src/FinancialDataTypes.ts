// Typed models for the FinancialData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BasicInformation {
}

export type BasicInformationLoadMatch = Partial<BasicInformation>

export interface CryptoCurrency {
}

export type CryptoCurrencyLoadMatch = Partial<CryptoCurrency>

export interface DerivativesData {
}

export type DerivativesDataLoadMatch = Partial<DerivativesData>

export interface EsgData {
}

export type EsgDataLoadMatch = Partial<EsgData>

export interface EtfData {
}

export type EtfDataLoadMatch = Partial<EtfData>

export interface EventCalendar {
}

export type EventCalendarLoadMatch = Partial<EventCalendar>

export interface FinancialRatio {
}

export type FinancialRatioLoadMatch = Partial<FinancialRatio>

export interface FinancialStatement {
}

export type FinancialStatementLoadMatch = Partial<FinancialStatement>

export interface ForexData {
}

export type ForexDataLoadMatch = Partial<ForexData>

export interface InsiderTrading {
}

export type InsiderTradingLoadMatch = Partial<InsiderTrading>

export interface InstitutionalTrading {
}

export type InstitutionalTradingLoadMatch = Partial<InstitutionalTrading>

export interface InvestmentAdviser {
}

export type InvestmentAdviserLoadMatch = Partial<InvestmentAdviser>

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

export type MarketDataLoadMatch = Partial<MarketData>

export type MarketDataListMatch = Partial<MarketData>

export interface MarketIndex {
}

export type MarketIndexLoadMatch = Partial<MarketIndex>

export interface MarketNew {
}

export type MarketNewLoadMatch = Partial<MarketNew>

export interface MiscellaneousData {
}

export type MiscellaneousDataLoadMatch = Partial<MiscellaneousData>

export interface MutualFund {
}

export type MutualFundLoadMatch = Partial<MutualFund>

export interface SymbolList {
  description?: string
  registrant_name?: string
  title_of_security?: string
  trading_symbol?: string
}

export type SymbolListListMatch = Partial<SymbolList>

