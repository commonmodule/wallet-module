import { mainnet } from "@wagmi/core/chains";
class WalletModuleConfig {
    chains = [mainnet];
    _walletConnectProjectId;
    get walletConnectProjectId() {
        if (!this._walletConnectProjectId) {
            throw new Error("WalletConnect project ID not set");
        }
        return this._walletConnectProjectId;
    }
    set walletConnectProjectId(projectId) {
        this._walletConnectProjectId = projectId;
    }
    init(options) {
        this.chains = options.chains;
        this.walletConnectProjectId = options.walletConnectProjectId;
    }
}
export default new WalletModuleConfig();
//# sourceMappingURL=WalletModuleConfig.js.map