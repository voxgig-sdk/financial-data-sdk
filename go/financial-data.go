package voxgigfinancialdatasdk

import (
	"github.com/voxgig-sdk/financial-data-sdk/core"
	"github.com/voxgig-sdk/financial-data-sdk/entity"
	"github.com/voxgig-sdk/financial-data-sdk/feature"
	_ "github.com/voxgig-sdk/financial-data-sdk/utility"
)

// Type aliases preserve external API.
type FinancialDataSDK = core.FinancialDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FinancialDataEntity = core.FinancialDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FinancialDataError = core.FinancialDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBasicInformationEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewBasicInformationEntity(client, entopts)
	}
	core.NewCryptoCurrencyEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewCryptoCurrencyEntity(client, entopts)
	}
	core.NewDerivativesDataEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewDerivativesDataEntity(client, entopts)
	}
	core.NewEsgDataEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewEsgDataEntity(client, entopts)
	}
	core.NewEtfDataEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewEtfDataEntity(client, entopts)
	}
	core.NewEventCalendarEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewEventCalendarEntity(client, entopts)
	}
	core.NewFinancialRatioEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewFinancialRatioEntity(client, entopts)
	}
	core.NewFinancialStatementEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewFinancialStatementEntity(client, entopts)
	}
	core.NewForexDataEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewForexDataEntity(client, entopts)
	}
	core.NewInsiderTradingEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewInsiderTradingEntity(client, entopts)
	}
	core.NewInstitutionalTradingEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewInstitutionalTradingEntity(client, entopts)
	}
	core.NewInvestmentAdviserEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewInvestmentAdviserEntity(client, entopts)
	}
	core.NewMarketDataEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewMarketDataEntity(client, entopts)
	}
	core.NewMarketIndexEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewMarketIndexEntity(client, entopts)
	}
	core.NewMarketNewEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewMarketNewEntity(client, entopts)
	}
	core.NewMiscellaneousDataEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewMiscellaneousDataEntity(client, entopts)
	}
	core.NewMutualFundEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewMutualFundEntity(client, entopts)
	}
	core.NewSymbolListEntityFunc = func(client *core.FinancialDataSDK, entopts map[string]any) core.FinancialDataEntity {
		return entity.NewSymbolListEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFinancialDataSDK = core.NewFinancialDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
