import { BrowserProvider } from "ethers";
import ChainInfo from "../ChainInfo.js";
export default interface Wallet {
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
    on(event: "addressChanged", listener: (address: string) => void): void;
}
//# sourceMappingURL=Wallet.d.ts.map