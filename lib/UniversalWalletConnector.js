import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
class UniversalWalletConnector {
    walletConnectors = {
        "walletconnect": WalletConnectConnector,
        "metamask": MetaMaskConnector,
        "coinbase-wallet": CoinbaseWalletConnector,
    };
    init(options) {
        for (const walletConnector of Object.values(this.walletConnectors)) {
            walletConnector.init(options);
        }
    }
    async connectAndGetProvider(walletId) {
        const walletConnector = this.walletConnectors[walletId];
        if (!walletConnector)
            throw new Error(`Unsupported walletId: ${walletId}`);
        return await walletConnector.connect();
    }
    async connectAndGetAddress(walletId) {
        const provider = await this.connectAndGetProvider(walletId);
        const accounts = await provider.listAccounts();
        if (accounts.length === 0)
            throw new Error("No accounts found");
        return accounts[0].address;
    }
}
export default new UniversalWalletConnector();
//# sourceMappingURL=UniversalWalletConnector.js.map