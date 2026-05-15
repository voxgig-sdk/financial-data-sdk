package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBasicInformationEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewCryptoCurrencyEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewDerivativesDataEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewEsgDataEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewEtfDataEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewEventCalendarEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewFinancialRatioEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewFinancialStatementEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewForexDataEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewInsiderTradingEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewInstitutionalTradingEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewInvestmentAdviserEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewMarketDataEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewMarketIndexEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewMarketNewEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewMiscellaneousDataEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewMutualFundEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

var NewSymbolListEntityFunc func(client *FinancialDataSDK, entopts map[string]any) FinancialDataEntity

