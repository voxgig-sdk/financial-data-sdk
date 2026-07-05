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

/** Request payload for BasicInformation#load. */
class BasicInformationLoadMatch
{
}

/** CryptoCurrency entity data model. */
class CryptoCurrency
{
}

/** Request payload for CryptoCurrency#load. */
class CryptoCurrencyLoadMatch
{
}

/** DerivativesData entity data model. */
class DerivativesData
{
}

/** Request payload for DerivativesData#load. */
class DerivativesDataLoadMatch
{
}

/** EsgData entity data model. */
class EsgData
{
}

/** Request payload for EsgData#load. */
class EsgDataLoadMatch
{
}

/** EtfData entity data model. */
class EtfData
{
}

/** Request payload for EtfData#load. */
class EtfDataLoadMatch
{
}

/** EventCalendar entity data model. */
class EventCalendar
{
}

/** Request payload for EventCalendar#load. */
class EventCalendarLoadMatch
{
}

/** FinancialRatio entity data model. */
class FinancialRatio
{
}

/** Request payload for FinancialRatio#load. */
class FinancialRatioLoadMatch
{
}

/** FinancialStatement entity data model. */
class FinancialStatement
{
}

/** Request payload for FinancialStatement#load. */
class FinancialStatementLoadMatch
{
}

/** ForexData entity data model. */
class ForexData
{
}

/** Request payload for ForexData#load. */
class ForexDataLoadMatch
{
}

/** InsiderTrading entity data model. */
class InsiderTrading
{
}

/** Request payload for InsiderTrading#load. */
class InsiderTradingLoadMatch
{
}

/** InstitutionalTrading entity data model. */
class InstitutionalTrading
{
}

/** Request payload for InstitutionalTrading#load. */
class InstitutionalTradingLoadMatch
{
}

/** InvestmentAdviser entity data model. */
class InvestmentAdviser
{
}

/** Request payload for InvestmentAdviser#load. */
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

/** Request payload for MarketData#load. */
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

/** Request payload for MarketData#list. */
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

/** Request payload for MarketIndex#load. */
class MarketIndexLoadMatch
{
}

/** MarketNew entity data model. */
class MarketNew
{
}

/** Request payload for MarketNew#load. */
class MarketNewLoadMatch
{
}

/** MiscellaneousData entity data model. */
class MiscellaneousData
{
}

/** Request payload for MiscellaneousData#load. */
class MiscellaneousDataLoadMatch
{
}

/** MutualFund entity data model. */
class MutualFund
{
}

/** Request payload for MutualFund#load. */
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

/** Request payload for SymbolList#list. */
class SymbolListListMatch
{
    public ?string $description = null;
    public ?string $registrant_name = null;
    public ?string $title_of_security = null;
    public ?string $trading_symbol = null;
}

