import { WalletConnectConnectorOptions } from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector, { WalletConnectorOptions } from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    walletConnectors: {
        [walletId: string]: WalletConnector;
    };
    private options;
    init(options: WalletConnectorOptions | WalletConnectConnectorOptions): void;
    getDisplayMode(walletId: string): "modal" | "extension";
    getProvider(walletId: string): import("ethers").BrowserProvider;
    connect(walletId: string): Promise<string | undefined>;
    disconnectAll(): void;
    addChain(walletId: string, chainName: string): Promise<void>;
    switchChain(walletId: string, chainName: string): Promise<void>;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map