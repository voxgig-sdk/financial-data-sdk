# FinancialData SDK feature factory

from financialdata_sdk.feature.base_feature import FinancialDataBaseFeature
from financialdata_sdk.feature.ratelimit_feature import FinancialDataRatelimitFeature
from financialdata_sdk.feature.retry_feature import FinancialDataRetryFeature
from financialdata_sdk.feature.test_feature import FinancialDataTestFeature
from financialdata_sdk.feature.timeout_feature import FinancialDataTimeoutFeature


_FEATURES = {
    "base": lambda: FinancialDataBaseFeature(),
    "ratelimit": lambda: FinancialDataRatelimitFeature(),
    "retry": lambda: FinancialDataRetryFeature(),
    "test": lambda: FinancialDataTestFeature(),
    "timeout": lambda: FinancialDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
