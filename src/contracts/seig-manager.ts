import { Contract } from "web3-eth-contract";
import Web3Connector from "../common/web3-connector";
const SeigManagerABI = require("./abi/SeigManager.json");

export default class SeigManager {
    private static _instance: SeigManager;
    private static _address: string = "0x710936500aC59e8551331871Cbad3D33d5e0D909"; // default: mainnet
    private _contract: Contract;

    private constructor() {
        const web3 = Web3Connector.instance().web3;
        this._contract = new web3.eth.Contract(SeigManagerABI, SeigManager._address);
    }

    public static instance(): SeigManager {
        if (!SeigManager._instance) {
            SeigManager._instance = new SeigManager();
        }
        return SeigManager._instance;
    }

    public static setNetwork(net: string) {
        switch (net) {
            case "mainnet":
                SeigManager._address = "0x710936500aC59e8551331871Cbad3D33d5e0D909";
                break;

            case "rinkeby":
                SeigManager._address = "0x0ed93958871Cd9512d5de65CFeb6f4837c0d5B17";
                break;
        }
    }

    public stakeOf(layer2: string, account: string): Promise<string> {
        return this._contract.methods.stakeOf(layer2, account).call();
    }
}