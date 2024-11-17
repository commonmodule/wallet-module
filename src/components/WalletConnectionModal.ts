import { el } from "@common-module/app";
import {
  Button,
  ButtonGroup,
  ButtonType,
  StructuredModal,
} from "@common-module/app-components";
import CoinbaseWalletConnector from "../wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "../wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "../wallet-connectors/WalletConnectConnector.js";
import WalletConnector from "../wallet-connectors/WalletConnector.js";
import CoinbaseWalletIcon from "./wallet-icons/CoinbaseWalletLogo.js";
import MetaMaskIcon from "./wallet-icons/MetaMaskIcon.js";
import WalletConnectIcon from "./wallet-icons/WalletConnectIcon.js";

interface ConnectionResult {
  walletId: string;
  walletAddress: string;
}

export default class WalletConnectionModal extends StructuredModal {
  private resolveConnection?: (result: ConnectionResult) => void;
  private rejectConnection?: (reason: Error) => void;

  constructor() {
    super(".wallet-connection-modal", false);

    this.appendToHeader(el("h1", "Connect Your Crypto Wallet"));
    this.appendToMain(
      new ButtonGroup(
        new Button({
          type: ButtonType.Outlined,
          icon: new MetaMaskIcon(),
          title: "Connect with MetaMask",
          onClick: () => this.handleConnect(MetaMaskConnector),
        }),
        new Button({
          type: ButtonType.Outlined,
          icon: new CoinbaseWalletIcon(),
          title: "Connect with Coinbase Wallet",
          onClick: () => this.handleConnect(CoinbaseWalletConnector),
        }),
        new Button({
          type: ButtonType.Outlined,
          icon: new WalletConnectIcon(),
          title: "Connect with WalletConnect",
          onClick: () => this.handleConnect(WalletConnectConnector),
        }),
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
