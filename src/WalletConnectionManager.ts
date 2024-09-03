import { Store } from "@common-module/app";

class WalletConnectionManager {
  private store = new Store("wallet-connection-manager");

  public get connectedWallet() {
    return this.store.get("connectedWallet");
  }

  public get connectedAddress() {
    return this.store.get("connectedAddress");
  }
}

export default new WalletConnectionManager();
