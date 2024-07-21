import { BaseContract, ContractTransactionResponse, Interface, InterfaceAbi, JsonRpcProvider, TransactionReceipt } from "ethers";
import ChainInfo from "./ChainInfo.js";
export default abstract class Contract<CT extends BaseContract> {
    private abi;
    private chain;
    private address;
    protected provider: JsonRpcProvider;
    protected viewContract: CT;
    constructor(abi: Interface | InterfaceAbi);
    init(chain: ChainInfo, address: string): void;
    protected wait(run: (contract: CT) => Promise<ContractTransactionResponse>): Promise<{
        contract: CT;
        receipt: TransactionReceipt | undefined;
    }>;
}
//# sourceMappingURL=Contract.d.ts.map