import { BrowserProvider, Eip1193Provider } from "ethers";
import WalletConnector from "./WalletConnector.js";

class CoinbaseWalletConnector implements WalletConnector {
  private eip1193Provider: Eip1193Provider | undefined;

  public async connect() {
    if (!this.eip1193Provider) {
      throw new Error("Coinbase Wallet not initialized");
    }
    await this.eip1193Provider.request({ method: "eth_requestAccounts" });
    return new BrowserProvider(this.eip1193Provider);
  }
}

export default new CoinbaseWalletConnector();
