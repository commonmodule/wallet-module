import { coinbaseWallet } from "@wagmi/connectors";
import CoinbaseWalletIcon from "../components/wallet-icons/CoinbaseWalletLogo.js";
import WalletConnector from "./WalletConnector.js";
class CoinbaseWalletConnector extends WalletConnector {
    walletId = "coinbase-wallet";
    walletName = "Coinbase Wallet";
    walletIcon = new CoinbaseWalletIcon();
    init(config) {
        this.config = config;
        this.wagmiConnector = coinbaseWallet();
    }
}
export default new CoinbaseWalletConnector();
//# sourceMappingURL=CoinbaseWalletConnector.js.map