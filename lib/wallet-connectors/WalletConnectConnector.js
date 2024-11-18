import { walletConnect } from "@wagmi/connectors";
import WalletConnectIcon from "../components/wallet-icons/WalletConnectIcon.js";
import WalletModuleConfig from "../WalletModuleConfig.js";
import WalletConnector from "./WalletConnector.js";
class WalletConnectConnector extends WalletConnector {
    walletId = "walletconnect";
    walletName = "WalletConnect";
    walletIcon = new WalletConnectIcon();
    init(config) {
        this.config = config;
        this.wagmiConnector = walletConnect({
            projectId: WalletModuleConfig.walletConnectProjectId,
            qrModalOptions: {
                themeVariables: {
                    "--wcm-z-index": "99998",
                },
            },
        });
    }
}
export default new WalletConnectConnector();
//# sourceMappingURL=WalletConnectConnector.js.map