<?php
declare(strict_types=1);

// FinancialData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FinancialDataMakeContext
{
    public static function call(array $ctxmap, ?FinancialDataContext $basectx): FinancialDataContext
    {
        return new FinancialDataContext($ctxmap, $basectx);
    }
}
