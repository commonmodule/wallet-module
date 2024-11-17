import { connect, signMessage, } from "@wagmi/core";
export default class WalletConnector {
    _config;
    get config() {
        if (!this._config)
            throw new Error("Config not initialized");
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    _wagmiConnector;
    get wagmiConnector() {
        if (!this._wagmiConnector)
            throw new Error("Connector not initialized");
        return this._wagmiConnector;
    }
    set wagmiConnector(connector) {
        this._wagmiConnector = connector;
    }
    async connect() {
        return await connect(this.config, { connector: this.wagmiConnector });
    }
    async signMessage(walletAddress, message) {
        return await signMessage(this.config, { account: walletAddress, message });
    }
}
//# sourceMappingURL=WalletConnector.js.map