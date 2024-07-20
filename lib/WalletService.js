import { EventContainerV2, Store } from "@common-module/app";
class WalletService extends EventContainerV2 {
    store = new Store("walletServiceStore");
    wallets = {};
    async connect(walletName) {
        const wallet = this.wallets[walletName];
        if (!wallet)
            throw new Error(`Wallet ${walletName} not found`);
        return await wallet.connect();
    }
    async disconnect() {
        for (const wallet of Object.values(this.wallets)) {
            await wallet.disconnect();
        }
    }
    get loggedInWallet() {
        return this.store.get("loggedInWallet");
    }
    get loggedInAddress() {
        return this.store.get("loggedInAddress");
    }
    async login() {
        const walletName = await this.emit("tryLogin");
        const provider = await this.connect(walletName);
        const walletAddress = (await provider.listAccounts())[0]
            ?.address;
        if (walletAddress) {
            if (walletAddress !== this.loggedInAddress) {
                this.emit("addressChanged", walletAddress);
            }
            this.store.set("loggedInWallet", walletName);
            this.store.set("loggedInAddress", walletAddress);
        }
    }
    async logout() {
        this.store.delete("loggedInWallet");
        this.store.delete("loggedInAddress");
        await this.disconnect();
    }
    async getSigner(targetChainId) {
        if (!this.loggedInWallet)
            throw new Error("Not logged in");
        const provider = await this.connect(this.loggedInWallet);
        let currentChainId = Number((await provider.getNetwork()).chainId);
        if (currentChainId !== targetChainId) {
            await this.wallets[this.loggedInWallet].switchChain(targetChainId);
        }
        currentChainId = Number((await provider.getNetwork()).chainId);
        if (currentChainId !== targetChainId) {
            throw new Error("Failed to switch chain");
        }
        return provider.getSigner();
    }
}
export default new WalletService();
//# sourceMappingURL=WalletService.js.map