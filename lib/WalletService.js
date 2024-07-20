import { EventContainerV2, Store } from "@common-module/app";
import WalletLoginPopup from "./WalletLoginPopup.js";
class WalletService extends EventContainerV2 {
    store = new Store("walletServiceStore");
    wallets = {};
    tryLogin = async () => await new WalletLoginPopup().wait();
    async connect(walletId) {
        const wallet = this.wallets[walletId];
        if (!wallet)
            throw new Error(`Wallet ${walletId} not found`);
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
    get loggedIn() {
        return !!this.loggedInAddress;
    }
    async login() {
        const walletId = await this.tryLogin();
        const provider = await this.connect(walletId);
        const walletAddress = (await provider.listAccounts())[0]
            ?.address;
        if (walletAddress) {
            if (walletAddress !== this.loggedInAddress) {
                this.emit("addressChanged", walletAddress);
            }
            this.store.set("loggedInWallet", walletId);
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