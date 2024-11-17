import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";
declare class WalletConnectConnector extends WalletConnector {
    walletId: string;
    init(config: Config): void;
}
declare const _default: WalletConnectConnector;
export default _default;
//# sourceMappingURL=WalletConnectConnector.d.ts.map