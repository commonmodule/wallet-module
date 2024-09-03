import { WalletConnectConnectorOptions } from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector, { WalletConnectorOptions } from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    walletConnectors: {
        [walletId: string]: WalletConnector;
    };
    init(options: WalletConnectorOptions | WalletConnectConnectorOptions): void;
    connect(walletId: string): Promise<import("ethers").BrowserProvider>;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map