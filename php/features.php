<?php
declare(strict_types=1);

// FinancialData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FinancialDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FinancialDataBaseFeature();
            case "test":
                return new FinancialDataTestFeature();
            default:
                return new FinancialDataBaseFeature();
        }
    }
}
