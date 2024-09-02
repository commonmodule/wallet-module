import { EventContainer } from "@common-module/ts";
import { BrowserProvider } from "ethers";
import WalletConnector from "./WalletConnector.js";
declare class WalletConnectConnector extends EventContainer<{
    addressChanged: (address: string) => void;
}> implements WalletConnector {
    private web3Modal;
    private resolveConnection;
    private rejectConnection;
    connect(): Promise<BrowserProvider>;
}
declare const _default: WalletConnectConnector;
export default _default;
//# sourceMappingURL=WalletConnectConnector.d.ts.map