import { setNetwork, getNumLayer2, getLayer2ByIndex, isLayer2, getStakedAmount, getTotalStakedAmount } from "../src";
import Web3 from "web3";
import { BN } from "../node_modules/bn.js"; // This relative path is used to specify 'bn.js', not '@types/bn.js'.
const { toBN } = require("web3-utils");
const chai = require("chai");
chai.use(require("chai-bn")(BN)).should();

setNetwork(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/2d92b8fedd374147b0ec8a9fa04b2839"), "mainnet");

describe("Layer2Registry class", () => {
    it("should get number of layer2", async () => {
        const expected: string = "2";
        const actual = await getNumLayer2();
        actual.should.equal(expected);
    });

    const layer2: string = "0x39A13a796A3Cd9f480C28259230D2EF0a7026033";
    it("should get layer2 address by index", async () => {
        const actual = await getLayer2ByIndex(0);
        actual.should.equal(layer2);
    });

    it("should be layer2 address", async () => {
        const expected: boolean = true;
        const actual = await isLayer2(layer2);
        actual.should.equal(expected);
    });
});

describe("SeigManager class", () => {
    it("should get staked amount", async () => {
        const layer2: string = "0x39A13a796A3Cd9f480C28259230D2EF0a7026033";
        const tokamak1 = "0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3"; // tokamak1 operator
        const expected: BN = new BN(0);
        const actual = await getStakedAmount(layer2, tokamak1);
        toBN(actual).should.be.bignumber.gt(expected);
    });

    it("should get total staked amount", async () => {
        const tokamak1 = "0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3"; // tokamak1 operator
        const expected: BN = new BN(0);
        const actual = await getTotalStakedAmount(tokamak1);
        toBN(actual).should.be.bignumber.gt(expected);
    });
});