import { StructuredModal } from "@common-module/app-components";
import UniversalWalletConnector from "./UniversalWalletConnector.js";

export default abstract class WalletPopupBase extends StructuredModal {
  protected temporarilyCloseModal(walletId: string) {
    if (UniversalWalletConnector.checkDisplayMode(walletId) === "modal") {
      this.offDom("close", this.closeListener).htmlElement.close();
    }
  }

  protected restoreModal(walletId: string) {
    if (UniversalWalletConnector.checkDisplayMode(walletId) === "modal") {
      this.onDom("close", this.closeListener).htmlElement.showModal();
    }
  }
}
