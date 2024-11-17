import { Chain } from "@wagmi/core/chains";
import WalletConnector from "./wallet-connectors/WalletConnector.js";
declare class WalletConnectionManager {
    connectors: {
        [walletId: string]: WalletConnector;
    };
    init(chains: [Chain, ...Chain[]]): void;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager.d.ts.map