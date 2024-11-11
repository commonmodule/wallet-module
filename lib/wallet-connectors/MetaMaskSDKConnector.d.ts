import { EventContainer } from "@common-module/ts";
import { BrowserProvider } from "ethers";
import WalletConnector, { ChainInfo, WalletConnectorOptions } from "./WalletConnector.js";
declare class MetaMaskSDKConnector extends EventContainer<{
    addressChanged: (address: string | undefined) => void;
}> implements WalletConnector {
    private metaMaskSdk;
    private eip1193Provider;
    private connectedAddress;
    displayMode: "modal";
    connectedProvider: BrowserProvider | undefined;
    init(options: WalletConnectorOptions): void;
    connect(): Promise<string | undefined>;
    disconnect(): Promise<void>;
    addChain(chain: ChainInfo): Promise<void>;
    switchChain(chain: ChainInfo): Promise<void>;
}
declare const _default: MetaMaskSDKConnector;
export default _default;
//# sourceMappingURL=MetaMaskSDKConnector.d.ts.map