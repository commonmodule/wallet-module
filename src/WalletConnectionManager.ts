import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";

class WalletConnectionManager extends EventContainer<{
  connectionChanged: () => void;
}> {
  private store = new Store("wallet-connection-manager");

  public get connectedWallet() {
    return this.store.get("connectedWallet");
  }

  public get connectedAddress() {
    return this.store.get("connectedAddress");
  }
}

export default new WalletConnectionManager();
