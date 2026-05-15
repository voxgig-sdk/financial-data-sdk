
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FinancialDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FinancialDataSDK.test()
    equal(null !== testsdk, true)
  })

})
