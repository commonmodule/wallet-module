import { EventContainer } from "@common-module/ts";
import { Store } from "../../app-module/lib/index.js";
import WalletTokenManager from "./WalletTokenManager.js";
class WalletLoginManager extends EventContainer {
    store = new Store("wallet-login-manager");
    get loggedInWallet() {
        return this.store.get("loggedInWallet");
    }
    get loggedInAddress() {
        return this.store.get("loggedInAddress");
    }
    get loggedIn() {
        return WalletTokenManager.token !== undefined &&
            this.loggedInAddress !== undefined &&
            this.loggedInWallet !== undefined;
    }
    login() {
        console.log("login");
    }
    logout() {
        console.log("logout");
    }
}
export default new WalletLoginManager();
//# sourceMappingURL=WalletLoginManager.js.map