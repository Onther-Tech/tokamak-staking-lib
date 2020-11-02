import { Contract } from "web3-eth-contract";
import Web3Connector from "../common/web3-connector";
const Layer2ABI = require("./abi/Layer2.json");
import BN from "bn.js";

export default class Layer2 {
    private _contract: Contract;

    public constructor(address: string) {
        const web3 = Web3Connector.instance().web3;
        this._contract = new web3.eth.Contract(Layer2ABI, address);
    }

    public async commitDummy(from: string) {
        const costNRB = await this._contract.methods.COST_NRB().call();
        const NRELength = await this._contract.methods.NRELength().call();
        const currentForkNumber = await this._contract.methods.currentFork().call();

        const fork = await this._contract.methods.forks(currentForkNumber).call();
        const epochNumber: number = parseInt(fork.lastEpoch) + 1;
        const startBlockNumber: number = parseInt(fork.lastBlock) + 1;
        const endBlockNumber: number = startBlockNumber + parseInt(NRELength) - 1;

        const pos1: string = this.makePos(currentForkNumber, epochNumber);
        const pos2: string = this.makePos(startBlockNumber, endBlockNumber);
        const dummy = "0xdb431b544b2f5468e3f771d7843d9c5df3b4edcf8bc1c599f18f0b4ea8709bc3";

        await this._contract.methods.submitNRE(pos1, pos2, dummy, dummy, dummy).send({from: from, value: costNRB});
    }

    private makePos(v1: number, v2: number): string {
        const b1: BN = new BN(v1);
        const b2: BN = new BN(v2);
        const temp: BN = b1.mul(new BN(2).pow(new BN(128)));
        return temp.add(b2).toString();
    }

    public operator(): Promise<string> {
        return this._contract.methods.operator().call();
    }

    public isSubmitter(account: string): Promise<boolean> {
        return this._contract.methods.isSubmitter(account).call();
    }
}