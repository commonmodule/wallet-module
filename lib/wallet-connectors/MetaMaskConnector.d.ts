import { EventContainer } from "@common-module/ts";
import { BrowserProvider } from "ethers";
import WalletConnector, { WalletConnectorOptions } from "./WalletConnector.js";
declare class MetaMaskConnector extends EventContainer<{
    addressChanged: (address: string) => void;
}> implements WalletConnector {
    private metaMaskSdk;
    private eip1193Provider;
    init(options: WalletConnectorOptions): void;
    connect(): Promise<BrowserProvider>;
}
declare const _default: MetaMaskConnector;
export default _default;
//# sourceMappingURL=MetaMaskConnector.d.ts.map