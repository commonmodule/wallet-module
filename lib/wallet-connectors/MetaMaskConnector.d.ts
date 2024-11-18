import { Config, ConnectReturnType } from "@wagmi/core";
import MetaMaskIcon from "../components/wallet-icons/MetaMaskIcon.js";
import WalletConnector from "./WalletConnector.js";
declare class MetaMaskConnector extends WalletConnector {
    walletId: string;
    walletName: string;
    walletIcon: MetaMaskIcon;
    init(config: Config): void;
    connect(): Promise<ConnectReturnType<Config>>;
}
declare const _default: MetaMaskConnector;
export default _default;
//# sourceMappingURL=MetaMaskConnector.d.ts.map