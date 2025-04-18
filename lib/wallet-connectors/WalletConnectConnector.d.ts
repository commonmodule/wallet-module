import { Config } from "@wagmi/core";
import WalletConnectIcon from "../components/wallet-icons/WalletConnectIcon.js";
import WalletConnector from "./WalletConnector.js";
declare class WalletConnectConnector extends WalletConnector {
    walletId: string;
    walletName: string;
    walletIcon: WalletConnectIcon;
    init(config: Config): void;
}
declare const _default: WalletConnectConnector;
export default _default;
//# sourceMappingURL=WalletConnectConnector.d.ts.map