import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
import WalletConnectionPopup from "./WalletConnectionPopup.js";
class WalletConnectionManager extends EventContainer {
    store = new Store("wallet-connection-manager");
    get connectedWallet() {
        return this.store.get("connectedWallet");
    }
    get connectedAddress() {
        return this.store.get("connectedAddress");
    }
    async connect() {
        const { walletId, walletAddress } = await new WalletConnectionPopup()
            .wait();
        this.store.set("connectedWallet", walletId);
        this.store.set("connectedAddress", walletAddress);
        this.emit("connectionChanged");
    }
    async disconnect() {
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        this.emit("connectionChanged");
    }
    async addChain(chainName) {
        if (!this.connectedWallet)
            await this.connect();
        if (!this.connectedWallet)
            throw new Error("Not connected");
        await UniversalWalletConnector.addChain(this.connectedWallet, chainName);
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map