<?php
declare(strict_types=1);

// FinancialData SDK utility: feature_add

class FinancialDataFeatureAdd
{
    public static function call(FinancialDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
