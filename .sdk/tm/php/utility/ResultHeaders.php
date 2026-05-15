<?php
declare(strict_types=1);

// FinancialData SDK utility: result_headers

class FinancialDataResultHeaders
{
    public static function call(FinancialDataContext $ctx): ?FinancialDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
