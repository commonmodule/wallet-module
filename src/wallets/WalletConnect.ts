import { createWeb3Modal, defaultConfig, Web3Modal } from "@web3modal/ethers";
import { BrowserProvider } from "ethers";
import ChainInfo from "../ChainInfo.js";
import Wallet from "./Wallet.js";

class WalletConnect implements Wallet {
  private web3Modal!: Web3Modal;

  private resolveConnection?: () => void;
  private rejectConnection?: (error: Error) => void;

  public init(options: {
    name: string;
    icon: string;
    description: string;
    chains: { [name: string]: ChainInfo };
    walletConnectProjectId: string;
  }) {
    this.web3Modal = createWeb3Modal({
      projectId: options.walletConnectProjectId,
      ethersConfig: defaultConfig({
        metadata: {
          name: options.name,
          description: options.description,
          url: window.location.origin,
          icons: [options.icon],
        },
      }),
      chains: Object.entries(options.chains).map(([name, info]) => ({
        chainId: info.id,
        name,
        currency: info.symbol,
        rpcUrl: info.rpc,
        explorerUrl: info.explorerUrl,
      })),
    });

    this.web3Modal.subscribeEvents((newEvent) => {
      if (newEvent.data.event === "MODAL_CLOSE" && this.rejectConnection) {
        this.rejectConnection(new Error("User closed WalletConnect modal"));
        this.rejectConnection = undefined;
        this.resolveConnection = undefined;
      }
    });

    this.web3Modal.subscribeProvider((newState) => {
      if (newState.address && this.resolveConnection) {
        this.resolveConnection();
        this.rejectConnection = undefined;
        this.resolveConnection = undefined;
      }
    });
  }

  public async connect(): Promise<BrowserProvider> {
    await new Promise<void>((resolve, reject) => {
      this.resolveConnection = resolve;
      this.rejectConnection = reject;
      this.web3Modal.open();
    });
    const walletProvider = this.web3Modal.getWalletProvider();
    if (!walletProvider) throw new Error("Wallet provider not found");
    return new BrowserProvider(walletProvider);
  }

  public async disconnect(): Promise<void> {
    await this.web3Modal.disconnect();
  }

  public async switchChain(chainId: number): Promise<void> {
    await this.web3Modal.switchNetwork(chainId);
  }
}

export default new WalletConnect();
