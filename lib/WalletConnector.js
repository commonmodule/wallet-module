import { EventContainer } from "@common-module/ts";
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { readContract, writeContract, } from "@wagmi/core";
class WalletConnector extends EventContainer {
    walletAddress;
    wagmiAdapter;
    _modal;
    get modal() {
        if (!this._modal)
            throw new Error("Modal not initialized");
        return this._modal;
    }
    set modal(modal) {
        this._modal = modal;
    }
    getWagmiConfig() {
        if (!this.wagmiAdapter)
            throw new Error("Wagmi adapter not initialized");
        return this.wagmiAdapter.wagmiConfig;
    }
    init(options) {
        this.wagmiAdapter = new WagmiAdapter(options);
        this.modal = createAppKit({
            ...options,
            adapters: [this.wagmiAdapter],
            features: { analytics: true },
        });
        this.modal.subscribeAccount((newState) => {
            if (this.walletAddress !== newState.address) {
                this.walletAddress = newState.address;
                this.emit("addressChanged", this.walletAddress);
            }
        });
    }
    openModal() {
        this.modal.open();
    }
    disconnect() {
        this.modal.adapter?.connectionControllerClient?.disconnect();
    }
    async readContract(parameters) {
        return await readContract(this.getWagmiConfig(), parameters);
    }
    async writeContract(parameters) {
        return await writeContract(this.getWagmiConfig(), parameters);
    }
}
export default new WalletConnector();
//# sourceMappingURL=WalletConnector.js.map