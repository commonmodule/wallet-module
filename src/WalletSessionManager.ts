import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import {
  Config,
  ReadContractParameters,
  WriteContractParameters,
} from "@wagmi/core";
import type { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
import WalletConnector, { WalletConnectorOptions } from "./WalletConnector.js";

class WalletSessionManager extends EventContainer<{
  sessionChanged: (walletAddress: string | undefined) => void;
}> {
  private store = new Store("wallet-session-manager");

  public getWalletAddress() {
    return this.store.get<string>("walletAddress");
  }

  constructor() {
    super();
    WalletConnector.on("addressChanged", (walletAddress) => {
      if (this.getWalletAddress()) {
        if (walletAddress === undefined) {
          this.store.remove("walletAddress");
          this.emit("sessionChanged", undefined);
        } else if (walletAddress !== this.getWalletAddress()) {
          WalletConnector.disconnect();
        }
      } else if (walletAddress !== undefined) {
        this.store.setPermanent("walletAddress", walletAddress);
        this.emit("sessionChanged", walletAddress);
      }
    });
  }

  public init(options: WalletConnectorOptions) {
    WalletConnector.init(options);
  }

  public openModal() {
    WalletConnector.openModal();
  }

  public async readContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(parameters: ReadContractParameters<abi, functionName, args, Config>) {
    return await WalletConnector.readContract(parameters);
  }

  public async writeContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
    args extends ContractFunctionArgs<
      abi,
      "nonpayable" | "payable",
      functionName
    >,
    chainId extends Config["chains"][number]["id"],
  >(
    parameters: WriteContractParameters<
      abi,
      functionName,
      args,
      Config,
      chainId
    >,
  ) {
    if (!this.getWalletAddress()) throw new Error("Not connected");
    if (WalletConnector.walletAddress !== this.getWalletAddress()) {
      throw new Error("Wallet address mismatch");
    }
    return await WalletConnector.writeContract(parameters);
  }
}

export default new WalletSessionManager();
