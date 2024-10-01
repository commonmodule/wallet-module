import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import UniversalWalletConnector from "./UniversalWalletConnector.js";

class WalletConnectionManager extends EventContainer<{
  connectionChanged: () => void;
}> {
  private store = new Store("wallet-connection-manager");

  public get connectedWallet() {
    return this.store.get<string>("connectedWallet");
  }

  public get connectedAddress() {
    return this.store.get<string>("connectedAddress");
  }

  public get isConnected() {
    return !!this.connectedWallet && !!this.connectedAddress;
  }

  public addConnectionInfo(walletId: string, walletAddress: string) {
    this.store.setPermanent("connectedWallet", walletId);
    this.store.setPermanent("connectedAddress", walletAddress);
    this.emit("connectionChanged");
  }

  public async disconnect() {
    this.store.remove("connectedWallet");
    this.store.remove("connectedAddress");
    this.emit("connectionChanged");
  }

  public async addChain(chainName: string): Promise<void> {
    if (!this.connectedWallet) throw new Error("Not connected");
    await UniversalWalletConnector.addChain(this.connectedWallet, chainName);
  }
}

export default new WalletConnectionManager();
