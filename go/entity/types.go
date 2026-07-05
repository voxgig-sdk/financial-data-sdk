// Typed models for the FinancialData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// BasicInformation is the typed data model for the basic_information entity.
type BasicInformation struct {
}

// BasicInformationLoadMatch is the typed request payload for BasicInformation.LoadTyped.
type BasicInformationLoadMatch struct {
}

// CryptoCurrency is the typed data model for the crypto_currency entity.
type CryptoCurrency struct {
}

// CryptoCurrencyLoadMatch is the typed request payload for CryptoCurrency.LoadTyped.
type CryptoCurrencyLoadMatch struct {
}

// DerivativesData is the typed data model for the derivatives_data entity.
type DerivativesData struct {
}

// DerivativesDataLoadMatch is the typed request payload for DerivativesData.LoadTyped.
type DerivativesDataLoadMatch struct {
}

// EsgData is the typed data model for the esg_data entity.
type EsgData struct {
}

// EsgDataLoadMatch is the typed request payload for EsgData.LoadTyped.
type EsgDataLoadMatch struct {
}

// EtfData is the typed data model for the etf_data entity.
type EtfData struct {
}

// EtfDataLoadMatch is the typed request payload for EtfData.LoadTyped.
type EtfDataLoadMatch struct {
}

// EventCalendar is the typed data model for the event_calendar entity.
type EventCalendar struct {
}

// EventCalendarLoadMatch is the typed request payload for EventCalendar.LoadTyped.
type EventCalendarLoadMatch struct {
}

// FinancialRatio is the typed data model for the financial_ratio entity.
type FinancialRatio struct {
}

// FinancialRatioLoadMatch is the typed request payload for FinancialRatio.LoadTyped.
type FinancialRatioLoadMatch struct {
}

// FinancialStatement is the typed data model for the financial_statement entity.
type FinancialStatement struct {
}

// FinancialStatementLoadMatch is the typed request payload for FinancialStatement.LoadTyped.
type FinancialStatementLoadMatch struct {
}

// ForexData is the typed data model for the forex_data entity.
type ForexData struct {
}

// ForexDataLoadMatch is the typed request payload for ForexData.LoadTyped.
type ForexDataLoadMatch struct {
}

// InsiderTrading is the typed data model for the insider_trading entity.
type InsiderTrading struct {
}

// InsiderTradingLoadMatch is the typed request payload for InsiderTrading.LoadTyped.
type InsiderTradingLoadMatch struct {
}

// InstitutionalTrading is the typed data model for the institutional_trading entity.
type InstitutionalTrading struct {
}

// InstitutionalTradingLoadMatch is the typed request payload for InstitutionalTrading.LoadTyped.
type InstitutionalTradingLoadMatch struct {
}

// InvestmentAdviser is the typed data model for the investment_adviser entity.
type InvestmentAdviser struct {
}

// InvestmentAdviserLoadMatch is the typed request payload for InvestmentAdviser.LoadTyped.
type InvestmentAdviserLoadMatch struct {
}

// MarketData is the typed data model for the market_data entity.
type MarketData struct {
	Change *float64 `json:"change,omitempty"`
	Close *float64 `json:"close,omitempty"`
	Date *string `json:"date,omitempty"`
	High *float64 `json:"high,omitempty"`
	Low *float64 `json:"low,omitempty"`
	Open *float64 `json:"open,omitempty"`
	PercentageChange *float64 `json:"percentage_change,omitempty"`
	Price *float64 `json:"price,omitempty"`
	RegistrantName *string `json:"registrant_name,omitempty"`
	Time *string `json:"time,omitempty"`
	TradingSymbol *string `json:"trading_symbol,omitempty"`
	Volume *float64 `json:"volume,omitempty"`
}

// MarketDataLoadMatch is the typed request payload for MarketData.LoadTyped.
type MarketDataLoadMatch struct {
	Change *float64 `json:"change,omitempty"`
	Close *float64 `json:"close,omitempty"`
	Date *string `json:"date,omitempty"`
	High *float64 `json:"high,omitempty"`
	Low *float64 `json:"low,omitempty"`
	Open *float64 `json:"open,omitempty"`
	PercentageChange *float64 `json:"percentage_change,omitempty"`
	Price *float64 `json:"price,omitempty"`
	RegistrantName *string `json:"registrant_name,omitempty"`
	Time *string `json:"time,omitempty"`
	TradingSymbol *string `json:"trading_symbol,omitempty"`
	Volume *float64 `json:"volume,omitempty"`
}

// MarketDataListMatch is the typed request payload for MarketData.ListTyped.
type MarketDataListMatch struct {
	Change *float64 `json:"change,omitempty"`
	Close *float64 `json:"close,omitempty"`
	Date *string `json:"date,omitempty"`
	High *float64 `json:"high,omitempty"`
	Low *float64 `json:"low,omitempty"`
	Open *float64 `json:"open,omitempty"`
	PercentageChange *float64 `json:"percentage_change,omitempty"`
	Price *float64 `json:"price,omitempty"`
	RegistrantName *string `json:"registrant_name,omitempty"`
	Time *string `json:"time,omitempty"`
	TradingSymbol *string `json:"trading_symbol,omitempty"`
	Volume *float64 `json:"volume,omitempty"`
}

// MarketIndex is the typed data model for the market_index entity.
type MarketIndex struct {
}

// MarketIndexLoadMatch is the typed request payload for MarketIndex.LoadTyped.
type MarketIndexLoadMatch struct {
}

// MarketNew is the typed data model for the market_new entity.
type MarketNew struct {
}

// MarketNewLoadMatch is the typed request payload for MarketNew.LoadTyped.
type MarketNewLoadMatch struct {
}

// MiscellaneousData is the typed data model for the miscellaneous_data entity.
type MiscellaneousData struct {
}

// MiscellaneousDataLoadMatch is the typed request payload for MiscellaneousData.LoadTyped.
type MiscellaneousDataLoadMatch struct {
}

// MutualFund is the typed data model for the mutual_fund entity.
type MutualFund struct {
}

// MutualFundLoadMatch is the typed request payload for MutualFund.LoadTyped.
type MutualFundLoadMatch struct {
}

// SymbolList is the typed data model for the symbol_list entity.
type SymbolList struct {
	Description *string `json:"description,omitempty"`
	RegistrantName *string `json:"registrant_name,omitempty"`
	TitleOfSecurity *string `json:"title_of_security,omitempty"`
	TradingSymbol *string `json:"trading_symbol,omitempty"`
}

// SymbolListListMatch is the typed request payload for SymbolList.ListTyped.
type SymbolListListMatch struct {
	Description *string `json:"description,omitempty"`
	RegistrantName *string `json:"registrant_name,omitempty"`
	TitleOfSecurity *string `json:"title_of_security,omitempty"`
	TradingSymbol *string `json:"trading_symbol,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
