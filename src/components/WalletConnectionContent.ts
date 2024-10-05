import { DomNode, el } from "@common-module/app";
import { Button, ButtonGroup, ButtonType } from "@common-module/app-components";
import UniversalWalletConnector from "../UniversalWalletConnector.js";
import WalletConnectionManager from "../WalletConnectionManager.js";

export default class WalletConnectionContent extends DomNode {
  constructor(
    private onConnected: () => void,
    private onError: (error: Error) => void,
    private onBeforeConnect?: (walletId: string) => void,
  ) {
    super(".wallet-connection-content");
    this.append(
      el(
        "section",
        el("h2", "WalletConnect - Recommended"),
        new ButtonGroup(
          new Button({
            type: ButtonType.Outlined,
            icon: el("img", {
              src: "/images/wallet-icons/walletconnect.svg",
            }),
            title: "Connect with WalletConnect",
            onClick: () => this.handleConnect("walletconnect"),
          }),
        ),
      ),
      el(
        "section",
        el("h2", "Direct Connection"),
        el(
          "p",
          "These options are available when WalletConnect is not working properly. Direct connection requires re-authentication each time you start the app, which may be less convenient compared to WalletConnect.",
        ),
        new ButtonGroup(
          new Button({
            type: ButtonType.Outlined,
            icon: el("img", { src: "/images/wallet-icons/metamask.svg" }),
            title: "Connect with MetaMask",
            onClick: () => this.handleConnect("metamask"),
          }),
          new Button({
            type: ButtonType.Outlined,
            icon: el("img", {
              src: "/images/wallet-icons/coinbase-wallet.svg",
            }),
            title: "Connect with Coinbase Wallet",
            onClick: () => this.handleConnect("coinbase-wallet"),
          }),
        ),
      ),
    );
  }

  private async handleConnect(walletId: string) {
    try {
      if (this.onBeforeConnect) this.onBeforeConnect(walletId);

      WalletConnectionManager.disconnect();
      await UniversalWalletConnector.disconnect(walletId);

      const provider = await UniversalWalletConnector.connect(walletId);
      const accounts = await provider.listAccounts();
      if (accounts.length === 0) throw new Error("No accounts found");
      const walletAddress = accounts[0].address;

      WalletConnectionManager.addConnectionInfo(walletId, walletAddress);
      this.onConnected();
    } catch (error) {
      console.error(error);
      this.onError(
        error instanceof Error ? error : new Error("Unknown error occurred"),
      );
    }
  }
}
