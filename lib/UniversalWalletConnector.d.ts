import { BrowserProvider } from "ethers";
import { WalletConnectConnectorOptions } from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector, { WalletConnectorOptions } from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    walletConnectors: {
        [walletId: string]: WalletConnector;
    };
    private options;
    init(options: WalletConnectorOptions | WalletConnectConnectorOptions): void;
    connectAndGetProvider(walletId: string): Promise<BrowserProvider>;
    connectAndGetAddress(walletId: string): Promise<string>;
    addChain(walletId: string, chainName: string): Promise<void>;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map