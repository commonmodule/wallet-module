import { Store } from "@common-module/app";
import { ConfirmDialog } from "@common-module/app-components";
import { EventContainer } from "@common-module/ts";
import {
  Config,
  ReadContractParameters,
  WriteContractParameters,
} from "@wagmi/core";
import {
  type Abi,
  type ContractFunctionArgs,
  ContractFunctionExecutionError,
  type ContractFunctionName,
} from "viem";
import * as all from "viem/chains";
import WalletConnectionModal from "./components/WalletConnectionModal.js";
import UniversalWalletConnector from "./UniversalWalletConnector.js";

const { ...chains } = all;
function getChainById(chainId: number) {
  for (const chain of Object.values(chains)) {
    if (chain.id === chainId) {
      return chain;
    }
  }
}

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
    this.disconnect();

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
    if (!this.getConnectedAddress() || !UniversalWalletConnector.getAddress()) {
      new ConfirmDialog(".connect-wallet", {
        title: "Connect Wallet",
        message:
          "Unable to execute transaction because no wallet is connected. Would you like to connect your wallet?",
        confirmButtonTitle: "Connect Wallet",
        onConfirm: () => {
          this.connect();
        },
      });
      throw new Error("Not connected");
    }

    if (UniversalWalletConnector.getAddress() !== this.getConnectedAddress()) {
      new ConfirmDialog(".reconnect-wallet", {
        title: "Reconnect Wallet",
        message:
          "Unable to execute transaction because the connected wallet address differs from your crypto wallet's current address. Would you like to reconnect your wallet?",
        confirmButtonTitle: "Reconnect Wallet",
        onConfirm: () => {
          this.connect();
        },
      });
      throw new Error("Wallet address mismatch");
    }

    if (!parameters.chainId) throw new Error("Chain ID not provided");

    const chainId = await UniversalWalletConnector.getChainId();
    if (chainId !== parameters.chainId) {
      const currentChain = getChainById(chainId)?.name ?? "Unknown";
      const targetChain = getChainById(parameters.chainId)?.name ?? "Unknown";

      await new ConfirmDialog(".switch-network", {
        title: "Switch Network",
        message:
          `You are currently connected to ${currentChain}. Unable to execute transaction on ${targetChain}. Would you like to switch to ${targetChain}?`,
        confirmButtonTitle: "Switch Network",
      }).waitForConfirmation();

      const changedChainId = await UniversalWalletConnector.switchChain(
        parameters.chainId!,
      );

      if (changedChainId !== parameters.chainId) {
        throw new Error("Chain mismatch");
      }
    }

    try {
      return await UniversalWalletConnector.writeContract(parameters);
    } catch (error) {
      if (error instanceof ContractFunctionExecutionError) {
        const pattern =
          /The current chain of the wallet \(id: (\d+)\) does not match the target chain for the transaction \(id: (\d+)/;
        const match = error.message.match(pattern);

        if (match) {
          const currentChainId = parseInt(match[1]);
          const targetChainId = parameters.chainId;

          const currentChain = getChainById(currentChainId)?.name ?? "Unknown";
          const targetChain = getChainById(targetChainId)?.name ?? "Unknown";

          new ConfirmDialog(".switch-network", {
            title: "Switch Network",
            message:
              `You are currently connected to ${currentChain}. Unable to execute transaction on ${targetChain}. Would you like to switch to ${targetChain}?`,
            confirmButtonTitle: "Switch Network",
            onConfirm: async () => {
              await UniversalWalletConnector.switchChain(targetChainId);
            },
          });
        }
      }
      throw error;
    }
  }
}

export default new WalletSessionManager();
