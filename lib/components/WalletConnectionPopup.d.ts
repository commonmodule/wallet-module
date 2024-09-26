import WalletPopupBase from "../WalletPopupBase.js";
export default class WalletConnectionPopup extends WalletPopupBase {
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