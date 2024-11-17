import { metaMask } from "@wagmi/connectors";
import WalletConnector from "./WalletConnector.js";
class MetaMaskConnector extends WalletConnector {
    walletId = "metamask";
    init(config) {
        this.config = config;
        this.wagmiConnector = metaMask();
    }
}
export default new MetaMaskConnector();
//# sourceMappingURL=MetaMaskConnector.js.map