import { StructuredModal } from "@common-module/app-components";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
export default class WalletModalBase extends StructuredModal {
    temporarilyCloseModal(walletId) {
        if (UniversalWalletConnector.getDisplayMode(walletId) === "modal") {
            this.offDom("close", this.closeListener).htmlElement.close();
        }
    }
    restoreModal(walletId) {
        if (UniversalWalletConnector.getDisplayMode(walletId) === "modal") {
            this.onDom("close", this.closeListener).htmlElement.showModal();
        }
    }
}
//# sourceMappingURL=WalletModalBase.js.map