import { EventContainer } from "@common-module/ts";
import { BrowserProvider } from "ethers";
import WalletConnector, { ChainInfo, WalletConnectorOptions } from "./WalletConnector.js";
export interface WalletConnectConnectorOptions extends WalletConnectorOptions {
    description: string;
    walletConnectProjectId: string;
}
declare class WalletConnectConnector extends EventContainer<{
    addressChanged: (address: string | undefined) => void;
}> implements WalletConnector {
    private _web3Modal;
    private get web3Modal();
    private resolveConnection;
    private rejectConnection;
    init(options: WalletConnectConnectorOptions): void;
    checkDisplayMode(): "modal" | "extension";
    connect(): Promise<BrowserProvider>;
    addChain(chain: ChainInfo): Promise<void>;
}
declare const _default: WalletConnectConnector;
export default _default;
//# sourceMappingURL=WalletConnectConnector.d.ts.map