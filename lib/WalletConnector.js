import { EventContainer } from "@common-module/ts";
import { readContract, writeContract, } from "@wagmi/core";
export default class WalletConnector extends EventContainer {
    appKit;
    walletAddress;
    constructor(appKit) {
        super();
        this.appKit = appKit;
        this.appKit.subscribeAccount((newState) => {
            if (this.walletAddress !== newState.address) {
                this.walletAddress = newState.address;
                this.emit("addressChanged", this.walletAddress);
            }
        });
    }
    openWallet() {
        this.appKit.open();
    }
    disconnect() {
        this.appKit.adapter?.connectionControllerClient?.disconnect();
    }
    async readContract(parameters) {
        return await readContract(this.appKit.adapters[0].wagmiConfig, parameters);
    }
    async writeContract(parameters) {
        return await writeContract(this.appKit.adapters[0].wagmiConfig, parameters);
    }
}
//# sourceMappingURL=WalletConnector.js.map