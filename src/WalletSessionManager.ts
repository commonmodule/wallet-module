import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import WalletConnectionModal from "./components/WalletConnectionModal.js";
import UniversalWalletConnector from "./UniversalWalletConnector.js";

class WalletSessionManager
  extends EventContainer<{ sessionChanged: () => void }> {
  private store = new Store("wallet-session-manager");

  public get connectedWallet() {
    return this.store.get<string>("connectedWallet");
  }
  public get connectedAddress() {
    return this.store.get<string>("connectedAddress");
  }
  public get isConnected() {
    return !!this.connectedWallet && !!this.connectedAddress;
  }

  public init() {
    UniversalWalletConnector.init();
  }

  public async connect() {
    const result = await new WalletConnectionModal().waitForLogin();

    this.store.setPermanent("connectedWallet", result.walletId);
    this.store.setPermanent("connectedAddress", result.walletAddress);

    this.emit("sessionChanged");
  }

  public disconnect() {
    UniversalWalletConnector.disconnect();

    this.store.remove("connectedWallet");
    this.store.remove("connectedAddress");

    this.emit("sessionChanged");
  }
}

export default new WalletSessionManager();
