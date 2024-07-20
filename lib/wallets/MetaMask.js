import { BrowserProvider } from "ethers";
class MetaMask {
    init(options) { }
    async connect() {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            return new BrowserProvider(window.ethereum);
        }
        else if (this.metaMaskSdk) {
            await this.metaMaskSdk.connect();
            this.eip1193Provider = this.metaMaskSdk.getProvider();
            if (this.eip1193Provider) {
                this.provider = new ethers.BrowserProvider(this.eip1193Provider);
                return true;
            }
        }
    }
    async disconnect() {
        throw new Error("Method not implemented.");
    }
    async switchChain(chainId) {
        throw new Error("Method not implemented.");
    }
}
export default new MetaMask();
//# sourceMappingURL=MetaMask.js.map