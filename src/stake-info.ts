import { BN } from "../node_modules/bn.js"; // This relative path is used to specify 'bn.js', not '@types/bn.js'.
import Web3Connector from "./common/web3-connector";
import Layer2Registry from "./contracts/layer2-registry";
import SeigManager from "./contracts/seig-manager";

export const setNetwork = (net: string) => {
    Web3Connector.setNetwork(net);
    Layer2Registry.setNetwork(net);
    SeigManager.setNetwork(net);
};

export const getNumLayer2 = (): Promise<string> => {
    return Layer2Registry.instance().numLayer2s();
};

export const getLayer2ByIndex = (index: number): Promise<string> => {
    return Layer2Registry.instance().layer2ByIndex(index);
};

export const isLayer2 = (layer2: string): Promise<boolean> => {
    return Layer2Registry.instance().layer2s(layer2);
};

export const getStake = (layer2: string, account: string): Promise<string> => {
    return SeigManager.instance().stakeOf(layer2, account);
};
