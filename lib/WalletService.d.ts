import { EventContainer } from "@common-module/ts";
import { JsonRpcSigner } from "ethers";
import ChainInfo from "./ChainInfo.js";
declare class WalletService extends EventContainer<{
    addressChanged: (address: string | undefined) => void;
}> {
    private store;
    private wallets;
    tryLogin: () => Promise<string>;
    init(options: {
        name: string;
        icon: string;
        description: string;
        chains: {
            [name: string]: ChainInfo;
        };
        walletConnectProjectId: string;
    }): void;
    openWallet(): void;
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