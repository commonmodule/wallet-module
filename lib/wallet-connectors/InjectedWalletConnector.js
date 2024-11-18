import { el } from "@common-module/app";
import { injected } from "@wagmi/connectors";
import WalletConnector from "./WalletConnector.js";
export default class InjectedWalletConnector extends WalletConnector {
    walletInfo;
    provider;
    walletId;
    walletName;
    walletIcon;
    constructor(walletInfo, provider) {
        super();
        this.walletInfo = walletInfo;
        this.provider = provider;
        this.walletId = walletInfo.uuid;
        this.walletName = walletInfo.name;
        this.walletIcon = el("img.icon", { src: walletInfo.icon });
    }
    init(config) {
        this.config = config;
        const walletInfo = this.walletInfo;
        const provider = this.provider;
        this.wagmiConnector = injected({
            target() {
                return {
                    id: walletInfo.uuid,
                    name: walletInfo.name,
                    icon: walletInfo.icon,
                    provider,
                };
            },
        });
    }
}
//# sourceMappingURL=InjectedWalletConnector.js.map