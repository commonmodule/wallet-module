import { Store } from "@common-module/app";
import { ConfirmDialog, ErrorDialog } from "@common-module/app-components";
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

class WalletSessionManager extends EventContainer<{
  sessionChanged: (connected: boolean) => void;
}> {
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
    UniversalWalletConnector.init(this.getConnectedWallet());
  }

  public async connect() {
    this.disconnect();

    const result = await new WalletConnectionModal().waitForLogin();

    const currentIsConnected = this.isConnected();

    this.store.setPermanent("connectedWallet", result.walletId);
    this.store.setPermanent("connectedAddress", result.walletAddress);

    if (currentIsConnected !== this.isConnected()) {
      this.emit("sessionChanged", this.isConnected());
    }
  }

  public disconnect() {
    UniversalWalletConnector.disconnect();

    const currentIsConnected = this.isConnected();

    this.store.remove("connectedWallet");
    this.store.remove("connectedAddress");

    if (currentIsConnected !== this.isConnected()) {
      this.emit("sessionChanged", this.isConnected());
    }
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
      this.showConnectWalletDialog();
      throw new Error("Not connected");
    }

    if (UniversalWalletConnector.getAddress() !== this.getConnectedAddress()) {
      this.showWalletMismatchDialog();
      throw new Error("Wallet address mismatch");
    }

    if (!parameters.chainId) throw new Error("Chain ID not provided");

    const chainId = UniversalWalletConnector.getChainId();
    if (chainId !== parameters.chainId) {
      this.showSwitchNetworkDialog(chainId, parameters.chainId);
      throw new Error("Chain mismatch");
    }

    try {
      parameters.account = this.getConnectedAddress() as any;
      return await UniversalWalletConnector.writeContract(parameters);
    } catch (error: any) {
      if (error instanceof ContractFunctionExecutionError) {
        const match = error.message.match(
          /The current chain of the wallet \(id: (\d+)\) does not match the target chain for the transaction \(id: (\d+)/,
        );
        if (match) {
          this.showSwitchNetworkDialog(parseInt(match[1]), parseInt(match[2]));
        }
      } else {
        new ErrorDialog({
          title: "Transaction Failed",
          message: error.message,
        });
      }

      throw error;
    }
  }

  private showConnectWalletDialog() {
    new ConfirmDialog(".connect-wallet", {
      title: "Connect Wallet",
      message:
        "You need to connect your wallet to execute this transaction. Would you like to connect your wallet now?",
      confirmButtonTitle: "Connect Wallet",
      onConfirm: () => {
        this.connect();
      },
    });
  }

  private showWalletMismatchDialog() {
    const currentWalletAddress = UniversalWalletConnector.getAddress();
    const requiredWalletAddress = this.getConnectedAddress();

    new ConfirmDialog(".wallet-mismatch", {
      title: "Wallet Address Mismatch",
      message:
        `Your current wallet address (${currentWalletAddress}) differs from the connected wallet address (${requiredWalletAddress}). Would you like to reconnect your wallet with the correct address?`,
      confirmButtonTitle: "Reconnect Wallet",
      onConfirm: () => {
        this.connect();
      },
    });
  }

  private showSwitchNetworkDialog(
    currentChainId: number | undefined,
    targetChainId: number,
  ) {
    const currentChainName = currentChainId
      ? getChainById(currentChainId)?.name ?? "Unknown"
      : "Unknown";
    const targetChainName = getChainById(targetChainId)?.name ?? "Unknown";

    new ConfirmDialog(".switch-network", {
      title: "Switch Network",
      message:
        `You are currently connected to ${currentChainName}. Unable to execute transaction on ${targetChainName}. Would you like to switch to ${targetChainName}?`,
      confirmButtonTitle: "Switch Network",
      onConfirm: () => {
        UniversalWalletConnector.switchChain(targetChainId);
      },
    });
  }
}

export default new WalletSessionManager();
