import { StructuredModal } from "@common-module/app-components";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
export default class WalletPopupBase extends StructuredModal {
    temporarilyCloseModal(walletId) {
        if (UniversalWalletConnector.checkDisplayMode(walletId) === "modal") {
            this.offDom("close", this.closeListener).htmlElement.close();
        }
    }
    restoreModal(walletId) {
        if (UniversalWalletConnector.checkDisplayMode(walletId) === "modal") {
            this.onDom("close", this.closeListener).htmlElement.showModal();
        }
    }
}
//# sourceMappingURL=WalletPopupBase.js.map