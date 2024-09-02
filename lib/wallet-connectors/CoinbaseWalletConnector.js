import { BrowserProvider } from "ethers";
class CoinbaseWalletConnector {
    eip1193Provider;
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