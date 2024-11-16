import { EventContainer } from "@common-module/ts";
import { readContract, writeContract, } from "@wagmi/core";
import { getAddress, } from "viem";
export default class WalletConnector extends EventContainer {
    appKit;
    walletAddress;
    constructor(appKit) {
        super();
        this.appKit = appKit;
        this.appKit.subscribeAccount((newState) => {
            const walletAddress = newState.address
                ? getAddress(newState.address)
                : undefined;
            if (this.walletAddress !== walletAddress) {
                this.walletAddress = walletAddress;
                this.emit("addressChanged", walletAddress);
            }
        });
    }
    openWallet() {
        this.appKit.open();
    }
    async disconnect() {
        console.log("[WalletConnector] Disconnecting...");
        try {
            await this.appKit.adapter?.connectionControllerClient?.disconnect();
        }
        catch (e) {
            console.error(e);
        }
    }
    async readContract(parameters) {
        return await readContract(this.appKit.adapters[0].wagmiConfig, parameters);
    }
    async writeContract(parameters) {
        console.log(this.appKit.adapter, this.appKit.adapters);
        return await writeContract(this.appKit.adapters[0].wagmiConfig, parameters);
    }
}
//# sourceMappingURL=WalletConnector.js.map