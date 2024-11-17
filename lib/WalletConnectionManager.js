import { createConfig, http } from "@wagmi/core";
import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
class WalletConnectionManager {
    connectors = {
        "walletconnect": WalletConnectConnector,
        "metamask": MetaMaskConnector,
        "coinbase-wallet": CoinbaseWalletConnector,
    };
    init(chains) {
        const config = createConfig({
            chains,
            transports: [http()],
        });
        for (const connector of Object.values(this.connectors)) {
            connector.init(config);
        }
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map