import { EventContainer } from "@common-module/ts";
declare class WalletLoginManager extends EventContainer<{
    loginStatusChanged: () => void;
}> {
    private store;
    get loggedInWallet(): string | undefined;
    get loggedInAddress(): string | undefined;
    get loggedIn(): boolean;
    login(): void;
    logout(): void;
}
declare const _default: WalletLoginManager;
export default _default;
//# sourceMappingURL=WalletLoginManager.d.ts.map