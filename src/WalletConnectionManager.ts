import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import { JsonRpcSigner } from "ethers";
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

  public async getSigner(): Promise<JsonRpcSigner> {
    if (!this.isConnected) throw new Error("Not connected");

    const provider = await UniversalWalletConnector.connect(
      this.connectedWallet!,
    );

    const accounts = await provider.listAccounts();
    if (accounts.length === 0) throw new Error("No accounts found");
    const walletAddress = accounts[0].address;

    if (!this.connectedAddress || walletAddress !== this.connectedAddress) {
      throw new Error("Connected wallet address does not match");
    }

    return await provider.getSigner();
  }
}

export default new WalletConnectionManager();
