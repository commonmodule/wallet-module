import { Config, ConnectReturnType } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";
declare class MetaMaskConnector extends WalletConnector {
    walletId: string;
    init(config: Config): void;
    connect(): Promise<ConnectReturnType<Config>>;
}
declare const _default: MetaMaskConnector;
export default _default;
//# sourceMappingURL=MetaMaskConnector.d.ts.map