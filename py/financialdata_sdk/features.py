# FinancialData SDK feature factory

from financialdata_sdk.feature.base_feature import FinancialDataBaseFeature
from financialdata_sdk.feature.test_feature import FinancialDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FinancialDataBaseFeature(),
        "test": lambda: FinancialDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
