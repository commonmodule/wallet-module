import { el } from "@common-module/app";
import { Button, ButtonType, Modal } from "@common-module/app-components";
import UniversalWalletConnector from "./UniversalWalletConnector.js";

export default class WalletConnectionPopup extends Modal {
  private resolve:
    | ((result: { walletId: string; walletAddress: string }) => void)
    | undefined;
  private reject: ((reason: Error) => void) | undefined;

  constructor() {
    super(".wallet-connection-popup");

    this.append(
      el("header", el("h1", "Connect Your Crypto Wallet")),
      el(
        "main",
        el(
          "section",
          el("h2", "WalletConnect - Recommended"),
          new Button({
            type: ButtonType.Contained,
            icon: el("img", { src: "/images/wallet-icons/walletconnect.svg" }),
            title: "Connect with WalletConnect",
            onClick: async () => await this.connect("walletconnect"),
          }),
        ),
        el(
          "section",
          el("h2", "Direct Connection"),
          el(
            "p",
            "These options are available when WalletConnect is not working properly. Direct connection requires re-authentication each time you start the app, which may be less convenient compared to WalletConnect.",
          ),
          new Button({
            type: ButtonType.Contained,
            icon: el("img", { src: "/images/wallet-icons/metamask.svg" }),
            title: "Connect with MetaMask",
            onClick: async () => await this.connect("metamask"),
          }),
          new Button({
            type: ButtonType.Contained,
            icon: el("img", {
              src: "/images/wallet-icons/coinbase-wallet.svg",
            }),
            title: "Connect with Coinbase Wallet",
            onClick: async () => await this.connect("coinbase-wallet"),
          }),
        ),
      ),
      el(
        "footer",
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => this.remove(),
        }),
      ),
    );

    this.on(
      "remove",
      () => this.reject?.(new Error("Connection canceled by user")),
    );
  }

  private async connect(walletId: string) {
    // Temporarily close the popup while the wallet connection process is underway.
    this.offDom("close", this.closeListener).htmlElement.close();
    try {
      const walletAddress = await UniversalWalletConnector.connectAndGetAddress(
        walletId,
      );
      this.resolve?.({ walletId, walletAddress });
      this.remove();
    } catch (error) {
      console.error(error);
      this.onDom("close", this.closeListener).htmlElement.showModal();
    }
  }

  public async wait(): Promise<{ walletId: string; walletAddress: string }> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
