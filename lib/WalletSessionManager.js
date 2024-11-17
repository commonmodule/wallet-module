import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import WalletConnectionModal from "./components/WalletConnectionModal.js";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
class WalletSessionManager extends EventContainer {
    store = new Store("wallet-session-manager");
    getConnectedWallet() {
        return this.store.get("connectedWallet");
    }
    getConnectedAddress() {
        return this.store.get("connectedAddress");
    }
    isConnected() {
        return !!this.getConnectedWallet() && !!this.getConnectedAddress();
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
    async getBalance(chainId, walletAddress) {
        return await UniversalWalletConnector.getBalance(chainId, walletAddress);
    }
    async readContract(parameters) {
        return await UniversalWalletConnector.readContract(parameters);
    }
    async writeContract(parameters) {
        if (!this.getConnectedAddress())
            throw new Error("Not connected");
        if (UniversalWalletConnector.getAddress() !== this.getConnectedAddress()) {
            throw new Error("Wallet address mismatch");
        }
        if (parameters.chainId !== UniversalWalletConnector.getChainId()) {
            throw new Error("Chain mismatch");
        }
        return await UniversalWalletConnector.writeContract(parameters);
    }
}
export default new WalletSessionManager();
//# sourceMappingURL=WalletSessionManager.js.map