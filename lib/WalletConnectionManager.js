import { Store } from "@common-module/app";
class WalletConnectionManager {
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