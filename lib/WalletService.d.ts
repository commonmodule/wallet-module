import { EventContainerV2 } from "@common-module/app";
import { JsonRpcSigner } from "ethers";
declare class WalletService extends EventContainerV2<{
    addressChanged: (address: string) => void;
}> {
    private store;
    private wallets;
    private tryLogin;
    private connect;
    disconnect(): Promise<void>;
    get loggedInWallet(): string | undefined;
    get loggedInAddress(): string | undefined;
    get loggedIn(): boolean;
    login(): Promise<void>;
    logout(): Promise<void>;
    getSigner(targetChainId: number): Promise<JsonRpcSigner>;
}
declare const _default: WalletService;
export default _default;
//# sourceMappingURL=WalletService.d.ts.map