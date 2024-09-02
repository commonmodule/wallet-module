import { EventContainer } from "@common-module/ts";
import { Store } from "../../app-module/lib/index.js";
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

  public login(): void {
    //TODO:
    console.log("login");
  }

  public logout(): void {
    //TODO:
    console.log("logout");
  }
}

export default new WalletLoginManager();
