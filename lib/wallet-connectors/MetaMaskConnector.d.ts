import { BrowserProvider } from "ethers";
import WalletConnector from "./WalletConnector.js";
declare class MetaMaskConnector implements WalletConnector {
    private metaMaskSdk;
    private eip1193Provider;
    connect(): Promise<BrowserProvider>;
}
declare const _default: MetaMaskConnector;
export default _default;
//# sourceMappingURL=MetaMaskConnector.d.ts.map