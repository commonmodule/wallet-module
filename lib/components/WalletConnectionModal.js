import { el } from "@common-module/app";
import { Button } from "@common-module/app-components";
import WalletModalBase from "../WalletModalBase.js";
import WalletConnectionContent from "./WalletConnectionContent.js";
export default class WalletConnectionModal extends WalletModalBase {
    resolveConnect;
    rejectConnect;
    constructor() {
        super(".wallet-connection-modal");
        this
            .on("remove", () => this.rejectConnect?.(new Error("Connection canceled by user")))
            .appendToHeader(el("h1", "Connect Your Crypto Wallet"))
            .appendToMain(new WalletConnectionContent(() => {
            this.resolveConnect?.();
            this.rejectConnect = undefined;
            this.remove();
        }, (error) => {
            console.error(error);
            this.restoreModal(error.message);
        }, (walletId) => this.temporarilyCloseModal(walletId)))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }));
    }
    async waitForConnection() {
        return new Promise((resolve, reject) => {
            this.resolveConnect = resolve;
            this.rejectConnect = reject;
        });
    }
}
//# sourceMappingURL=WalletConnectionModal.js.map