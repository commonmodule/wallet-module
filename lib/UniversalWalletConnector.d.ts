import { BrowserProvider } from "ethers";
import { WalletConnectConnectorOptions } from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector, { WalletConnectorOptions } from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    walletConnectors: {
        [walletId: string]: WalletConnector;
    };
    private options;
    private viewProvider;
    init(options: WalletConnectorOptions | WalletConnectConnectorOptions): void;
    getDisplayMode(walletId: string): "modal" | "extension";
    connect(walletId: string): Promise<{
        provider: BrowserProvider;
        walletAddress?: string;
    }>;
    disconnectAll(): void;
    getBalance(chainName: string, walletAddress: string): Promise<bigint>;
    getConnectedProvider(walletId: string): BrowserProvider;
    addChain(walletId: string, chainName: string): Promise<void>;
    switchChain(walletId: string, chainName: string): Promise<void>;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map