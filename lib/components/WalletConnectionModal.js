import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import WalletButtonGroup from "./WalletButtonGrouop.js";
export default class WalletConnectionModal extends StructuredModal {
    resolveConnection;
    rejectConnection;
    constructor() {
        super(".wallet-connection-modal", false);
        this.appendToHeader(el("h1", "Connect Your Crypto Wallet"));
        this.appendToMain(new WalletButtonGroup("Connect", (walletConnector) => this.handleConnect(walletConnector)));
        this.appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }));
        this.on("remove", () => this.rejectConnection?.(new Error("Login canceled by user")));
    }
    async handleConnect(walletConnector) {
        const result = await walletConnector.connect();
        const walletAddress = result.accounts[0];
        if (!walletAddress)
            throw new Error("No accounts found");
        this.resolveConnection?.({
            walletId: walletConnector.walletId,
            walletAddress,
        });
        this.rejectConnection = undefined;
        this.remove();
    }
    async waitForLogin() {
        return new Promise((resolve, reject) => {
            this.resolveConnection = resolve;
            this.rejectConnection = reject;
        });
    }
}
//# sourceMappingURL=WalletConnectionModal.js.map