<?php
declare(strict_types=1);

// FinancialData SDK utility: prepare_body

class FinancialDataPrepareBody
{
    public static function call(FinancialDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
