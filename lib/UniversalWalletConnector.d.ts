import { BrowserProvider } from "ethers";
import { WalletConnectConnectorOptions } from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector, { WalletConnectorOptions } from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    walletConnectors: {
        [walletId: string]: WalletConnector;
    };
    private options;
    init(options: WalletConnectorOptions | WalletConnectConnectorOptions): void;
    checkDisplayMode(walletId: string): "modal" | "extension";
    connect(walletId: string): Promise<{
        provider: BrowserProvider;
        walletAddress?: string;
    }>;
    disconnectAll(): void;
    addChain(walletId: string, chainName: string): Promise<void>;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map