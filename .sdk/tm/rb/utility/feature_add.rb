# FinancialData SDK utility: feature_add
module FinancialDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
