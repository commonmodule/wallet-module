import { BrowserProvider } from "ethers";
import WalletConnector from "./WalletConnector.js";
declare class CoinbaseWalletConnector implements WalletConnector {
    private eip1193Provider;
    connect(): Promise<BrowserProvider>;
}
declare const _default: CoinbaseWalletConnector;
export default _default;
//# sourceMappingURL=CoinbaseWalletConnector.d.ts.map