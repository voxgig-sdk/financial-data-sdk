
import { Context } from './Context'


class FinancialDataError extends Error {

  isFinancialDataError = true

  sdk = 'FinancialData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FinancialDataError
}

