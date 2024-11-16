import { EventContainer } from "@common-module/ts";
import { AppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  Config,
  readContract,
  ReadContractParameters,
  writeContract,
  WriteContractParameters,
} from "@wagmi/core";
import type { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";

export default class WalletConnector extends EventContainer<{
  addressChanged: (walletAddress: string | undefined) => void;
}> {
  public walletAddress: string | undefined;

  constructor(private appKit: AppKit) {
    super();
    this.appKit.subscribeAccount((newState) => {
      if (this.walletAddress !== newState.address) {
        this.walletAddress = newState.address;
        this.emit("addressChanged", this.walletAddress);
      }
    });
  }

  public openWallet() {
    this.appKit.open();
  }

  public async disconnect() {
    console.log("[WalletConnector] Disconnecting...");

    try {
      await this.appKit.adapter?.connectionControllerClient?.disconnect();
    } catch (e) {
      console.error(e);
    }
  }

  public async readContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(parameters: ReadContractParameters<abi, functionName, args, Config>) {
    return await readContract(
      (this.appKit.adapters![0] as WagmiAdapter).wagmiConfig,
      parameters,
    );
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
    return await writeContract(
      (this.appKit.adapters![0] as WagmiAdapter).wagmiConfig,
      parameters,
    );
  }
}
