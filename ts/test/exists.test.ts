
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FinancialDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FinancialDataSDK.test()
    equal(testsdk instanceof FinancialDataSDK, true,
      'FinancialDataSDK.test() must return a client synchronously')
  })

})
