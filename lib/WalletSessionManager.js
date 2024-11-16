import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import WalletConnector from "./WalletConnector.js";
class WalletSessionManager extends EventContainer {
    store = new Store("wallet-session-manager");
    getWalletAddress() {
        return this.store.get("walletAddress");
    }
    constructor() {
        super();
        WalletConnector.on("addressChanged", (walletAddress) => {
            if (this.getWalletAddress()) {
                if (walletAddress === undefined) {
                    this.store.remove("walletAddress");
                    this.emit("sessionChanged", undefined);
                }
                else if (walletAddress !== this.getWalletAddress()) {
                    WalletConnector.disconnect();
                }
            }
            else if (walletAddress !== undefined) {
                this.store.setPermanent("walletAddress", walletAddress);
                this.emit("sessionChanged", walletAddress);
            }
        });
    }
    init(options) {
        WalletConnector.init(options);
    }
    openModal() {
        WalletConnector.openModal();
    }
    async readContract(parameters) {
        return await WalletConnector.readContract(parameters);
    }
    async writeContract(parameters) {
        if (!this.getWalletAddress())
            throw new Error("Not connected");
        if (WalletConnector.walletAddress !== this.getWalletAddress()) {
            throw new Error("Wallet address mismatch");
        }
        return await WalletConnector.writeContract(parameters);
    }
}
export default new WalletSessionManager();
//# sourceMappingURL=WalletSessionManager.js.map