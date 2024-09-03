import { BrowserProvider } from "ethers";
export interface WalletConnectorOptions {
    name: string;
    icon: string;
    chains: {
        [name: string]: {
            id: number;
            symbol: string;
            rpc: string;
            explorerUrl: string;
        };
    };
}
export default interface WalletConnector {
    init(options: WalletConnectorOptions): void;
    connect(): Promise<BrowserProvider>;
}
//# sourceMappingURL=WalletConnector.d.ts.map