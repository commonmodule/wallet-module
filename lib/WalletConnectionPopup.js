import { el } from "@common-module/app";
import { Button, ButtonType, StructuredModal, } from "@common-module/app-components";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
export default class WalletConnectionPopup extends StructuredModal {
    resolveConnect;
    rejectConnect;
    constructor() {
        super(".wallet-connection-popup");
        this
            .appendToHeader(el("h1", "Connect Your Crypto Wallet"))
            .appendToMain(el("section", el("h2", "WalletConnect - Recommended"), new Button({
            type: ButtonType.Contained,
            icon: el("img", { src: "/images/wallet-icons/walletconnect.svg" }),
            title: "Connect with WalletConnect",
            onClick: () => this.handleConnect("walletconnect"),
        })), el("section", el("h2", "Direct Connection"), el("p", "These options are available when WalletConnect is not working properly. Direct connection requires re-authentication each time you start the app, which may be less convenient compared to WalletConnect."), new Button({
            type: ButtonType.Contained,
            icon: el("img", { src: "/images/wallet-icons/metamask.svg" }),
            title: "Connect with MetaMask",
            onClick: () => this.handleConnect("metamask"),
        }), new Button({
            type: ButtonType.Contained,
            icon: el("img", {
                src: "/images/wallet-icons/coinbase-wallet.svg",
            }),
            title: "Connect with Coinbase Wallet",
            onClick: () => this.handleConnect("coinbase-wallet"),
        })))
            .appendToFooter(new Button(".cancel", {
            title: "Cancel",
            onClick: () => this.remove(),
        }))
            .on("remove", () => this.rejectConnect?.(new Error("Connection canceled by user")));
    }
    async handleConnect(walletId) {
        this.offDom("close", this.closeListener).htmlElement.close();
        try {
            const walletAddress = await UniversalWalletConnector.connectAndGetAddress(walletId);
            this.resolveConnect?.({ walletId, walletAddress });
            this.remove();
        }
        catch (error) {
            console.error(error);
            this.onDom("close", this.closeListener).htmlElement.showModal();
        }
    }
    async waitForConnection() {
        return new Promise((resolve, reject) => {
            this.resolveConnect = resolve;
            this.rejectConnect = reject;
        });
    }
}
//# sourceMappingURL=WalletConnectionPopup.js.map