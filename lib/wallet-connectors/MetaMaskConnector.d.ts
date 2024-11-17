import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";
declare class MetaMaskConnector extends WalletConnector {
    walletId: string;
    init(config: Config): void;
}
declare const _default: MetaMaskConnector;
export default _default;
//# sourceMappingURL=MetaMaskConnector.d.ts.map