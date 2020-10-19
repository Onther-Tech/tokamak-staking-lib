# Staking API Reference
## Contents
- [Prerequisites](#prerequisites)
  - [Import Modules](#import-modules)
  - [setNetwork](#setNetwork)
- [Seigniorage Calculation](#seigniorage-calculation)
  - [calculateExpectedSeig](#calculateExpectedSeig)
  - [calculateExpectedSeigWithCommission](#calculateExpectedSeigWithCommission)
  - [Calculator](#calculator)
- [Layer2 Query](#layer2-query)
  - [getNumLayer2](#getNumLayer2)
  - [getLayer2ByIndex](#getLayer2ByIndex)
  - [isLayer2](#isLayer2)
- [Staking Query](#staking-query)
  - [getStakedAmount](#getStakedAmount)
  - [getTotalStakedAmount](#getTotalStakedAmount)
- [Test Code](#test-code)

## Prerequisites
### Import Modules
First of all, You must import the modules you want to use in your source code before using them. For example, if you want to use `calculateExpectedSeig` function, you must import it just like the example code below.

#### Example
```
const { calculateExpectedSeig } = require("tokamak-staking-lib");
```

### setNetwork
This function sets network information. You must call this function before calling `Layer2 Query` and `Staking Query` functions. This function does not create a connection. The first query request will create the connection to Ethereum node for the RPC communication.
```
function setNetwork(provider: provider, net: string = "mainnet")
```

#### Parameters
1. `provider: provider` - The web3 provider which includes the host information you want to connect to. You can pass string or provider instance to this parameter.
2. `net: string (optional)` - The network type you want to connect to. You can choose `mainnet` or `rinkeby`. The default is `mainnet`. 

#### Returns
1. Nothing

#### Example
```
setNetwork("https://api.infura.io/v1/jsonrpc/mainnet", "mainnet");

// or

setNetwork(new Web3.providers.HttpProvider("https://api.infura.io/v1/jsonrpc/mainnet"), "mainnet");
```

## Seigniorage Calculation
### calculateExpectedSeig
This function calculates the expected seigniorate.
```
function calculateExpectedSeig(
  fromBlockNumber: BN,
  toBlockNumber: BN,
  userStakedAmount: BN,
  totalStakedAmount: BN,
  totalSupplyOfTON: BN,
  pseigRate: BN
): BN
```

#### Parameters
1. `fromBlockNumber: BN` - The latest commited block number. You can get this using seigManager.lastCommitBlock (layer2).
2. `toBlockNumber: BN` - The target block number in which you want to calculate seigniorage.
3. `userStakedAmount: BN` - The staked WTON amount of user. You can get this using coinage.balanceOf(user).
4. `totalStakedAmount: BN` - The staked WTON amount in SeigManager. You can get this using tot.totalSupply().
5. `totalSupplyOfTON: BN` - The current total supply of TON in RAY. You can get this using ton.totalSupply() - ton.balanceOf(WTON) + tot.totalSupply().
6. `pseigRate: BN` - The pseig rate in RAY. The current value is 0.4. You can get this using seigManager.relativeSeigRate().

#### Returns
1. `expectedSeig: BN` - The expected seigniorage.

#### Example
```
const RAY = toBN("1000000000000000000000000000"); // 1e+27

const fromBlockNumber = toBN("1");
const toBlockNumber = toBN("10000");
const userStakedAmount = toBN("1000").mul(RAY);
const totalStakedAmount = toBN("2000000").mul(RAY);
const totalSupplyOfTON = toBN("50000000").mul(RAY);
const pseigRate = toBN("4").mul(RAY).div(toBN("10"));

const expectedSeig = calculateExpectedSeig(
  fromBlockNumber,
  toBlockNumber,
  userStakedAmount,
  totalStakedAmount,
  totalSupplyOfTON,
  pseigRate
);

console.log(expectedSeig); // 8309568960000000000000000000
```

### calculateExpectedSeigWithCommission
This function calculates the expected seigniorage with commission.
```
function calculateExpectedSeigWithCommission(
  fromBlockNumber: BN,
  toBlockNumber: BN,
  userStakedAmount: BN,
  totalStakedAmount: BN,
  totalSupplyOfTON: BN,
  pseigRate: BN,
  commissionRate: BN,
  isCommissionRateNegative: boolean,
  operatorStakedAmount: BN,
  totalStakedAmountOnLayer2: BN,
  isOperator: boolean
): BN
```

#### Parameters
1. `fromBlockNumber: BN` - The latest commited block number. You can get this using seigManager.lastCommitBlock (layer2).
2. `toBlockNumber: BN` - The target block number in which you want to calculate seigniorage.
3. `userStakedAmount: BN` - The staked WTON amount of user. You can get this using coinage.balanceOf(user).
4. `totalStakedAmount: BN` - The staked WTON amount in SeigManager. You can get this using tot.totalSupply().
5. `totalSupplyOfTON: BN` - The current total supply of TON in RAY. You can get this using ton.totalSupply() - ton.balanceOf(WTON) + tot.totalSupply().
6. `pseigRate: BN` - The pseig rate in RAY. The current value is 0.4. You can get this using seigManager.relativeSeigRate().
7. `commissionRate: BN` - The commission rate of the current layer2. You can get this using seigManager.commissionRates(layer2).
8. `isCommissionRateNegative: boolean` - Whether the commission rate of the current layer2 is negative. You can get this using seigManager.isCommissionRateNegative(layer2).
9. `operatorStakedAmount: BN` - The operator's staked amount. You can get this using coinage.balanceOf(operator).
10. `totalStakedAmountOnLayer2: BN` - The total amount in the current layer2. You can get this using coinage.totalSupply().
11. `isOperator: boolean` - Whether the user you want to calculate seigniorate for is operator.

#### Returns
1. `expectedSeigWithCommission: BN` - The expected seigniorage with commission.

#### Example
```
const RAY = toBN("1000000000000000000000000000"); // 1e+27

const fromBlockNumber = toBN("1");
const toBlockNumber = toBN("10000");
const userStakedAmount = toBN("5000").mul(RAY);
const totalStakedAmount = toBN("2000000").mul(RAY);
const totalSupplyOfTON = toBN("50000000").mul(RAY);
const pseigRate = toBN("4").mul(RAY).div(toBN("10"));
const commissionRate = toBN("7").mul(RAY).div(toBN("10"));
const isCommissionRateNegative = true;
const operatorStakedAmount = toBN("500000").mul(RAY);
const totalStakedAmountOnLayer2 = toBN("1000000").mul(RAY);
const isOperator = false;

const expectedSeigWithCommission = calculateExpectedSeigWithCommission(
  fromBlockNumber,
  toBlockNumber,
  userStakedAmount,
  totalStakedAmount,
  totalSupplyOfTON,
  pseigRate,
  commissionRate,
  isCommissionRateNegative,
  operatorStakedAmount,
  totalStakedAmountOnLayer2,
  isOperator
);

console.log(expectedSeigWithCommission);
```

### Calculator
This class calculates the expected seigniorate.
```
class Calculator {
  constructor();
  public setSeigPerBlock(seig: BN);
  public setPseigRate(rate: BN);
  public setTotalSupplyOfTON(totalSupply: BN);
  public setTotalStakedAmount(amount: BN);
  public getExpectedSeig(fromBlockNumber: BN, toBlockNumber: BN, userStakedAmount: BN): BN;
}
```

#### Example
```
  let calculator = new Calculator();
  calculator.setTotalStakedAmount(toBN("2000000").mul(RAY));

  const fromBlockNumber = new BN("1");
  const toBlockNumber = new BN("10000");
  const userStakedAmount = toBN("1000").mul(RAY);
  const expectedSeig = calculator.getExpectedSeig(fromBlockNumber, toBlockNumber, userStakedAmount);

  console.log(expectedSeig); // 8309568960000000000000000000
```

## Layer2 Query
### getNumLayer2
This function gets the number of layer2.
```
function getNumLayer2(): Promise<number>
```

#### Parameters
1. Nothing

#### Returns
1. `numLayer2: Promise<number>` - The number of layer2.

#### Example
```
const numLayer2 = await getNumLayer2();
console.log(numLayer2);
```

### getLayer2ByIndex
This function gets the layer2 address by index.
```
function getLayer2ByIndex(index: number): Promise<string>
```

#### Parameters
1. `index: number` - The layer2 index.

#### Returns
1. `layer2: Promise<string>` - The layer2 address.

#### Example
```
const layer2 = await getLayer2ByIndex(0);
console.log(layer2);
```

### isLayer2
This function checks whether the given address is a layer2 address.
```
function isLayer2(layer2: string): Promise<boolean>
```

#### Parameters
1. `layer2: string` - The address to check whether it's a layer2 address.

#### Returns
1. `isLayer2: Promise<boolean>` -  Whether the given address is a layer2 address.

#### Example
```
const result = await isLayer2("0x39A13a796A3Cd9f480C28259230D2EF0a7026033");
console.log(result);
```

## Staking Query
### getStakedAmount
This function gets the staked amount by layer2 and account.
```
async function getStakedAmount(layer2: string, account: string, blockNumber?: BN, untilBlockNumber?: BN): Promise<BN>
```

#### Parameters
1. `layer2: string` - The layer2 address.
2. `account: string` - The account address.
3. `blockNumber: BN (optional)` - The block number. If you specify `blockNumber`, you will get the staked amount of the specified block. Otherwise, you will get the staked amount of the latest block.
4. `untilBlockNumber: BN (optional)` - The until block number. If you specify `untilBlockNumber`, you will get the staked amount difference during the specified block period which is from `blockNumber` to `untilBlockNumber`.

#### Returns
1. `stakedAmount: Promise<BN>` - The staked amount.

#### Example
```
const layer2 = "0x39A13a796A3Cd9f480C28259230D2EF0a7026033";
const account = "0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3"; // tokamak1 operator
const blockNumber = new BN(11072614);

// 1. It gets the staked amount of the latest block.
const amount1 = await getStakedAmount(layer2, account);
console.log(amount1);

// 2. It gets the staked amount of the specified block.
const amount2 = await getStakedAmount(layer2, account, blockNumber);
console.log(amount2); // 1314038239592196329341829580966

// 3. It gets the staked amount difference during the specified block period.
const amount3 = await getStakedAmount(layer2, account, blockNumber, blockNumber.add(new BN(1)));
console.log(amount3); // 19961216056484449266017300338
```

### getTotalStakedAmount
This function gets the total staked amount of all layer2s by account.
```
async function getTotalStakedAmount(account: string, blockNumber?: BN, untilBlockNumber?: BN): Promise<BN>
```

#### Parameters
1. `account: string` - The account address.
2. `blockNumber: BN (optional)` - The block number. If you specify `blockNumber`, you will get the total staked amount of the specified block. Otherwise, you will get the total staked amount of the latest block.
3. `untilBlockNumber: BN (optional)` - The until block number. If you specify `untilBlockNumber`, you will get the total staked amount difference during the specified block period which is from `blockNumber` to `untilBlockNumber`.

#### Returns
1. `totalStakedAmount: Promise<BN>` - The total staked amount.

#### Example
```
const account = "0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3"; // tokamak1 operator
const blockNumber = new BN(11072614);

// 1. It gets the total staked amount of the latest block.
const amount1 = await getTotalStakedAmount(account);
console.log(amount1);

// 2. It gets the total staked amount of the specified block.
const amount2 = await getTotalStakedAmount(account, blockNumber);
console.log(amount2); // 1314038239592196329341829580966

// 3. It gets the total staked amount difference during the specified block period.
const amount3 = await getTotalStakedAmount(account, blockNumber, blockNumber.add(new BN(1)));
console.log(amount3); // 19961216056484449266017300338
```

## Test Code
For more details, refer to the test code pages below.
- [seigniorage-calculator.test.ts]
- [stake-info.test.ts]

[seigniorage-calculator.test.ts]: <../test/seigniorage-calculator.test.ts>
[stake-info.test.ts]: <../test/stake-info.test.ts>