import { TokenManager } from "@common-module/ts";
declare class WalletTokenManager extends TokenManager {
    private store;
    get loggedInWallet(): string | undefined;
    get loggedInAddress(): string | undefined;
    get token(): string | undefined;
    get loggedIn(): boolean;
    login(): void;
}
declare const _default: WalletTokenManager;
export default _default;
//# sourceMappingURL=WalletTokenManager%20copy.d.ts.map