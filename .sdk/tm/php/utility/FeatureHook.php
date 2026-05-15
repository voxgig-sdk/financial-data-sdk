<?php
declare(strict_types=1);

// FinancialData SDK utility: feature_hook

class FinancialDataFeatureHook
{
    public static function call(FinancialDataContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
