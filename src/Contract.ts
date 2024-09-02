import { BaseContract, Interface, InterfaceAbi, JsonRpcProvider } from "ethers";

export default abstract class Contract<CT extends BaseContract> {
  private _rpcProvider: JsonRpcProvider | undefined;
  private _viewContract: CT | undefined;

  protected get rpcProvider(): JsonRpcProvider {
    if (!this._rpcProvider) throw new Error("Provider not initialized");
    return this._rpcProvider;
  }

  protected get viewContract(): CT {
    if (!this._viewContract) throw new Error("Contract not initialized");
    return this._viewContract;
  }

  constructor(private abi: Interface | InterfaceAbi) {}
}
