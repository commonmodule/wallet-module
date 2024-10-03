import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
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
    async getSigner() {
        if (!this.isConnected)
            throw new Error("Not connected");
        const provider = await UniversalWalletConnector.connect(this.connectedWallet);
        const accounts = await provider.listAccounts();
        if (accounts.length === 0)
            throw new Error("No accounts found");
        const walletAddress = accounts[0].address;
        if (!this.connectedAddress || walletAddress !== this.connectedAddress) {
            throw new Error("Connected wallet address does not match");
        }
        return await provider.getSigner();
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map