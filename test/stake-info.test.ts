import * as tokamak from "../src";
// This relative path is used to specify 'bn.js', not '@types/bn.js', because '@types/bn.js' is not injected to 'chai'.
import { BN } from "../node_modules/bn.js";
const { toBN } = require("web3-utils");
const chai = require("chai");
chai.use(require("chai-bn")(BN)).should();

tokamak.setNetwork("https://api.infura.io/v1/jsonrpc/mainnet", "mainnet");

describe("Layer2Registry functions", () => {
    it("should get number of layer2", async () => {
        const expected: number = 2;
        const actual: number = await tokamak.getNumLayer2();
        actual.should.equal(expected);
    });

    const layer2: string = "0x39A13a796A3Cd9f480C28259230D2EF0a7026033";
    it("should get layer2 address by index", async () => {
        const actual: string = await tokamak.getLayer2ByIndex(0);
        actual.should.equal(layer2);
    });

    it("should be layer2 address", async () => {
        const expected: boolean = true;
        const actual: boolean = await tokamak.isLayer2(layer2);
        actual.should.equal(expected);
    });
});

describe("getStakedAmount functions", () => {
    const layer2: string = "0x39A13a796A3Cd9f480C28259230D2EF0a7026033";
    const account: string = "0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3"; // tokamak1 operator
    it("should get staked amount of latest block", async () => {
        const expected: BN = new BN(0);
        const actual: BN = await tokamak.getStakedAmount(layer2, account);
        actual.should.be.bignumber.gt(expected);
    });

    it("should get staked amount of specified block", async () => {
        const blockNumber: BN = new BN(11072614);
        const expected: BN = new BN(0);
        const actual: BN = await tokamak.getStakedAmount(layer2, account, blockNumber);
        actual.should.be.bignumber.gt(expected);
    });

    const fromBlockNumber: BN = new BN(11072614);
    it("should get staked amount difference during specified block period 1", async () => {
        const toBlockNumber: BN = fromBlockNumber.add(new BN(1));
        const fromAmount: BN = await tokamak.getStakedAmount(layer2, account, fromBlockNumber);
        const toAmount: BN = await tokamak.getStakedAmount(layer2, account, toBlockNumber);
        const expected: BN = toAmount.sub(fromAmount);
        const actual: BN = await tokamak.getStakedAmountDiff(layer2, account, fromBlockNumber, toBlockNumber);
        actual.should.be.bignumber.equal(expected);
    });

    it("should get staked amount difference during specified block period 2", async () => {
        const fromAmount: BN = await tokamak.getStakedAmount(layer2, account, fromBlockNumber);
        const latestAmount: BN = await tokamak.getStakedAmount(layer2, account);
        const expected: BN = latestAmount.sub(fromAmount);
        const actual: BN = await tokamak.getStakedAmountDiff(layer2, account, fromBlockNumber);
        actual.should.be.bignumber.equal(expected);
    });
});

describe("getTotalStakedAmount functions", () => {
    const account: string = "0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3"; // tokamak1 operator
    it("should get total staked amount of latest block", async () => {
        const expected: BN = new BN(0);
        const actual: BN = await tokamak.getTotalStakedAmount(account);
        actual.should.be.bignumber.gt(expected);
    });

    it("should get total staked amount of specified block", async () => {
        const blockNumber: BN = new BN(11072614);
        const expected: BN = new BN(0);
        const actual: BN = await tokamak.getTotalStakedAmount(account, blockNumber);
        actual.should.be.bignumber.gt(expected);
    });

    const fromBlockNumber: BN = new BN(11072614);
    it("should get total staked amount difference during specified block period 1", async () => {
        const toBlockNumber: BN = fromBlockNumber.add(new BN(1));
        const fromAmount: BN = await tokamak.getTotalStakedAmount(account, fromBlockNumber);
        const toAmount: BN = await tokamak.getTotalStakedAmount(account, toBlockNumber);
        const expected: BN = toAmount.sub(fromAmount);
        const actual: BN = await tokamak.getTotalStakedAmountDiff(account, fromBlockNumber, toBlockNumber);
        actual.should.be.bignumber.equal(expected);
    }).timeout(10000);

    it("should get total staked amount difference during specified block period 2", async () => {
        const fromAmount: BN = await tokamak.getTotalStakedAmount(account, fromBlockNumber);
        const latestAmount: BN = await tokamak.getTotalStakedAmount(account);
        const expected: BN = latestAmount.sub(fromAmount);
        const actual: BN = await tokamak.getTotalStakedAmountDiff(account, fromBlockNumber);
        actual.should.be.bignumber.equal(expected);
    }).timeout(10000);
});
