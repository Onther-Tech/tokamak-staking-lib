import Web3 from "web3";

export default class Web3Connector {
    private static _instance: Web3Connector;
    private static _host: string = "https://mainnet.infura.io/v3/a608d5cd0f1e42109d964abdffe5d8d9"; // default: mainnet
    private readonly _web3: Web3;

    private constructor() {
        this._web3 = new Web3(new Web3.providers.HttpProvider(Web3Connector._host));
    }

    public static instance(): Web3Connector {
        if (!Web3Connector._instance) {
            Web3Connector._instance = new Web3Connector();
        }
        return Web3Connector._instance;
    }

    public static setNetwork(net: string) {
        switch (net) {
            case "mainnet":
                Web3Connector._host = "https://mainnet.infura.io/v3/a608d5cd0f1e42109d964abdffe5d8d9";
                break;

            case "rinkeby":
                Web3Connector._host = "https://rinkeby.infura.io/v3/a608d5cd0f1e42109d964abdffe5d8d9";
                break;
        }
    }

    public get web3(): Web3 {
        return this._web3;
    }
}