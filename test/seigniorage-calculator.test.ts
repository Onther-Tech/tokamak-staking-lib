import { calculateExpectedSeig, Calculator } from '../src'

import { BN } from 'bn.js'
const { createCurrency, createCurrencyRatio } = require('@makerdao/currency')
const { toBN } = require('web3-utils')
const chai = require('chai')
chai.use(require('chai-bn')(BN)).should()

const _TON = createCurrency('TON')
const _WTON = createCurrency('WTON')

const TON_UNIT = 'wei'
const WTON_UNIT = 'ray'

const RAY = _WTON('1').toFixed(WTON_UNIT)


describe('calculateExpectedSeig function', function () {
  it('should get correct value', function () {
    const fromBlockNumber = new BN('1')
    const toBlockNumber = new BN('10000')
    const userStakedAmount = toBN(_WTON('1000').toFixed(WTON_UNIT))
    const totalStakedAmount = toBN(_WTON('2000000').toFixed(WTON_UNIT))
    const totalSupplyOfTON = toBN(_WTON('50000000').toFixed(WTON_UNIT))
    const pseigRate = toBN(_WTON('0.4').toFixed(WTON_UNIT))

    const result = calculateExpectedSeig(fromBlockNumber, toBlockNumber, userStakedAmount, totalStakedAmount, totalSupplyOfTON, pseigRate)

    const expected = toBN(_WTON('8.30956896').toFixed(WTON_UNIT))
    result.should.be.bignumber.equal(expected)
  })
})

describe('Calculator class', function () {
  let calculator = new Calculator()
  beforeEach(async function () {
    calculator.setTotalStakedAmount(toBN(_WTON('2000000').toFixed(WTON_UNIT)));
  });
  it('should get correct value', function () {
    const fromBlockNumber = new BN('1')
    const toBlockNumber = new BN('10000')
    const userStakedAmount = toBN(_WTON('1000').toFixed(WTON_UNIT))

    const result = calculator.getExpectedSeig(fromBlockNumber, toBlockNumber, userStakedAmount)

    const expected = toBN(_WTON('8.30956896').toFixed(WTON_UNIT))
    result.should.be.bignumber.equal(expected)
  })
})