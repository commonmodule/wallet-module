import { StructuredModal } from "@common-module/app-components";
interface ConnectionResult {
    walletId: string;
    walletAddress: `0x${string}`;
}
export default class WalletConnectionModal extends StructuredModal {
    private resolveConnection?;
    private rejectConnection?;
    constructor();
    private handleConnect;
    waitForLogin(): Promise<ConnectionResult>;
}
export {};
//# sourceMappingURL=WalletConnectionModal.d.ts.map