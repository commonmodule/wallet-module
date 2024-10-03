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
    get isConnected() {
        return !!this.connectedWallet && !!this.connectedAddress;
    }
    addConnectionInfo(walletId, walletAddress) {
        this.store.setPermanent("connectedWallet", walletId);
        this.store.setPermanent("connectedAddress", walletAddress);
        this.emit("connectionChanged");
    }
    async disconnect() {
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        this.emit("connectionChanged");
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map