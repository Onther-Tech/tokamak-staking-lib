import { BN } from 'bn.js'
const { createCurrency, createCurrencyRatio } = require('@makerdao/currency')
const { toBN } = require('web3-utils')

const _TON = createCurrency('TON')
const _WTON = createCurrency('WTON')
const _WTON_TON = createCurrencyRatio(_WTON, _TON);

const TON_UNIT = 'wei'
const WTON_UNIT = 'ray'
const WTON_TON_RATIO = _WTON_TON('1');

const RAY = toBN(_WTON('1').toFixed(WTON_UNIT))

export const calculateExpectedSeig = (
  fromBlockNumber: BN,
  toBlockNumber: BN,
  userStakedAmount: BN,
  totalStakedAmount: BN,
  totalSupplyOfTON: BN,
  pseigRate: BN
): BN => {
  const seigPerBlock = toBN(_WTON('3.92').toFixed(WTON_UNIT))
  const blockNumbers = toBlockNumber.sub(fromBlockNumber)

  const totalSeig = seigPerBlock.mul(blockNumbers)
  const totalBasicSeig = totalSeig.mul(totalStakedAmount).div(totalSupplyOfTON)
  const unstakedSeig = totalSeig.sub(totalBasicSeig)
  const totalPseig = unstakedSeig.mul(pseigRate).div(RAY)

  const userBasicSeig = totalBasicSeig.mul(userStakedAmount).div(totalStakedAmount)
  const userPseig = totalPseig.mul(userStakedAmount).div(totalStakedAmount)

  return userBasicSeig.add(userPseig)
}

export class Calculator {
  seigPerBlock: BN
  pseigRate: BN
  totalSupplyOfTON: BN
  totalStakedAmount: BN
  constructor() {
    this.seigPerBlock = toBN(_WTON('3.92').toFixed(WTON_UNIT))
    this.pseigRate = toBN(_WTON('0.4').toFixed(WTON_UNIT))
    this.totalSupplyOfTON = toBN(_TON('50000000').times(WTON_TON_RATIO).toFixed(WTON_UNIT))
  }

  public setSeigPerBlock(seig: BN) {
    this.seigPerBlock = seig
  }

  public setPseigRate(rate: BN) {
    this.pseigRate = rate
  }

  public setTotalSupplyOfTON(totalSupply: BN) {
    this.totalSupplyOfTON = totalSupply
  }

  public setTotalStakedAmount(amount: BN) {
    this.totalStakedAmount = amount
  }

  public getExpectedSeig(
    fromBlockNumber: BN,
    toBlockNumber: BN,
    userStakedAmount: BN
  ): BN {
    return calculateExpectedSeig(fromBlockNumber, toBlockNumber, userStakedAmount, this.totalStakedAmount, this.totalSupplyOfTON, this.pseigRate)
  }
}