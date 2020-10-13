# Tokamak Network Staking Library

# Notice
The current seigniorage per block in SeigManager is 3.92.
All number units in this library uses RAY (1e27) to prevent number errors.

# Related Contracts
To get the information about related contracts, refer to [Deployed Contracts on Mainnet] page.

# Installation
First, add `tokamak-staking-lib` as a dependency in `package.json` file.
```
"dependencies": {
  "tokamak-staking-lib": "^0.0.7",
},
```

Then, install the package to your local directory.
```sh
$ npm install 
```

# Usage
## Calculate Seigniorage
First, import the seigniorage calculator modules from `tokamak-staking-lib` in your source code.
```
const { calculateExpectedSeig, calculateExpectedSeigWithCommission } = require("tokamak-staking-lib");
```

### calculateExpectedSeig
This function calculates the expected seigniorate.
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

### calculateExpectedSeigWithCommission
This function calculates the expected seigniorage with commission.
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

### Calculator
If you want to use the `Calculator` class instead of the functions above. Please refer to [seigniorage-calculator.test.ts > Calculator] test code.

## Set Network
You need to set network before calling query functions below. Otherwise, the default network will be `mainnet`. Currently, `mainnet` and `rinkeby` are supported.
```
const { setNetwork } = require("tokamak-staking-lib");

setNetwork("mainnet"); // mainnet or rinkeby
```

## Query Layer2 Registry Info
First, import the layer2 registry modules from `tokamak-staking-lib` in your source code.
```
const { getNumLayer2, getLayer2ByIndex, isLayer2 } = require("tokamak-staking-lib");
```

### getNumLayer2
This function gets the number of layer2.
```
function getNumLayer2(): Promise<string>
```

### getLayer2ByIndex
This function gets the layer2 address by index.
```
function getLayer2ByIndex(index: number): Promise<string>
```

### isLayer2
This function checks if the given address is layer2.
```
function isLayer2(layer2: string): Promise<boolean>
```

## Query Staking Info
First, import the staking modules from `tokamak-staking-lib` in your source code.
```
const { getStake } = require("tokamak-staking-lib");
```

### getStake
This functions to get the staked amount by accout.
```
getStake = (layer2: string, account: string): Promise<string>
```

## Example Code
To get the example code, look into the test code pages below.
- [seigniorage-calculator.test.ts]
- [stake-info.test.ts]

[Deployed Contracts on Mainnet]: <https://github.com/Onther-Tech/plasma-evm-contracts#deployed-contracts-on-mainnet>
[seigniorage-calculator.test.ts]: <test/seigniorage-calculator.test.ts>
[seigniorage-calculator.test.ts > Calculator]: <test/seigniorage-calculator.test.ts#L56-L71>
[stake-info.test.ts]: <test/stake-info.test.ts>