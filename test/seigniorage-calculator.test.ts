import { calculateExpectedSeig, calculateExpectedSeigWithCommission, Calculator } from '../src'

import { BN } from 'bn.js'
const { toBN } = require('web3-utils')
const chai = require('chai')
chai.use(require('chai-bn')(BN)).should()

const RAY = toBN('1000000000000000000000000000') // 1e+27
const tolerance = toBN('1000000000000000000')

const checkNumber = (
  a: BN,
  b: BN
) => {
  const v = a.sub(b).abs();
  v.should.be.bignumber.lte(tolerance)
}

describe('calculateExpectedSeig function', function () {
  it('should get correct value', function () {
    const fromBlockNumber = new BN('1')
    const toBlockNumber = new BN('10000')
    const userStakedAmount = toBN('1000').mul(RAY)
    const totalStakedAmount = toBN('2000000').mul(RAY)
    const totalSupplyOfTON = toBN('50000000').mul(RAY)
    const pseigRate = toBN('4').mul(RAY).div(toBN('10'))

    const result = calculateExpectedSeig(fromBlockNumber, toBlockNumber, userStakedAmount, totalStakedAmount, totalSupplyOfTON, pseigRate)

    const expected = toBN('8309568960000000000000000000')
    result.should.be.bignumber.equal(expected)
  })
})

describe('calculateExpectedSeigWithCommission function', function () {
  it('should get correct value', function () {
    const result = calculateExpectedSeigWithCommission(
      toBN('1'),
      toBN('10000'),
      toBN('5000').mul(RAY),
      toBN('2000000').mul(RAY),
      toBN('50000000').mul(RAY),
      toBN('4').mul(RAY).div(toBN('10')),
      toBN('7').mul(RAY).div(toBN('10')),
      true,
      toBN('500000').mul(RAY),
      toBN('1000000').mul(RAY),
      false
    )

    const expected = toBN('70631336160001000000000000000')
    checkNumber(result, expected)
  })
})

describe('Calculator class', function () {
  let calculator = new Calculator()
  beforeEach(async function () {
    calculator.setTotalStakedAmount(toBN('2000000').mul(RAY))
  });
  it('should get correct value', function () {
    const fromBlockNumber = new BN('1')
    const toBlockNumber = new BN('10000')
    const userStakedAmount = toBN('1000').mul(RAY)

    const result = calculator.getExpectedSeig(fromBlockNumber, toBlockNumber, userStakedAmount)

    const expected = toBN('8309568960000000000000000000')
    result.should.be.bignumber.equal(expected)
  })
})