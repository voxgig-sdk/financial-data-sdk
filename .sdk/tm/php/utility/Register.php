<?php
declare(strict_types=1);

// FinancialData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FinancialDataUtility::setRegistrar(function (FinancialDataUtility $u): void {
    $u->clean = [FinancialDataClean::class, 'call'];
    $u->done = [FinancialDataDone::class, 'call'];
    $u->make_error = [FinancialDataMakeError::class, 'call'];
    $u->feature_add = [FinancialDataFeatureAdd::class, 'call'];
    $u->feature_hook = [FinancialDataFeatureHook::class, 'call'];
    $u->feature_init = [FinancialDataFeatureInit::class, 'call'];
    $u->fetcher = [FinancialDataFetcher::class, 'call'];
    $u->make_fetch_def = [FinancialDataMakeFetchDef::class, 'call'];
    $u->make_context = [FinancialDataMakeContext::class, 'call'];
    $u->make_options = [FinancialDataMakeOptions::class, 'call'];
    $u->make_request = [FinancialDataMakeRequest::class, 'call'];
    $u->make_response = [FinancialDataMakeResponse::class, 'call'];
    $u->make_result = [FinancialDataMakeResult::class, 'call'];
    $u->make_point = [FinancialDataMakePoint::class, 'call'];
    $u->make_spec = [FinancialDataMakeSpec::class, 'call'];
    $u->make_url = [FinancialDataMakeUrl::class, 'call'];
    $u->param = [FinancialDataParam::class, 'call'];
    $u->prepare_auth = [FinancialDataPrepareAuth::class, 'call'];
    $u->prepare_body = [FinancialDataPrepareBody::class, 'call'];
    $u->prepare_headers = [FinancialDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [FinancialDataPrepareMethod::class, 'call'];
    $u->prepare_params = [FinancialDataPrepareParams::class, 'call'];
    $u->prepare_path = [FinancialDataPreparePath::class, 'call'];
    $u->prepare_query = [FinancialDataPrepareQuery::class, 'call'];
    $u->result_basic = [FinancialDataResultBasic::class, 'call'];
    $u->result_body = [FinancialDataResultBody::class, 'call'];
    $u->result_headers = [FinancialDataResultHeaders::class, 'call'];
    $u->transform_request = [FinancialDataTransformRequest::class, 'call'];
    $u->transform_response = [FinancialDataTransformResponse::class, 'call'];
});
