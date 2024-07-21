import { EventContainerV2 } from "@common-module/app";
import { BrowserProvider } from "ethers";
import ChainInfo from "../ChainInfo.js";
import Wallet from "./Wallet.js";
declare class CoinbaseWallet extends EventContainerV2<{
    addressChanged: (address: string) => void;
}> implements Wallet {
    private chains;
    private eip1193Provider;
    init(options: {
        name: string;
        icon: string;
        chains: {
            [name: string]: ChainInfo;
        };
    }): void;
    open(): void;
    connect(): Promise<BrowserProvider>;
    disconnect(): Promise<void>;
    switchChain(chainId: number): Promise<void>;
}
declare const _default: CoinbaseWallet;
export default _default;
//# sourceMappingURL=CoinbaseWallet.d.ts.map