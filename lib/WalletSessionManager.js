import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import { getAddress, } from "viem";
import WalletConnector from "./WalletConnector.js";
export default class WalletSessionManager extends EventContainer {
    appKit;
    connector;
    store = new Store("wallet-session-manager");
    getWalletAddress() {
        return this.store.get("walletAddress");
    }
    constructor(appKit) {
        super();
        this.appKit = appKit;
        this.connector = new WalletConnector(appKit).on("addressChanged", (walletAddress) => {
            if (walletAddress)
                walletAddress = getAddress(walletAddress);
            console.log("[WalletSessionManager] Wallet address changed", this.getWalletAddress(), walletAddress);
            if (this.getWalletAddress()) {
                if (walletAddress === undefined) {
                    this.store.remove("walletAddress");
                    this.emit("sessionChanged", undefined);
                }
                else if (walletAddress !== this.getWalletAddress()) {
                    this.disconnect();
                }
            }
            else if (walletAddress !== undefined) {
                this.store.setPermanent("walletAddress", walletAddress);
                this.emit("sessionChanged", walletAddress);
            }
        });
    }
    openWallet() {
        this.connector.openWallet();
    }
    async disconnect() {
        console.log("[WalletSessionManager] Disconnecting...");
        this.store.remove("walletAddress");
        await this.connector.disconnect();
    }
    async readContract(parameters) {
        return await this.connector.readContract(parameters);
    }
    async writeContract(parameters) {
        if (!this.getWalletAddress())
            throw new Error("Not connected");
        if (this.connector.walletAddress !== this.getWalletAddress()) {
            throw new Error("Wallet address mismatch");
        }
        return await this.connector.writeContract(parameters);
    }
}
//# sourceMappingURL=WalletSessionManager.js.map