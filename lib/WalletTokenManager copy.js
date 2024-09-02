import { TokenManager } from "@common-module/ts";
import { Store } from "../../app-module/lib/index.js";
class WalletTokenManager extends TokenManager {
    store = new Store("wallet-token-manager");
    get loggedInWallet() {
        return this.store.get("loggedInWallet");
    }
    get loggedInAddress() {
        return this.store.get("loggedInAddress");
    }
    get token() {
        return this.store.get("token");
    }
    get loggedIn() {
        return !!this.token;
    }
    login() {
        console.log("login");
    }
}
export default new WalletTokenManager();
//# sourceMappingURL=WalletTokenManager%20copy.js.map