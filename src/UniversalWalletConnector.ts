import { BrowserProvider } from "ethers";
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

  public init(options: WalletConnectorOptions | WalletConnectConnectorOptions) {
    this.options = options;
    for (const walletConnector of Object.values(this.walletConnectors)) {
      walletConnector.init(options);
    }
  }

  public checkDisplayMode(walletId: string): "modal" | "extension" {
    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);
    return connector.checkDisplayMode();
  }

  public async connect(walletId: string): Promise<BrowserProvider> {
    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);
    return await connector.connect();
  }

  public async disconnect(walletId: string): Promise<void> {
    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);
    await connector.disconnect();
  }

  public async addChain(walletId: string, chainName: string): Promise<void> {
    if (!this.options) throw new Error("Options not initialized");

    const chainInfo = this.options?.chains[chainName];
    if (!chainInfo) throw new Error(`Chain ${chainName} not found`);

    const connector = this.walletConnectors[walletId];
    if (!connector) throw new Error(`Unsupported walletId: ${walletId}`);

    await connector.addChain(chainInfo);
  }
}

export default new UniversalWalletConnector();
