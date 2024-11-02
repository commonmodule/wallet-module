import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
class UniversalWalletConnector {
    walletConnectors = {
        "walletconnect": WalletConnectConnector,
        "metamask": MetaMaskConnector,
        "coinbase-wallet": CoinbaseWalletConnector,
    };
    options;
    init(options) {
        this.options = options;
        for (const walletConnector of Object.values(this.walletConnectors)) {
            walletConnector.init(options);
        }
    }
    checkDisplayMode(walletId) {
        const connector = this.walletConnectors[walletId];
        if (!connector)
            throw new Error(`Unsupported walletId: ${walletId}`);
        return connector.checkDisplayMode();
    }
    async connect(walletId) {
        const connector = this.walletConnectors[walletId];
        if (!connector)
            throw new Error(`Unsupported walletId: ${walletId}`);
        return await connector.connect();
    }
    disconnectAll() {
        for (const connector of Object.values(this.walletConnectors)) {
            connector.disconnect();
        }
    }
    async addChain(walletId, chainName) {
        if (!this.options)
            throw new Error("Options not initialized");
        const chainInfo = this.options?.chains[chainName];
        if (!chainInfo)
            throw new Error(`Chain ${chainName} not found`);
        const connector = this.walletConnectors[walletId];
        if (!connector)
            throw new Error(`Unsupported walletId: ${walletId}`);
        await connector.addChain(chainInfo);
    }
}
export default new UniversalWalletConnector();
//# sourceMappingURL=UniversalWalletConnector.js.map