import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";
declare class InjectedWalletConnector extends WalletConnector {
    walletId: string;
    init(config: Config): void;
}
declare const _default: InjectedWalletConnector;
export default _default;
//# sourceMappingURL=InjectedWalletConnector.d.ts.map