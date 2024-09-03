import { BrowserProvider } from "ethers";
import WalletConnector, { WalletConnectorOptions } from "./WalletConnector.js";
declare class CoinbaseWalletConnector implements WalletConnector {
    private eip1193Provider;
    init(options: WalletConnectorOptions): void;
    connect(): Promise<BrowserProvider>;
}
declare const _default: CoinbaseWalletConnector;
export default _default;
//# sourceMappingURL=CoinbaseWalletConnector.d.ts.map