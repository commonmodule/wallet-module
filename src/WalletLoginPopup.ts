import { el } from "@common-module/app";

export default class WalletLoginPopup extends Popup {
  private resolve: ((walletId: string) => void) | undefined;
  private reject: ((reason: Error) => void) | undefined;

  constructor() {
    super(".wallet-login-popup", { barrierDismissible: true });
    this.header.append(el("h1", "Login with Crypto Wallet"));
    this.main.append(
      el(
        "section",
        el("h2", "WalletConnect - Recommended"),
        new Button({
          type: ButtonType.Contained,
          icon: el("img", { src: "/images/wallet-icons/walletconnect.svg" }),
          title: "Login with WalletConnect",
          onClick: () => this.selectWallet("walletconnect"),
        }),
      ),
      el(
        "section",
        el("h2", "Direct Login"),
        el(
          "p",
          "These options are available when WalletConnect is not working properly. Direct login requires re-authentication each time you start the app, which may be less convenient compared to WalletConnect.",
        ),
        new Button({
          type: ButtonType.Contained,
          icon: el("img", { src: "/images/wallet-icons/metamask.svg" }),
          title: "Login with MetaMask",
          onClick: () => this.selectWallet("metamask"),
        }),
        new Button({
          type: ButtonType.Contained,
          icon: el("img", { src: "/images/wallet-icons/coinbase-wallet.svg" }),
          title: "Login with Coinbase Wallet",
          onClick: () => this.selectWallet("coinbase-wallet"),
        }),
      ),
    );
    this.footer.append(
      new Button({
        tag: ".cancel",
        title: "Cancel",
        onClick: () => this.delete(),
      }),
    );
    this.on("delete", () => this.reject?.(new Error("Login canceled by user")));
  }

  private selectWallet(walletId: string) {
    this.resolve?.(walletId);
    this.reject = undefined;
    this.delete();
  }

  public async wait(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
