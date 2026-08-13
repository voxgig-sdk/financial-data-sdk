# FinancialData SDK utility: make_context

from projectname_sdk.core.context import FinancialDataContext


def make_context_util(ctxmap, basectx):
    return FinancialDataContext(ctxmap, basectx)
