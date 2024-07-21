import {
  Confirm,
  EventContainerV2,
  MaterialIcon,
  Store,
} from "@common-module/app";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import ChainInfo from "./ChainInfo.js";
import WalletLoginPopup from "./WalletLoginPopup.js";
import CoinbaseWallet from "./wallets/CoinbaseWallet.js";
import MetaMask from "./wallets/MetaMask.js";
import Wallet from "./wallets/Wallet.js";
import WalletConnect from "./wallets/WalletConnect.js";

class WalletService extends EventContainerV2<{
  addressChanged: (address: string) => void;
}> {
  private store = new Store("walletServiceStore");
  private wallets: { [walletId: string]: Wallet } = {
    "walletconnect": WalletConnect,
    "metamask": MetaMask,
    "coinbase-wallet": CoinbaseWallet,
  };

  public tryLogin = async () => await new WalletLoginPopup().wait();
  public init(options: {
    name: string;
    icon: string;
    description: string;
    chains: { [name: string]: ChainInfo };
    walletConnectProjectId: string;
  }) {
    for (const [walletName, wallet] of Object.entries(this.wallets)) {
      wallet.init(options);
      wallet.on("addressChanged", (walletAddress) => {
        if (walletName === this.loggedInWallet) {
          this.store.set("loggedInAddress", walletAddress);
          this.emit("addressChanged", walletAddress);
        }
      });
    }
  }

  public openWallet() {
    if (!this.loggedInWallet) throw new Error("Not logged in");
    this.wallets[this.loggedInWallet].open();
  }

  private async connect(walletId: string): Promise<BrowserProvider> {
    const wallet = this.wallets[walletId];
    if (!wallet) throw new Error(`Wallet ${walletId} not found`);
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

  public get loggedIn(): boolean {
    return !!this.loggedInAddress;
  }

  public async login() {
    const walletId = await this.tryLogin();
    const provider = await this.connect(walletId);
    const walletAddress: string | undefined = (await provider.listAccounts())[0]
      ?.address;
    if (walletAddress) {
      if (walletAddress !== this.loggedInAddress) {
        this.emit("addressChanged", walletAddress);
      }
      this.store.set("loggedInWallet", walletId);
      this.store.set("loggedInAddress", walletAddress);
    }
  }

  public async logout() {
    this.store.delete("loggedInWallet");
    this.store.delete("loggedInAddress");
    await this.disconnect();
  }

  public async getSigner(targetChainId: number): Promise<JsonRpcSigner> {
    if (!this.loggedInWallet) {
      try {
        await new Confirm({
          icon: new MaterialIcon("warning"),
          title: "Login Required",
          message:
            "You need to be logged in to perform this action. Would you like to log in using your wallet?",
        }).wait();

        await this.login();
        return await this.getSigner(targetChainId);
      } catch (e) {
        throw e;
      }
    }

    const provider = await this.connect(this.loggedInWallet);
    const walletAddress: string | undefined = (await provider.listAccounts())[0]
      ?.address;
    if (!walletAddress || walletAddress !== this.loggedInAddress) {
      try {
        await new Confirm({
          icon: new MaterialIcon("warning"),
          title: "Wallet Address Mismatch",
          message:
            "The current connected wallet address doesn't match the logged-in address. Would you like to log in again?",
        }).wait();

        await this.logout();
        await this.login();
        return await this.getSigner(targetChainId);
      } catch (e) {
        throw e;
      }
    }

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
