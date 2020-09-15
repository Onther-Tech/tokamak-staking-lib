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

`const { calculateExpectedSeig } = require('tokamak-staking-lib');`

Calculate the expected seigniorage

```
const result = calculateExpectedSeig(
  fromBlockNumber, // the latest commited block number. You can get this using seigManager.lastCommitBlock(layer2)
  toBlockNumber, // the target block number which you want to calculate seigniorage
  userStakedAmount, // the staked WTON amount of user. You can get this using coinage.balanceOf(user)
  totalStakedAmount, // the staked WTON amount in SeigManager. You can get this using tot.totalSupply()
  totalSupplyOfTON, // the current totalSupply of TON in RAY unit. You can get this using ton.totalSupply() - ton.balanceOf(WTON) + tot.totalSupply()
  pseigRate // pseig rate in RAY unit. the current value is 0.4. You can get this using seigManager.relativeSeigRate()
)
```

or you can use Calculator class instead of function. Please check the below test code.
https://github.com/Onther-Tech/tokamak-staking-lib/blob/master/test/seigniorage-calculator.test.ts#L34-L48
