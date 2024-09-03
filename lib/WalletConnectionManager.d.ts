import { EventContainer } from "@common-module/ts";
declare class WalletConnectionManager extends EventContainer<{
    connectionChanged: () => void;
}> {
    private store;
    get connectedWallet(): import("@common-module/ts").JsonValue | undefined;
    get connectedAddress(): import("@common-module/ts").JsonValue | undefined;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager.d.ts.map