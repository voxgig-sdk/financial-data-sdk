# ProjectName SDK exists test

import pytest
from financialdata_sdk import FinancialDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FinancialDataSDK.test(None, None)
        assert testsdk is not None
