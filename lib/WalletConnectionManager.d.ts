import { EventContainer } from "@common-module/ts";
import { JsonRpcSigner } from "ethers";
declare class WalletConnectionManager extends EventContainer<{
    connectionChanged: () => void;
}> {
    private store;
    get connectedWallet(): string | undefined;
    get connectedAddress(): string | undefined;
    get isConnected(): boolean;
    addConnectionInfo(walletId: string, walletAddress: string): void;
    disconnect(): Promise<void>;
    getBalance(): Promise<bigint>;
    addChain(chainName: string): Promise<void>;
    getSigner(targetChainName: string): Promise<JsonRpcSigner>;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager.d.ts.map