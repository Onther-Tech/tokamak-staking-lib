import { provider } from "web3-core";
import BN from "bn.js";
const { toBN } = require("web3-utils");
import Web3Connector from "./common/web3-connector";
import Layer2Registry from "./contracts/layer2-registry";
import SeigManager from "./contracts/seig-manager";

export const setNetwork = (provider: provider, net: string = "mainnet") => {
    Web3Connector.setNetwork(provider);
    Layer2Registry.setNetwork(net);
    SeigManager.setNetwork(net);
};

export const getNumLayer2 = (): Promise<number> => {
    return Layer2Registry.instance().numLayer2s();
};

export const getLayer2ByIndex = (index: number): Promise<string> => {
    return Layer2Registry.instance().layer2ByIndex(index);
};

export const isLayer2 = (layer2: string): Promise<boolean> => {
    return Layer2Registry.instance().layer2s(layer2);
};

export const getStakedAmount = async (layer2: string, account: string, blockNumber?: BN, untilBlockNumber?: BN): Promise<BN> => {
    if (untilBlockNumber == null) return SeigManager.instance().stakeOf(layer2, account, blockNumber);
    const startAmount: BN = await SeigManager.instance().stakeOf(layer2, account, blockNumber);
    const endAmount: BN = await SeigManager.instance().stakeOf(layer2, account, untilBlockNumber);
    return endAmount.sub(startAmount);
};

export const getTotalStakedAmount = async (account: string, blockNumber?: BN, untilBlockNumber?: BN): Promise<BN> => {
    let total: BN = new BN(0);
    const num: number = await getNumLayer2();
    for (let i: number = 0; i < num; ++i) {
        const layer2: string = await getLayer2ByIndex(i);
        const amount: BN = await getStakedAmount(layer2, account, blockNumber, untilBlockNumber);
        total = total.add(amount);
    }

    return total;
};
