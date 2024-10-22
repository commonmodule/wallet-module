import { DomNode, el } from "@common-module/app";
import { Button, ButtonGroup, ButtonType } from "@common-module/app-components";
import UniversalWalletConnector from "../UniversalWalletConnector.js";
import WalletConnectionManager from "../WalletConnectionManager.js";
import WalletConnectLogo from "./wallet-logos/WalletConnectLogo.js";
import MetaMaskLogo from "./wallet-logos/MetaMaskLogo.js";
import CoinbaseWalletLogo from "./wallet-logos/CoinbaseWalletLogo.js";
export default class WalletConnectionContent extends DomNode {
    onConnected;
    onError;
    onBeforeConnect;
    constructor(onConnected, onError, onBeforeConnect) {
        super(".wallet-connection-content");
        this.onConnected = onConnected;
        this.onError = onError;
        this.onBeforeConnect = onBeforeConnect;
        this.append(el("section", el("h2", "WalletConnect - Recommended"), new ButtonGroup(new Button({
            type: ButtonType.Outlined,
            icon: new WalletConnectLogo(".icon"),
            title: "Connect with WalletConnect",
            onClick: () => this.handleConnect("walletconnect"),
        }))), el("section", el("h2", "Direct Connection"), el("p", "These options are available when WalletConnect is not working properly. Direct connection requires re-authentication each time you start the app, which may be less convenient compared to WalletConnect."), new ButtonGroup(new Button({
            type: ButtonType.Outlined,
            icon: new MetaMaskLogo(".icon"),
            title: "Connect with MetaMask",
            onClick: () => this.handleConnect("metamask"),
        }), new Button({
            type: ButtonType.Outlined,
            icon: new CoinbaseWalletLogo(".icon"),
            title: "Connect with Coinbase Wallet",
            onClick: () => this.handleConnect("coinbase-wallet"),
        }))));
    }
    async handleConnect(walletId) {
        try {
            if (this.onBeforeConnect)
                this.onBeforeConnect(walletId);
            await UniversalWalletConnector.disconnect(walletId);
            const provider = await UniversalWalletConnector.connect(walletId);
            const accounts = await provider.listAccounts();
            if (accounts.length === 0)
                throw new Error("No accounts found");
            const walletAddress = accounts[0].address;
            WalletConnectionManager.addConnectionInfo(walletId, walletAddress);
            this.onConnected();
        }
        catch (error) {
            console.error(error);
            this.onError(error instanceof Error ? error : new Error("Unknown error occurred"));
        }
    }
}
//# sourceMappingURL=WalletConnectionContent.js.map