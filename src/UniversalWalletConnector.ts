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

  public async connectAndGetProvider(
    walletId: string,
  ): Promise<BrowserProvider> {
    const walletConnector = this.walletConnectors[walletId];
    if (!walletConnector) throw new Error(`Unsupported walletId: ${walletId}`);
    return await walletConnector.connect();
  }

  public async connectAndGetAddress(walletId: string): Promise<string> {
    const provider = await this.connectAndGetProvider(walletId);
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) throw new Error("No accounts found");
    return accounts[0].address;
  }

  public async addChain(walletId: string, chainName: string): Promise<void> {
    const chainInfo = this.options?.chains[chainName];
    if (!chainInfo) throw new Error(`Chain ${chainName} not found`);

    const walletConnector = this.walletConnectors[walletId];
    if (!walletConnector) throw new Error(`Unsupported walletId: ${walletId}`);

    await walletConnector.addChain(chainInfo);
  }
}

export default new UniversalWalletConnector();
