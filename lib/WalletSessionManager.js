import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import WalletConnectionModal from "./components/WalletConnectionModal.js";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
class WalletSessionManager extends EventContainer {
    store = new Store("wallet-session-manager");
    get connectedWallet() {
        return this.store.get("connectedWallet");
    }
    get connectedAddress() {
        return this.store.get("connectedAddress");
    }
    get isConnected() {
        return !!this.connectedWallet && !!this.connectedAddress;
    }
    init() {
        UniversalWalletConnector.init();
    }
    async connect() {
        const result = await new WalletConnectionModal().waitForLogin();
        this.store.setPermanent("connectedWallet", result.walletId);
        this.store.setPermanent("connectedAddress", result.walletAddress);
        this.emit("sessionChanged");
    }
    disconnect() {
        UniversalWalletConnector.disconnect();
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        this.emit("sessionChanged");
    }
}
export default new WalletSessionManager();
//# sourceMappingURL=WalletSessionManager.js.map