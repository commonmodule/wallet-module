import { coinbaseWallet } from "@wagmi/connectors";
import WalletConnector from "./WalletConnector.js";
class CoinbaseWalletConnector extends WalletConnector {
    walletId = "coinbase-wallet";
    init(config) {
        this.config = config;
        this.wagmiConnector = coinbaseWallet();
    }
}
export default new CoinbaseWalletConnector();
//# sourceMappingURL=CoinbaseWalletConnector.js.map