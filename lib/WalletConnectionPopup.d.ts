import { Modal } from "@common-module/app-components";
export default class WalletConnectionPopup extends Modal {
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