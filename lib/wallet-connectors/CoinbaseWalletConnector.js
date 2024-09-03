import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { BrowserProvider } from "ethers";
class CoinbaseWalletConnector {
    eip1193Provider;
    init(options) {
        this.eip1193Provider = new CoinbaseWalletSDK({
            appName: options.name,
            appLogoUrl: options.icon,
        }).makeWeb3Provider();
    }
    async connect() {
        if (!this.eip1193Provider) {
            throw new Error("Coinbase Wallet not initialized");
        }
        await this.eip1193Provider.request({ method: "eth_requestAccounts" });
        return new BrowserProvider(this.eip1193Provider);
    }
}
export default new CoinbaseWalletConnector();
//# sourceMappingURL=CoinbaseWalletConnector.js.map