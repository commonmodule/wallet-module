import { EventContainer } from "@common-module/ts";
import { AppKit, createAppKit, Metadata } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { AppKitSIWEClient } from "@reown/appkit-siwe";
import { AppKitNetwork } from "@reown/appkit/networks";
import {
  Config,
  readContract,
  ReadContractParameters,
  writeContract,
  WriteContractParameters,
} from "@wagmi/core";
import type { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";

export interface WalletConnectorOptions {
  projectId: string;
  metadata: Metadata;
  networks: [AppKitNetwork, ...AppKitNetwork[]];
  siweConfig?: AppKitSIWEClient;
}

class WalletConnector extends EventContainer<{
  addressChanged: (walletAddress: string | undefined) => void;
}> {
  public walletAddress: string | undefined;

  private wagmiAdapter: WagmiAdapter | undefined;
  private _modal: AppKit | undefined;

  private get modal() {
    if (!this._modal) throw new Error("Modal not initialized");
    return this._modal;
  }

  private set modal(modal: AppKit) {
    this._modal = modal;
  }

  private getWagmiConfig() {
    if (!this.wagmiAdapter) throw new Error("Wagmi adapter not initialized");
    return this.wagmiAdapter.wagmiConfig;
  }

  public init(options: WalletConnectorOptions) {
    this.wagmiAdapter = new WagmiAdapter(options);

    this.modal = createAppKit({
      ...options,
      adapters: [this.wagmiAdapter],
      features: { analytics: true },
    });

    this.modal.subscribeAccount((newState) => {
      if (this.walletAddress !== newState.address) {
        this.walletAddress = newState.address;
        this.emit("addressChanged", this.walletAddress);
      }
    });
  }

  public openModal() {
    this.modal.open();
  }

  public disconnect() {
    this.modal.adapter?.connectionControllerClient?.disconnect();
  }

  public async readContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(parameters: ReadContractParameters<abi, functionName, args, Config>) {
    return await readContract(this.getWagmiConfig(), parameters);
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
    return await writeContract(this.getWagmiConfig(), parameters);
  }
}

export default new WalletConnector();
