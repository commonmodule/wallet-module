import { BrowserProvider } from "ethers";
export default interface Wallet {
    connect(): Promise<BrowserProvider>;
    disconnect(): Promise<void>;
    switchChain(chainId: number): Promise<void>;
}
//# sourceMappingURL=Wallet.d.ts.map