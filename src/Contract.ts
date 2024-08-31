import { BaseContract, Interface, InterfaceAbi } from "ethers";

export default abstract class Contract<CT extends BaseContract> {
  constructor(private abi: Interface | InterfaceAbi) {}
}
