import { EventContainer } from "@common-module/ts";
import { BrowserProvider, ethers } from "ethers";
class WalletConnectConnector extends EventContainer {
    web3Modal;
    resolveConnection;
    rejectConnection;
    async connect() {
        if (!this.web3Modal)
            throw new Error("Web3Modal not initialized");
        const walletAddress = this.web3Modal.getAddress();
        if (walletAddress !== undefined) {
            this.emit("addressChanged", ethers.getAddress(walletAddress));
        }
        else {
            await new Promise((resolve, reject) => {
                this.resolveConnection = resolve;
                this.rejectConnection = reject;
                this.web3Modal?.open();
            });
        }
        const walletProvider = this.web3Modal.getWalletProvider();
        if (!walletProvider)
            throw new Error("Wallet provider not found");
        return new BrowserProvider(walletProvider);
    }
}
export default new WalletConnectConnector();
//# sourceMappingURL=WalletConnectConnector.js.map