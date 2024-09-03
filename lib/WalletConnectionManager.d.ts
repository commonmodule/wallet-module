import { EventContainer } from "@common-module/ts";
declare class WalletConnectionManager extends EventContainer<{
    connectionChanged: () => void;
}> {
    private store;
    get connectedWallet(): unknown;
    get connectedAddress(): unknown;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager.d.ts.map