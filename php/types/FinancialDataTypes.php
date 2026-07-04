<?php
declare(strict_types=1);

// Typed models for the FinancialData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BasicInformation entity data model. */
class BasicInformation
{
}

/** Match filter for BasicInformation#load (any subset of BasicInformation fields). */
class BasicInformationLoadMatch
{
}

/** CryptoCurrency entity data model. */
class CryptoCurrency
{
}

/** Match filter for CryptoCurrency#load (any subset of CryptoCurrency fields). */
class CryptoCurrencyLoadMatch
{
}

/** DerivativesData entity data model. */
class DerivativesData
{
}

/** Match filter for DerivativesData#load (any subset of DerivativesData fields). */
class DerivativesDataLoadMatch
{
}

/** EsgData entity data model. */
class EsgData
{
}

/** Match filter for EsgData#load (any subset of EsgData fields). */
class EsgDataLoadMatch
{
}

/** EtfData entity data model. */
class EtfData
{
}

/** Match filter for EtfData#load (any subset of EtfData fields). */
class EtfDataLoadMatch
{
}

/** EventCalendar entity data model. */
class EventCalendar
{
}

/** Match filter for EventCalendar#load (any subset of EventCalendar fields). */
class EventCalendarLoadMatch
{
}

/** FinancialRatio entity data model. */
class FinancialRatio
{
}

/** Match filter for FinancialRatio#load (any subset of FinancialRatio fields). */
class FinancialRatioLoadMatch
{
}

/** FinancialStatement entity data model. */
class FinancialStatement
{
}

/** Match filter for FinancialStatement#load (any subset of FinancialStatement fields). */
class FinancialStatementLoadMatch
{
}

/** ForexData entity data model. */
class ForexData
{
}

/** Match filter for ForexData#load (any subset of ForexData fields). */
class ForexDataLoadMatch
{
}

/** InsiderTrading entity data model. */
class InsiderTrading
{
}

/** Match filter for InsiderTrading#load (any subset of InsiderTrading fields). */
class InsiderTradingLoadMatch
{
}

/** InstitutionalTrading entity data model. */
class InstitutionalTrading
{
}

/** Match filter for InstitutionalTrading#load (any subset of InstitutionalTrading fields). */
class InstitutionalTradingLoadMatch
{
}

/** InvestmentAdviser entity data model. */
class InvestmentAdviser
{
}

/** Match filter for InvestmentAdviser#load (any subset of InvestmentAdviser fields). */
class InvestmentAdviserLoadMatch
{
}

/** MarketData entity data model. */
class MarketData
{
    public ?float $change = null;
    public ?float $close = null;
    public ?string $date = null;
    public ?float $high = null;
    public ?float $low = null;
    public ?float $open = null;
    public ?float $percentage_change = null;
    public ?float $price = null;
    public ?string $registrant_name = null;
    public ?string $time = null;
    public ?string $trading_symbol = null;
    public ?float $volume = null;
}

/** Match filter for MarketData#load (any subset of MarketData fields). */
class MarketDataLoadMatch
{
    public ?float $change = null;
    public ?float $close = null;
    public ?string $date = null;
    public ?float $high = null;
    public ?float $low = null;
    public ?float $open = null;
    public ?float $percentage_change = null;
    public ?float $price = null;
    public ?string $registrant_name = null;
    public ?string $time = null;
    public ?string $trading_symbol = null;
    public ?float $volume = null;
}

/** Match filter for MarketData#list (any subset of MarketData fields). */
class MarketDataListMatch
{
    public ?float $change = null;
    public ?float $close = null;
    public ?string $date = null;
    public ?float $high = null;
    public ?float $low = null;
    public ?float $open = null;
    public ?float $percentage_change = null;
    public ?float $price = null;
    public ?string $registrant_name = null;
    public ?string $time = null;
    public ?string $trading_symbol = null;
    public ?float $volume = null;
}

/** MarketIndex entity data model. */
class MarketIndex
{
}

/** Match filter for MarketIndex#load (any subset of MarketIndex fields). */
class MarketIndexLoadMatch
{
}

/** MarketNew entity data model. */
class MarketNew
{
}

/** Match filter for MarketNew#load (any subset of MarketNew fields). */
class MarketNewLoadMatch
{
}

/** MiscellaneousData entity data model. */
class MiscellaneousData
{
}

/** Match filter for MiscellaneousData#load (any subset of MiscellaneousData fields). */
class MiscellaneousDataLoadMatch
{
}

/** MutualFund entity data model. */
class MutualFund
{
}

/** Match filter for MutualFund#load (any subset of MutualFund fields). */
class MutualFundLoadMatch
{
}

/** SymbolList entity data model. */
class SymbolList
{
    public ?string $description = null;
    public ?string $registrant_name = null;
    public ?string $title_of_security = null;
    public ?string $trading_symbol = null;
}

/** Match filter for SymbolList#list (any subset of SymbolList fields). */
class SymbolListListMatch
{
    public ?string $description = null;
    public ?string $registrant_name = null;
    public ?string $title_of_security = null;
    public ?string $trading_symbol = null;
}

