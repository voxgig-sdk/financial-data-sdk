<?php
declare(strict_types=1);

// FinancialData SDK utility: result_body

class FinancialDataResultBody
{
    public static function call(FinancialDataContext $ctx): ?FinancialDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
