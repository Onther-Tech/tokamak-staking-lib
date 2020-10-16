import { Contract } from "web3-eth-contract";
import Web3Connector from "../common/web3-connector";
const Layer2RegistryABI = require("./abi/Layer2Registry.json");

export default class Layer2Registry {
    private static _instance: Layer2Registry;
    private static _address: string = "0x0b3E174A2170083e770D5d4Cf56774D221b7063e"; // default: mainnet
    private _contract: Contract;

    private constructor() {
        const web3 = Web3Connector.instance().web3;
        this._contract = new web3.eth.Contract(Layer2RegistryABI, Layer2Registry._address);
    }

    public static instance(): Layer2Registry {
        if (!Layer2Registry._instance) {
            Layer2Registry._instance = new Layer2Registry();
        }
        return Layer2Registry._instance;
    }

    public static setNetwork(net: string) {
        switch (net) {
            case "mainnet":
                Layer2Registry._address = "0x0b3E174A2170083e770D5d4Cf56774D221b7063e";
                break;

            case "rinkeby":
                Layer2Registry._address = "0xF7dbB432b68295329790EF81fedE861645969112";
                break;
        }
    }

    public async numLayer2s(): Promise<number> {
        return Number(await this._contract.methods.numLayer2s().call());
    }

    public layer2ByIndex(index: number): Promise<string> {
        return this._contract.methods.layer2ByIndex(index).call();
    }

    public layer2s(layer2: string): Promise<boolean> {
        return this._contract.methods.layer2s(layer2).call();
    }
}