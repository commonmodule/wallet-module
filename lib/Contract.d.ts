import { Contract as EthersContract, ContractTransactionResponse, Interface, InterfaceAbi } from "ethers";
import ChainInfo from "./ChainInfo.js";
export default abstract class Contract {
    private abi;
    private chain;
    private address;
    private provider;
    private viewContract;
    constructor(abi: Interface | InterfaceAbi, chain: ChainInfo, address: string);
    protected wait(run: (contract: EthersContract) => Promise<ContractTransactionResponse>): Promise<void>;
}
//# sourceMappingURL=Contract.d.ts.map