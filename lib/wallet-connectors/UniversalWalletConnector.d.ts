import { Chain } from "@wagmi/core/chains";
import WalletConnector from "./WalletConnector.js";
interface UniversalWalletConnectorOptions {
    chains: [Chain, ...Chain[]];
    walletConnectProjectId: string;
}
declare class UniversalWalletConnector {
    connectors: {
        [walletId: string]: WalletConnector;
    };
    init(options: UniversalWalletConnectorOptions): void;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map