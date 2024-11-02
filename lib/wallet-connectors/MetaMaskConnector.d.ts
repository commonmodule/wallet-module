import { EventContainer } from "@common-module/ts";
import { BrowserProvider } from "ethers";
import WalletConnector, { ChainInfo, WalletConnectorOptions } from "./WalletConnector.js";
declare class MetaMaskConnector extends EventContainer<{
    addressChanged: (address: string | undefined) => void;
}> implements WalletConnector {
    private metaMaskSdk;
    private eip1193Provider;
    init(options: WalletConnectorOptions): void;
    checkDisplayMode(): "modal" | "extension";
    connect(): Promise<{
        provider: BrowserProvider;
        walletAddress: string | undefined;
    }>;
    disconnect(): Promise<void>;
    addChain(chain: ChainInfo): Promise<void>;
}
declare const _default: MetaMaskConnector;
export default _default;
//# sourceMappingURL=MetaMaskConnector.d.ts.map