import { BrowserProvider, JsonRpcProvider } from "ethers";
import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector, {
  WalletConnectConnectorOptions,
} from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector, {
  WalletConnectorOptions,
} from "./wallet-connectors/WalletConnector.js";

class UniversalWalletConnector {
  public walletConnectors: { [walletId: string]: WalletConnector } = {
    "walletconnect": WalletConnectConnector,
    "metamask": MetaMaskConnector,
    "coinbase-wallet": CoinbaseWalletConnector,
  };

  private options:
    | WalletConnectorOptions
    | WalletConnectConnectorOptions
    | undefined;

  private viewProvider: Record<string, JsonRpcProvider> = {};

  public init(options: WalletConnectorOptions | WalletConnectConnectorOptions) {
    this.options = options;
    for (const walletConnector of Object.values(this.walletConnectors)) {
      walletConnector.init(options);
    }
  }

  public getDisplayMode(walletId: string): "modal" | "extension" {
    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);
    return connector.displayMode;
  }

  public async connect(walletId: string): Promise<string | undefined> {
    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);
    return await connector.connect();
  }

  public disconnectAll() {
    for (const connector of Object.values(this.walletConnectors)) {
      connector.disconnect();
    }
  }

  public async getBalance(
    chainName: string,
    walletAddress: string,
  ): Promise<bigint> {
    let viewProvider = this.viewProvider[chainName];
    if (!viewProvider) {
      const chainInfo = this.options?.chains[chainName];
      if (!chainInfo) throw new Error(`Chain ${chainName} not found`);

      viewProvider = this.viewProvider[chainName] = new JsonRpcProvider(
        chainInfo.rpc,
      );
    }

    return await viewProvider.getBalance(walletAddress);
  }

  public getConnectedProvider(walletId: string): BrowserProvider | undefined {
    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);
    return connector.connectedProvider;
  }

  public async addChain(walletId: string, chainName: string): Promise<void> {
    if (!this.options) throw new Error("Options not initialized");

    const chainInfo = this.options?.chains[chainName];
    if (!chainInfo) throw new Error(`Chain ${chainName} not found`);

    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);

    await connector.addChain(chainInfo);
  }

  public async switchChain(walletId: string, chainName: string): Promise<void> {
    if (!this.options) throw new Error("Options not initialized");

    const chainInfo = this.options?.chains[chainName];
    if (!chainInfo) throw new Error(`Chain ${chainName} not found`);

    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);

    await connector.addChain(chainInfo); // add chain if not already added
    await connector.switchChain(chainInfo);
  }
}

export default new UniversalWalletConnector();
