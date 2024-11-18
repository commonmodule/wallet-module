import { el } from "@common-module/app";
import { Button, ButtonType, StructuredModal, WarningAlert, } from "@common-module/app-components";
import UniversalWalletConnector from "../UniversalWalletConnector.js";
import getChainById from "../utils/getChainById.js";
export default class NetworkMismatchModal extends StructuredModal {
    resolveTransaction;
    rejectTransaction;
    constructor(options) {
        const currentChainName = options.currentChainId
            ? getChainById(options.currentChainId)?.name ?? "Unknown"
            : "Unknown";
        const targetChainName = getChainById(options.targetChainId)?.name ??
            "Unknown";
        super(".network-mismatch-modal");
        this.appendToHeader(el("h1", "Network Mismatch Detected"));
        this.appendToMain(el("p", `This transaction is designed for ${targetChainName}, but your wallet is connected to ${currentChainName}.`), new WarningAlert("Executing this transaction on the wrong network can result in permanent loss of assets and unnecessary gas fees. Please ensure you're on the correct network before proceeding."));
        this.appendToFooter(new Button(".cancel-transaction", {
            title: "Cancel Transaction",
            onClick: () => this.remove(),
        }), new Button(".proceed-current-network", {
            type: ButtonType.Contained,
            title: "Continue on Current Network",
            onClick: () => {
                this.resolveTransaction?.();
                this.rejectTransaction = undefined;
                this.remove();
            },
        }).addClass("dangerous"), new Button(".switch-target-network", {
            type: ButtonType.Contained,
            title: `Switch to ${targetChainName}`,
            onClick: () => {
                UniversalWalletConnector.switchChain(options.targetChainId);
                this.rejectTransaction?.(new Error("Switching chain"));
                this.rejectTransaction = undefined;
                this.remove();
            },
        }));
        this.on("remove", () => this.rejectTransaction?.(new Error("Canceled by user")));
    }
}
//# sourceMappingURL=ChainSwitchDialog.js.map