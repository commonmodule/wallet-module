import { BaseContract, Interface, InterfaceAbi } from "ethers";
export default abstract class Contract<CT extends BaseContract> {
    private abi;
    constructor(abi: Interface | InterfaceAbi);
}
//# sourceMappingURL=Contract.d.ts.map