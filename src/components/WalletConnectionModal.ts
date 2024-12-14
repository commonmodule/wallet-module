import { el } from "@common-module/app";
import { Button, StructuredModal } from "@common-module/app-components";
import WalletConnector from "../wallet-connectors/WalletConnector.js";
import WalletButtonGroup from "./WalletButtonGrouop.js";

interface ConnectionResult {
  walletId: string;
  walletAddress: `0x${string}`;
}

export default class WalletConnectionModal extends StructuredModal {
  private resolveConnection?: (result: ConnectionResult) => void;
  private rejectConnection?: (reason: Error) => void;

  constructor() {
    super(".wallet-connection-modal", false);

    this.appendToHeader(el("h1", "Connect Your Crypto Wallet"));
    this.appendToMain(
      new WalletButtonGroup(
        "Connect",
        (walletConnector) => this.handleConnect(walletConnector),
      ),
    );
    this.appendToFooter(
      new Button(".cancel", {
        title: "Cancel",
        onClick: () => this.remove(),
      }),
    );

    this.on(
      "remove",
      () => this.rejectConnection?.(new Error("Login canceled by user")),
    );
  }

  private async handleConnect(walletConnector: WalletConnector) {
    const result = await walletConnector.connect();
    const walletAddress = result.accounts[0];
    if (!walletAddress) throw new Error("No accounts found");

    this.resolveConnection?.({
      walletId: walletConnector.walletId,
      walletAddress,
    });

    this.rejectConnection = undefined;
    this.remove();
  }

  public async waitForLogin(): Promise<ConnectionResult> {
    return new Promise((resolve, reject) => {
      this.resolveConnection = resolve;
      this.rejectConnection = reject;
    });
  }
}
