import { StructuredModal } from "@common-module/app-components";
export default class WalletConnectionPopup extends StructuredModal {
    private resolveConnect;
    private rejectConnect;
    constructor();
    private handleConnect;
    waitForConnection(): Promise<{
        walletId: string;
        walletAddress: string;
    }>;
}
//# sourceMappingURL=WalletConnectionPopup.d.ts.map