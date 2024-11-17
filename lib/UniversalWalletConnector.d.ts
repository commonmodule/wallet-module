import { Config } from "@wagmi/core";
import WalletConnector from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    private _config?;
    protected get config(): Config;
    protected set config(config: Config);
    connectors: WalletConnector[];
    init(): void;
    disconnect(): void;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map