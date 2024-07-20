import { Store } from "@common-module/app";
class WalletConnectionManager {
    store = new Store("walletConnectionStore");
    providers = {};
    addProvider(walletName, walletProvider) {
        this.providers[walletName] = walletProvider;
    }
    async connectWallet(walletName) {
        const walletProvider = this.providers[walletName];
        if (!walletProvider) {
            throw new Error(`Wallet provider ${walletName} not found`);
        }
        const walletAddress = await walletProvider.connect();
        if (walletAddress) {
            this.store.set("connectedWalletName", walletName);
            this.store.set("connectedWalletAddress", walletAddress);
        }
    }
    get connectedWalletName() {
        return this.store.get("connectedWalletName");
    }
    get connectedWalletAddress() {
        return this.store.get("connectedWalletAddress");
    }
    disconnect() {
        this.store.delete("connectedWalletName");
        this.store.delete("connectedWalletAddress");
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map