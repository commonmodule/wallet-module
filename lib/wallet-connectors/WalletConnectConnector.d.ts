import { EventContainer } from "@common-module/ts";
import { BrowserProvider } from "ethers";
import WalletConnector, { WalletConnectorOptions } from "./WalletConnector.js";
export interface WalletConnectConnectorOptions extends WalletConnectorOptions {
    description: string;
    walletConnectProjectId: string;
}
declare class WalletConnectConnector extends EventContainer<{
    addressChanged: (address: string) => void;
}> implements WalletConnector {
    private web3Modal;
    private resolveConnection;
    private rejectConnection;
    init(options: WalletConnectConnectorOptions): void;
    connect(): Promise<BrowserProvider>;
}
declare const _default: WalletConnectConnector;
export default _default;
//# sourceMappingURL=WalletConnectConnector.d.ts.map