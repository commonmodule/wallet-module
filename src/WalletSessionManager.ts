import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import { AppKit } from "@reown/appkit";
import {
  Config,
  ReadContractParameters,
  WriteContractParameters,
} from "@wagmi/core";
import {
  type Abi,
  type ContractFunctionArgs,
  type ContractFunctionName,
  getAddress,
} from "viem";
import WalletConnector from "./WalletConnector.js";

export default class WalletSessionManager extends EventContainer<{
  sessionChanged: (walletAddress: string | undefined) => void;
}> {
  private connector: WalletConnector;
  private store = new Store("wallet-session-manager");

  public getWalletAddress() {
    return this.store.get<string>("walletAddress");
  }

  constructor(public appKit: AppKit) {
    super();
    this.connector = new WalletConnector(appKit).on(
      "addressChanged",
      (walletAddress) => {
        if (walletAddress) walletAddress = getAddress(walletAddress);

        console.log(
          "[WalletSessionManager] Wallet address changed",
          this.getWalletAddress(),
          walletAddress,
        );

        if (this.getWalletAddress()) {
          if (walletAddress === undefined) {
            this.store.remove("walletAddress");
            this.emit("sessionChanged", undefined);
          } else if (walletAddress !== this.getWalletAddress()) {
            this.disconnect();
          }
        } else if (walletAddress !== undefined) {
          this.store.setPermanent("walletAddress", walletAddress);
          this.emit("sessionChanged", walletAddress);
        }
      },
    );
  }

  public openWallet() {
    this.connector.openWallet();
  }

  public async disconnect() {
    console.log("[WalletSessionManager] Disconnecting...");

    this.store.remove("walletAddress");
    await this.connector.disconnect();
  }

  public async readContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(parameters: ReadContractParameters<abi, functionName, args, Config>) {
    return await this.connector.readContract(parameters);
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
    if (this.connector.walletAddress !== this.getWalletAddress()) {
      throw new Error("Wallet address mismatch");
    }
    return await this.connector.writeContract(parameters);
  }
}
