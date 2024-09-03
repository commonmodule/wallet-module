import { EventContainer } from "@common-module/ts";
import WalletConnectionManager from "./WalletConnectionManager.js";
import WalletLoginPopup from "./WalletLoginPopup.js";
import WalletTokenManager from "./WalletTokenManager.js";

class WalletLoginManager extends EventContainer<{
  loginStatusChanged: () => void;
}> {
  public get loggedIn() {
    return WalletTokenManager.token !== undefined &&
      WalletConnectionManager.connectedAddress !== undefined &&
      WalletConnectionManager.connectedWallet !== undefined;
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
