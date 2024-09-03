import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
class WalletConnectionManager extends EventContainer {
    store = new Store("wallet-connection-manager");
    get connectedWallet() {
        return this.store.get("connectedWallet");
    }
    get connectedAddress() {
        return this.store.get("connectedAddress");
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map