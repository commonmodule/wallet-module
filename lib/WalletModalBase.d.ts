import { StructuredModal } from "@common-module/app-components";
export default abstract class WalletModalBase extends StructuredModal {
    protected temporarilyCloseModal(walletId: string): void;
    protected restoreModal(walletId: string): void;
}
//# sourceMappingURL=WalletModalBase.d.ts.map