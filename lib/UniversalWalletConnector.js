import { JsonRpcProvider } from "ethers";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
class UniversalWalletConnector {
    walletConnectors = {
        "walletconnect": WalletConnectConnector,
        "metamask": MetaMaskConnector,
    };
    options;
    viewProvider = {};
    init(options) {
        this.options = options;
        for (const walletConnector of Object.values(this.walletConnectors)) {
            walletConnector.init(options);
        }
    }
    getDisplayMode(walletId) {
        const connector = this.walletConnectors[walletId];
        if (!connector)
            throw new Error(`Unsupported walletId: ${walletId}`);
        return connector.displayMode;
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
    async getBalance(chainName, walletAddress) {
        let viewProvider = this.viewProvider[chainName];
        if (!viewProvider) {
            const chainInfo = this.options?.chains[chainName];
            if (!chainInfo)
                throw new Error(`Chain ${chainName} not found`);
            viewProvider = this.viewProvider[chainName] = new JsonRpcProvider(chainInfo.rpc);
        }
        return await viewProvider.getBalance(walletAddress);
    }
    getConnectedProvider(walletId) {
        const connector = this.walletConnectors[walletId];
        if (!connector)
            throw new Error(`Unsupported walletId: ${walletId}`);
        return connector.connectedProvider;
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
    async switchChain(walletId, chainName) {
        if (!this.options)
            throw new Error("Options not initialized");
        const chainInfo = this.options?.chains[chainName];
        if (!chainInfo)
            throw new Error(`Chain ${chainName} not found`);
        const connector = this.walletConnectors[walletId];
        if (!connector)
            throw new Error(`Unsupported walletId: ${walletId}`);
        await connector.addChain(chainInfo);
        await connector.switchChain(chainInfo);
    }
}
export default new UniversalWalletConnector();
//# sourceMappingURL=UniversalWalletConnector.js.map