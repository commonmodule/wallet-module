import { Confirm, EventContainerV2, MaterialIcon, Store, } from "@common-module/app";
import WalletLoginPopup from "./WalletLoginPopup.js";
import CoinbaseWallet from "./wallets/CoinbaseWallet.js";
import MetaMask from "./wallets/MetaMask.js";
import WalletConnect from "./wallets/WalletConnect.js";
class WalletService extends EventContainerV2 {
    store = new Store("walletServiceStore");
    wallets = {
        "walletconnect": WalletConnect,
        "metamask": MetaMask,
        "coinbase-wallet": CoinbaseWallet,
    };
    tryLogin = async () => await new WalletLoginPopup().wait();
    init(options) {
        for (const [walletName, wallet] of Object.entries(this.wallets)) {
            wallet.init(options);
            wallet.on("addressChanged", (walletAddress) => {
                if (walletName === this.loggedInWallet) {
                    this.store.set("loggedInAddress", walletAddress);
                    this.emit("addressChanged", walletAddress);
                }
            });
        }
    }
    openWallet() {
        if (!this.loggedInWallet)
            throw new Error("Not logged in");
        this.wallets[this.loggedInWallet].open();
    }
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
        if (!this.loggedInWallet) {
            try {
                await new Confirm({
                    icon: new MaterialIcon("warning"),
                    title: "Login Required",
                    message: "You need to be logged in to perform this action. Would you like to log in using your wallet?",
                }).wait();
                await this.login();
                return await this.getSigner(targetChainId);
            }
            catch (e) {
                throw e;
            }
        }
        const provider = await this.connect(this.loggedInWallet);
        const walletAddress = (await provider.listAccounts())[0]
            ?.address;
        if (!walletAddress || walletAddress !== this.loggedInAddress) {
            try {
                await new Confirm({
                    icon: new MaterialIcon("warning"),
                    title: "Wallet Address Mismatch",
                    message: "The current connected wallet address doesn't match the logged-in address. Would you like to log in again?",
                }).wait();
                await this.logout();
                await this.login();
                return await this.getSigner(targetChainId);
            }
            catch (e) {
                throw e;
            }
        }
        const currentChainId = Number((await provider.getNetwork()).chainId);
        if (currentChainId !== targetChainId) {
            await this.wallets[this.loggedInWallet].switchChain(targetChainId);
            return await this.getSigner(targetChainId);
        }
        return provider.getSigner();
    }
}
export default new WalletService();
//# sourceMappingURL=WalletService.js.map