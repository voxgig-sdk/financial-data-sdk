<?php
declare(strict_types=1);

// FinancialData SDK exists test

require_once __DIR__ . '/../financialdata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FinancialDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
