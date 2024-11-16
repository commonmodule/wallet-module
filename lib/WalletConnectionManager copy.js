import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { readContract, writeContract, } from "@wagmi/core";
class WalletConnectionManager extends EventContainer {
    store = new Store("wallet-connection-manager");
    wagmiAdapter;
    _modal;
    _walletAddress;
    getConnectedAddress() {
        return this.store.get("connectedAddress");
    }
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
            if (this._walletAddress !== newState.address) {
                this._walletAddress = newState.address;
            }
        });
    }
    openModal() {
        this.modal.open();
    }
    async readContract(parameters) {
        return await readContract(this.getWagmiConfig(), parameters);
    }
    async writeContract(parameters) {
        return await writeContract(this.getWagmiConfig(), parameters);
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager%20copy.js.map