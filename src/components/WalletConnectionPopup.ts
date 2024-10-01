import { el } from "@common-module/app";
import { Button } from "@common-module/app-components";
import WalletPopupBase from "../WalletPopupBase.js";
import WalletConnectionContent from "./WalletConnectionContent.js";

export default class WalletConnectionPopup extends WalletPopupBase {
  private resolveConnect: (() => void) | undefined;
  private rejectConnect: ((reason: Error) => void) | undefined;

  constructor() {
    super(".wallet-connection-popup");
    this
      .appendToHeader(el("h1", "Connect Your Crypto Wallet"))
      .appendToMain(
        new WalletConnectionContent(
          () => {
            this.resolveConnect?.();
            this.remove();
          },
          (error) => {
            console.error(error);
            this.restoreModal(error.message);
          },
          (walletId) => this.temporarilyCloseModal(walletId),
        ),
      )
      .appendToFooter(
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => this.remove(),
        }),
      )
      .on(
        "remove",
        () => this.rejectConnect?.(new Error("Connection canceled by user")),
      );
  }

  public async waitForConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.resolveConnect = resolve;
      this.rejectConnect = reject;
    });
  }
}
