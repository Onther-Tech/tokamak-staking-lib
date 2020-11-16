import BN from "bn.js";
const { toBN } = require("web3-utils");

export function toRAY(x: BN): BN {
    return x.mul(new BN(10 ** 9));
}

export function toWAD(x: BN): BN {
    return x.div(new BN(10 ** 9));
}