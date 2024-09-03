import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { BrowserProvider, Eip1193Provider } from "ethers";
import WalletConnector, { WalletConnectorOptions } from "./WalletConnector.js";

class CoinbaseWalletConnector implements WalletConnector {
  private eip1193Provider: Eip1193Provider | undefined;

  public init(options: WalletConnectorOptions) {
    this.eip1193Provider = new CoinbaseWalletSDK({
      appName: options.name,
      appLogoUrl: options.icon,
    }).makeWeb3Provider();
  }

  public async connect() {
    if (!this.eip1193Provider) {
      throw new Error("Coinbase Wallet not initialized");
    }
    await this.eip1193Provider.request({ method: "eth_requestAccounts" });
    return new BrowserProvider(this.eip1193Provider);
  }
}

export default new CoinbaseWalletConnector();
