import WalletConnectionManager from "./WalletConnectionManager.js";
import WalletLoginPopup from "./WalletLoginPopup.js";
import WalletTokenManager from "./WalletTokenManager.js";
class WalletAuthManager {
    get loggedIn() {
        return WalletTokenManager.token !== undefined &&
            WalletConnectionManager.connectedAddress !== undefined &&
            WalletConnectionManager.connectedWallet !== undefined;
    }
    async login() {
        const { walletId, walletAddress } = await new WalletLoginPopup().wait();
        console.log(walletId, walletAddress);
    }
    logout() {
        console.log("logout");
    }
}
export default new WalletAuthManager();
//# sourceMappingURL=WalletAuthManager.js.map