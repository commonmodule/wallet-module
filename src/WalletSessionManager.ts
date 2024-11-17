import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import {
  Config,
  ReadContractParameters,
  WriteContractParameters,
} from "@wagmi/core";
import {
  type Abi,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from "viem";
import WalletConnectionModal from "./components/WalletConnectionModal.js";
import UniversalWalletConnector from "./UniversalWalletConnector.js";

class WalletSessionManager
  extends EventContainer<{ sessionChanged: () => void }> {
  private store = new Store("wallet-session-manager");

  public getConnectedWallet() {
    return this.store.get<string>("connectedWallet");
  }
  public getConnectedAddress() {
    return this.store.get<`0x${string}`>("connectedAddress");
  }
  public isConnected() {
    return !!this.getConnectedWallet() && !!this.getConnectedAddress();
  }

  public init() {
    UniversalWalletConnector.init();
  }

  public async connect() {
    const result = await new WalletConnectionModal().waitForLogin();

    this.store.setPermanent("connectedWallet", result.walletId);
    this.store.setPermanent("connectedAddress", result.walletAddress);

    this.emit("sessionChanged");
  }

  public disconnect() {
    UniversalWalletConnector.disconnect();

    this.store.remove("connectedWallet");
    this.store.remove("connectedAddress");

    this.emit("sessionChanged");
  }

  public async getBalance(chainId: number, walletAddress: `0x${string}`) {
    return await UniversalWalletConnector.getBalance(chainId, walletAddress);
  }

  public async readContract<
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, "pure" | "view">,
    args extends ContractFunctionArgs<abi, "pure" | "view", functionName>,
  >(parameters: ReadContractParameters<abi, functionName, args, Config>) {
    return await UniversalWalletConnector.readContract(parameters);
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
    if (!this.getConnectedAddress()) throw new Error("Not connected");
    if (UniversalWalletConnector.getAddress() !== this.getConnectedAddress()) {
      throw new Error("Wallet address mismatch");
    }

    if (parameters.chainId !== UniversalWalletConnector.getChainId()) {
      //TODO: Add chain switching logic
      throw new Error("Chain mismatch");
    }

    return await UniversalWalletConnector.writeContract(parameters);
  }
}

export default new WalletSessionManager();
