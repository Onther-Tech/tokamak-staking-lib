import Web3Connector from "./common/web3-connector";
import Layer2s from "./contracts/layer2s";
const PrivatekeyProvider = require("truffle-privatekey-provider");

export const commitDummy = (layer2: string, privkey: string) => {
    const provider = new PrivatekeyProvider(privkey, Web3Connector.host);
    Web3Connector.instance().setProvider(provider);
    Layer2s.get(layer2).commitDummy(provider.address);
};
