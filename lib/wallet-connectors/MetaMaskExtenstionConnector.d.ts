import { EventContainer } from "@common-module/ts";
import { BrowserProvider } from "ethers";
import WalletConnector, { ChainInfo } from "./WalletConnector.js";
declare class MetaMaskExtenstionConnector extends EventContainer<{
    addressChanged: (address: string | undefined) => void;
}> implements WalletConnector {
    displayMode: "extension";
    connectedProvider: BrowserProvider | undefined;
    init(): void;
    connect(): Promise<string | undefined>;
    disconnect(): Promise<void>;
    addChain(chain: ChainInfo): Promise<void>;
    switchChain(chain: ChainInfo): Promise<void>;
}
declare const _default: MetaMaskExtenstionConnector;
export default _default;
//# sourceMappingURL=MetaMaskExtenstionConnector.d.ts.map