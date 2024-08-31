import { Store } from "@common-module/app";

class WalletAuthManager {
  private store = new Store("wallet-auth");
}

export default new WalletAuthManager();
