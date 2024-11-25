import { el } from "@common-module/app";
import {
  AppCompConfig,
  Button,
  ButtonType,
  StructuredModal,
  WarningAlert,
} from "@common-module/app-components";
import { getChainById } from "@common-module/wallet-utils";
import UniversalWalletConnector from "../UniversalWalletConnector.js";

interface NetworkMismatchModalOptions {
  currentChainId?: number;
  targetChainId: number;
}

export default class NetworkMismatchModal extends StructuredModal {
  private resolveProceed: (() => void) | undefined;
  private rejectProceed: ((reason: Error) => void) | undefined;

  constructor(options: NetworkMismatchModalOptions) {
    const currentChainName = options.currentChainId
      ? getChainById(options.currentChainId)?.name ?? "Unknown"
      : "Unknown";
    const targetChainName = getChainById(options.targetChainId)?.name ??
      "Unknown";

    super(".network-mismatch-modal");

    this.appendToHeader(
      el("h1", new AppCompConfig.WarningIcon(), "Network Mismatch Detected"),
    );

    this.appendToMain(
      el(
        "p",
        `This transaction is designed for ${targetChainName}, but your wallet is connected to ${currentChainName}.`,
      ),
      new WarningAlert(
        "Executing this transaction on the wrong network can result in permanent loss of assets and unnecessary gas fees. Please ensure you're on the correct network before proceeding.",
      ),
    );

    this.appendToFooter(
      new Button(".cancel-transaction", {
        title: "Cancel Transaction",
        onClick: () => this.remove(),
      }),
      new Button(".proceed-current-network", {
        type: ButtonType.Contained,
        icon: new AppCompConfig.WarningIcon(),
        title: "Continue on Current Network",
        onClick: () => {
          this.resolveProceed?.();
          this.rejectProceed = undefined;
          this.remove();
        },
      }),
      new Button(".switch-target-network", {
        type: ButtonType.Contained,
        title: `Switch to ${targetChainName}`,
        onClick: () => {
          UniversalWalletConnector.switchChain(options.targetChainId);
          this.rejectProceed?.(new Error("Switching chain"));
          this.rejectProceed = undefined;
          this.remove();
        },
      }),
    );

    this.on(
      "remove",
      () => this.rejectProceed?.(new Error("Chain mismatch")),
    );
  }

  public async waitForProceed() {
    return new Promise<void>((resolve, reject) => {
      this.resolveProceed = resolve;
      this.rejectProceed = reject;
    });
  }
}
