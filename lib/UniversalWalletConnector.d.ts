import { BrowserProvider } from "ethers";
import { WalletConnectConnectorOptions } from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector, { WalletConnectorOptions } from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    walletConnectors: {
        [walletId: string]: WalletConnector;
    };
    init(options: WalletConnectorOptions | WalletConnectConnectorOptions): void;
    connectAndGetProvider(walletId: string): Promise<BrowserProvider>;
    connectAndGetAddress(walletId: string): Promise<string>;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map