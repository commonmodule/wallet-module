import { createConfig, disconnect, http } from "@wagmi/core";
import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
import WalletModuleConfig from "./WalletModuleConfig.js";
class UniversalWalletConnector {
    _config;
    get config() {
        if (!this._config)
            throw new Error("Config not initialized");
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    connectors = [
        WalletConnectConnector,
        MetaMaskConnector,
        CoinbaseWalletConnector,
    ];
    init() {
        this.config = createConfig({
            chains: WalletModuleConfig.chains,
            transports: Object.fromEntries(WalletModuleConfig.chains.map((chain) => [chain.id, http()])),
        });
        for (const connector of this.connectors) {
            connector.init(this.config);
        }
    }
    disconnect() {
        disconnect(this.config);
    }
}
export default new UniversalWalletConnector();
//# sourceMappingURL=UniversalWalletConnector.js.map