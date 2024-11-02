import { BrowserProvider } from "ethers";
export interface ChainInfo {
    id: number;
    name: string;
    symbol: string;
    rpc: string;
    explorerUrl: string;
}
export interface WalletConnectorOptions {
    name: string;
    icon: string;
    chains: Record<string, ChainInfo>;
}
export default interface WalletConnector {
    init(options: WalletConnectorOptions): void;
    checkDisplayMode(): "modal" | "extension";
    connect(): Promise<{
        provider: BrowserProvider;
        walletAddress?: string;
    }>;
    disconnect(): Promise<void>;
    addChain(chain: ChainInfo): Promise<void>;
}
//# sourceMappingURL=WalletConnector.d.ts.map