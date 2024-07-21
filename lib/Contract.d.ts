import { BaseContract, ContractTransactionResponse, Interface, InterfaceAbi } from "ethers";
import ChainInfo from "./ChainInfo.js";
export default abstract class Contract<CT extends BaseContract> {
    private abi;
    private chain;
    private address;
    private provider;
    protected viewContract: CT;
    constructor(abi: Interface | InterfaceAbi);
    init(chain: ChainInfo, address: string): void;
    protected wait(run: (contract: CT) => Promise<ContractTransactionResponse>): Promise<void>;
}
//# sourceMappingURL=Contract.d.ts.map