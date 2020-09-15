import { BN } from 'bn.js'
const { toBN } = require('web3-utils')

const RAY = toBN('1000000000000000000000000000') // 1e+27

const SEIG_PER_BLOCK = toBN('3920000000000000000000000000') // 3.92 in ray
const DEFAULT_PSEIG_RATE = toBN('400000000000000000000000000') // 0.4 in ray
const DEFAULT_TOTALSUPPLY_OF_TON = toBN('50000000000000000000000000000000000') // 50,000,000 in ray

export const calculateExpectedSeig = (
  fromBlockNumber: BN,
  toBlockNumber: BN,
  userStakedAmount: BN,
  totalStakedAmount: BN,
  totalSupplyOfTON: BN,
  pseigRate: BN
): BN => {
  const seigPerBlock = SEIG_PER_BLOCK
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
    this.seigPerBlock = SEIG_PER_BLOCK
    this.pseigRate = DEFAULT_PSEIG_RATE
    this.totalSupplyOfTON = DEFAULT_TOTALSUPPLY_OF_TON
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