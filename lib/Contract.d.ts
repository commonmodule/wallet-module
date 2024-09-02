import { BaseContract, Interface, InterfaceAbi, JsonRpcProvider } from "ethers";
export default abstract class Contract<CT extends BaseContract> {
    private abi;
    private _rpcProvider;
    private _viewContract;
    protected get rpcProvider(): JsonRpcProvider;
    protected get viewContract(): CT;
    constructor(abi: Interface | InterfaceAbi);
}
//# sourceMappingURL=Contract.d.ts.map