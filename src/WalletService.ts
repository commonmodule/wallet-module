import { EventContainerV2, Store } from "@common-module/app";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import Wallet from "./wallets/Wallet.js";

class WalletService extends EventContainerV2<{
  tryLogin: () => Promise<string>;
  addressChanged: (address: string) => void;
}> {
  private store = new Store("walletServiceStore");
  private wallets: { [walletName: string]: Wallet } = {};

  private async connect(walletName: string): Promise<BrowserProvider> {
    const wallet = this.wallets[walletName];
    if (!wallet) throw new Error(`Wallet ${walletName} not found`);
    return await wallet.connect();
  }

  public async disconnect() {
    for (const wallet of Object.values(this.wallets)) {
      await wallet.disconnect();
    }
  }

  public get loggedInWallet(): string | undefined {
    return this.store.get("loggedInWallet");
  }

  public get loggedInAddress(): string | undefined {
    return this.store.get("loggedInAddress");
  }

  public async login() {
    const walletName = await this.emit("tryLogin");
    const provider = await this.connect(walletName);
    const walletAddress: string | undefined = (await provider.listAccounts())[0]
      ?.address;
    if (walletAddress) {
      if (walletAddress !== this.loggedInAddress) {
        this.emit("addressChanged", walletAddress);
      }
      this.store.set("loggedInWallet", walletName);
      this.store.set("loggedInAddress", walletAddress);
    }
  }

  public async logout() {
    this.store.delete("loggedInWallet");
    this.store.delete("loggedInAddress");
    await this.disconnect();
  }

  public async getSigner(targetChainId: number): Promise<JsonRpcSigner> {
    if (!this.loggedInWallet) throw new Error("Not logged in");
    const provider = await this.connect(this.loggedInWallet);
    let currentChainId = Number((await provider.getNetwork()).chainId);
    if (currentChainId !== targetChainId) {
      await this.wallets[this.loggedInWallet].switchChain(targetChainId);
    }
    currentChainId = Number((await provider.getNetwork()).chainId);
    if (currentChainId !== targetChainId) {
      throw new Error("Failed to switch chain");
    }
    return provider.getSigner();
  }
}

export default new WalletService();
