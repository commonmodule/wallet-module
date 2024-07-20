import { BrowserProvider } from "ethers";
import Wallet from "./Wallet.js";
import ChainInfo from "../ChainInfo.js";
declare class CoinbaseWallet implements Wallet {
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