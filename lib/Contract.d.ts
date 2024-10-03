import { BaseContract, ContractTransactionResponse, Interface, InterfaceAbi, JsonRpcSigner, TransactionReceipt } from "ethers";
import { ChainInfo } from "./wallet-connectors/WalletConnector.js";
export default abstract class Contract<CT extends BaseContract> {
    private abi;
    private _chain;
    private _address;
    private _rpcProvider;
    private _viewContract;
    private get chain();
    private get address();
    private get rpcProvider();
    private get viewContract();
    constructor(abi: Interface | InterfaceAbi);
    init(chain: ChainInfo, address: string): void;
    protected executeAndWait(signer: JsonRpcSigner, run: (contract: CT) => Promise<ContractTransactionResponse>): Promise<{
        contract: CT;
        receipt: TransactionReceipt | undefined;
    }>;
}
//# sourceMappingURL=Contract.d.ts.map