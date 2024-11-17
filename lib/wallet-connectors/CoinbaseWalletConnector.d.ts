import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";
declare class CoinbaseWalletConnector extends WalletConnector {
    walletId: string;
    init(config: Config): void;
}
declare const _default: CoinbaseWalletConnector;
export default _default;
//# sourceMappingURL=CoinbaseWalletConnector.d.ts.map