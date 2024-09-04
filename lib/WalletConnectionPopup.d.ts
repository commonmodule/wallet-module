import { Modal } from "@common-module/app-components";
export default class WalletConnectionPopup extends Modal {
    private resolve;
    private reject;
    constructor();
    private connect;
    wait(): Promise<{
        walletId: string;
        walletAddress: string;
    }>;
}
//# sourceMappingURL=WalletConnectionPopup.d.ts.map