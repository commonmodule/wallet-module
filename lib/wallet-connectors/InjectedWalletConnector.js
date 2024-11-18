import { injected } from "@wagmi/connectors";
import WalletConnector from "./WalletConnector.js";
class InjectedWalletConnector extends WalletConnector {
    walletId = "injected-wallet";
    init(config) {
        this.config = config;
        this.wagmiConnector = injected({
            target() {
                return {
                    id: "windowProvider",
                    name: "Window Provider",
                    provider: window.ethereum,
                };
            },
        });
    }
}
export default new InjectedWalletConnector();
//# sourceMappingURL=InjectedWalletConnector.js.map