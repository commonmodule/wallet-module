import { Modal } from "@common-module/app-components";
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

  public init(options: WalletConnectorOptions | WalletConnectConnectorOptions) {
    for (const walletConnector of Object.values(this.walletConnectors)) {
      walletConnector.init(options);
    }
  }

  public async connect(walletId: string) {
    const walletConnector = this.walletConnectors[walletId];
    if (!walletConnector) throw new Error(`Unsupported walletId: ${walletId}`);
    return await walletConnector.connect();
  }
}

export default new UniversalWalletConnector();
