import { el } from "@common-module/app";
import { Button } from "@common-module/app-components";
import WalletPopupBase from "../WalletPopupBase.js";
import WalletConnectionContent from "./WalletConnectionContent.js";
export default class WalletConnectionPopup extends WalletPopupBase {
    resolveConnect;
    rejectConnect;
    constructor() {
        super(".wallet-connection-popup");
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
//# sourceMappingURL=WalletConnectionPopup.js.map