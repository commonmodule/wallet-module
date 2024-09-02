import { EventContainer } from "@common-module/ts";
import { Store } from "../../app-module/lib/index.js";
import WalletLoginPopup from "./WalletLoginPopup.js";
import WalletTokenManager from "./WalletTokenManager.js";

class WalletLoginManager extends EventContainer<{
  loginStatusChanged: () => void;
}> {
  private store = new Store("wallet-login-manager");

  public get loggedInWallet(): string | undefined {
    return this.store.get("loggedInWallet");
  }

  public get loggedInAddress(): string | undefined {
    return this.store.get("loggedInAddress");
  }

  public get loggedIn(): boolean {
    return WalletTokenManager.token !== undefined &&
      this.loggedInAddress !== undefined &&
      this.loggedInWallet !== undefined;
  }

  public async login() {
    const { walletId, walletAddress } = await new WalletLoginPopup().wait();
    //TODO:
    console.log(walletId, walletAddress);
  }

  public logout(): void {
    //TODO:
    console.log("logout");
  }
}

export default new WalletLoginManager();
