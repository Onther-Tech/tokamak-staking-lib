# tokamak-staking-lib
Tokamak network staking library

# Notice

The current seigniorage per block in SeigManager is 3.92.   
All number unit in this library is RAY(1e27) to reduce number errors.

# Related contracts

https://github.com/Onther-Tech/plasma-evm-contracts#deployed-contracts-on-mainnet

# Usage

Add dependency in "package.json"

`"tokamak-staking-lib": "^0.0.3",`

Install the package

`npm install`

Include library in your code

`const { calculateExpectedSeig, calculateExpectedSeigWithCommission } = require('tokamak-staking-lib');`

Calculate the expected seigniorage

```
function calculateExpectedSeig(
  fromBlockNumber: BN, // the latest commited block number. You can get this using seigManager.lastCommitBlock(layer2)
  toBlockNumber: BN, // the target block number which you want to calculate seigniorage
  userStakedAmount: BN, // the staked WTON amount of user. You can get this using coinage.balanceOf(user)
  totalStakedAmount: BN, // the staked WTON amount in SeigManager. You can get this using tot.totalSupply()
  totalSupplyOfTON: BN, // the current totalSupply of TON in RAY unit. You can get this using ton.totalSupply() - ton.balanceOf(WTON) + tot.totalSupply()
  pseigRate: BN // pseig rate in RAY unit. the current value is 0.4. You can get this using seigManager.relativeSeigRate()
)
```

Calculate the expected seigniorage with commission rate

```
function calculateExpectedSeigWithCommission(
  fromBlockNumber: BN, // the latest commited block number. You can get this using seigManager.lastCommitBlock(layer2)
  toBlockNumber: BN, // the target block number which you want to calculate seigniorage
  userStakedAmount: BN, // the staked WTON amount of user. You can get this using coinage.balanceOf(user)
  totalStakedAmount: BN, // the staked WTON amount in SeigManager. You can get this using tot.totalSupply()
  totalSupplyOfTON: BN, // the current totalSupply of TON in RAY unit. You can get this using ton.totalSupply() - ton.balanceOf(WTON) + tot.totalSupply()
  pseigRate: BN, // pseig rate in RAY unit. the current value is 0.4. You can get this using seigManager.relativeSeigRate()
  commissionRate: BN, // The commission rate of the current layer2. You can get this using seigManager.commissionRates(layer2)
  isCommissionRateNegative: boolean, // Whether the commission rate of the current layer2 is negative. You can get this using seigManager.isCommissionRateNegative(layer2)
  operatorStakedAmount: BN, // operator's staking amount. You can get this using coinage.balanceOf(operator)
  totalStakedAmountOnLayer2: BN, // The total amount in the current layer2. You can get this using coinage.totalSupply()
  isOperator: boolean // Whether the user you want to calculate the seig is operator.
)
```

or you can use Calculator class instead of function. Please check the below test code.
https://github.com/Onther-Tech/tokamak-staking-lib/blob/master/test/seigniorage-calculator.test.ts#L34-L48
