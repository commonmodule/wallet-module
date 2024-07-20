import { BrowserProvider } from "ethers";
import ChainInfo from "../ChainInfo.js";
import Wallet from "./Wallet.js";
declare class CoinbaseWallet implements Wallet {
    private chains;
    private eip1193Provider;
    init(options: {
        name: string;
        icon: string;
        chains: {
            [name: string]: ChainInfo;
        };
    }): void;
    connect(): Promise<BrowserProvider>;
    disconnect(): Promise<void>;
    switchChain(chainId: number): Promise<void>;
}
declare const _default: CoinbaseWallet;
export default _default;
//# sourceMappingURL=CoinbaseWallet.d.ts.map