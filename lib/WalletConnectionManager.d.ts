import { EventContainer } from "@common-module/ts";
declare class WalletConnectionManager extends EventContainer<{
    connectionChanged: () => void;
}> {
    private store;
    get connectedWallet(): string | undefined;
    get connectedAddress(): string | undefined;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    addChain(chainName: string): Promise<void>;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager.d.ts.map