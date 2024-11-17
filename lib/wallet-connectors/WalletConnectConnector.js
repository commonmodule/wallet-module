import { walletConnect } from "@wagmi/connectors";
import WalletModuleConfig from "../WalletModuleConfig.js";
import WalletConnector from "./WalletConnector.js";
class WalletConnectConnector extends WalletConnector {
    walletId = "walletconnect";
    init(config) {
        this.config = config;
        this.wagmiConnector = walletConnect({
            projectId: WalletModuleConfig.walletConnectProjectId,
        });
    }
}
export default new WalletConnectConnector();
//# sourceMappingURL=WalletConnectConnector.js.map