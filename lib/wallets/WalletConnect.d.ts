import { EventContainerV2 } from "@common-module/app";
import { BrowserProvider } from "ethers";
import ChainInfo from "../ChainInfo.js";
import Wallet from "./Wallet.js";
declare class WalletConnect extends EventContainerV2<{
    addressChanged: (address: string) => void;
}> implements Wallet {
    private web3Modal;
    private resolveConnection?;
    private rejectConnection?;
    init(options: {
        name: string;
        icon: string;
        description: string;
        chains: {
            [name: string]: ChainInfo;
        };
        walletConnectProjectId: string;
    }): void;
    open(): void;
    connect(): Promise<BrowserProvider>;
    disconnect(): Promise<void>;
    switchChain(chainId: number): Promise<void>;
}
declare const _default: WalletConnect;
export default _default;
//# sourceMappingURL=WalletConnect.d.ts.map