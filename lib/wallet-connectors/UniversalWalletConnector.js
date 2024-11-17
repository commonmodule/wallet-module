import { createConfig, http } from "@wagmi/core";
import CoinbaseWalletConnector from "./CoinbaseWalletConnector.js";
import MetaMaskConnector from "./MetaMaskConnector.js";
import WalletConnectConnector from "./WalletConnectConnector.js";
class UniversalWalletConnector {
    connectors = {
        "walletconnect": WalletConnectConnector,
        "metamask": MetaMaskConnector,
        "coinbase-wallet": CoinbaseWalletConnector,
    };
    init(options) {
        const config = createConfig({
            chains: options.chains,
            transports: [http()],
        });
        for (const connector of Object.values(this.connectors)) {
            connector.init({
                config,
                walletConnectProjectId: options.walletConnectProjectId,
            });
        }
    }
}
export default new UniversalWalletConnector();
//# sourceMappingURL=UniversalWalletConnector.js.map