import { EventContainer } from "@common-module/ts";
declare class WalletSessionManager extends EventContainer<{
    sessionChanged: () => void;
}> {
    private store;
    get connectedWallet(): string | undefined;
    get connectedAddress(): string | undefined;
    get isConnected(): boolean;
    init(): void;
    connect(): Promise<void>;
    disconnect(): void;
}
declare const _default: WalletSessionManager;
export default _default;
//# sourceMappingURL=WalletSessionManager.d.ts.map