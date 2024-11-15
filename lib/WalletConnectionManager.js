import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
class WalletConnectionManager {
    _modal;
    get modal() {
        if (!this._modal)
            throw new Error("Modal not initialized");
        return this._modal;
    }
    set modal(modal) {
        this._modal = modal;
    }
    init(projectId, metadata, networks, siweConfig) {
        const wagmiAdapter = new WagmiAdapter({
            projectId,
            networks,
        });
        this.modal = createAppKit({
            adapters: [wagmiAdapter],
            networks,
            metadata,
            projectId,
            features: { analytics: true },
            siweConfig,
        });
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map