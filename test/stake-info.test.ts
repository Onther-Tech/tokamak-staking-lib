import { setNetwork, getNumLayer2, getLayer2ByIndex, isLayer2, getStake } from "../src";

import { BN } from "../node_modules/bn.js"; // This relative path is used to specify 'bn.js', not '@types/bn.js'.
const { toBN } = require("web3-utils");
const chai = require("chai");
chai.use(require("chai-bn")(BN)).should();

setNetwork("mainnet");

describe("Layer2Registry class", () => {
    it("should get number of layer2", () => {
        const expected: string = "2";
        getNumLayer2().then((actual) => {
            actual.should.equal(expected);
        }).catch((error) => {
            console.log(error);
        });
    });

    const layer2: string = "0x39A13a796A3Cd9f480C28259230D2EF0a7026033";
    it("should get layer2 address by index", () => {
        getLayer2ByIndex(0).then((actual) => {
            actual.should.equal(layer2);
        }).catch((error) => {
            console.log(error);
        });
    });

    it("should be layer2 address", () => {
        const expected: boolean = true;
        isLayer2(layer2).then((actual) => {
            actual.should.equal(expected);
        }).catch((error) => {
            console.log(error);
        });
    });
});

describe("SeigManager class", () => {
    it("should get staked amount by account", () => {
        const layer2: string = "0x39A13a796A3Cd9f480C28259230D2EF0a7026033";
        const tokamak1 = "0xEA8e2eC08dCf4971bdcdfFFe21439995378B44F3"; // tokamak1 operator
        const expected: BN = toBN("0");
        getStake(layer2, tokamak1).then((actual) => {
            toBN(actual).should.be.bignumber.gt(expected);
        }).catch((error) => {
            console.log(error);
        });
    });
});