import { TokenManager } from "@common-module/ts";

class WalletTokenManager extends TokenManager {
  public getToken(): string | undefined {
    //TODO:
    return "wallet token";
  }
}

export default new WalletTokenManager();
