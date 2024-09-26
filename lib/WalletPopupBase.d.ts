import { StructuredModal } from "@common-module/app-components";
export default abstract class WalletPopupBase extends StructuredModal {
    protected temporarilyCloseModal(walletId: string): void;
    protected restoreModal(walletId: string): void;
}
//# sourceMappingURL=WalletPopupBase.d.ts.map