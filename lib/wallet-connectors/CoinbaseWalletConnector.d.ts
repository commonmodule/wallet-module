import { Config } from "@wagmi/core";
import CoinbaseWalletIcon from "../components/wallet-icons/CoinbaseWalletIcon.js";
import WalletConnector from "./WalletConnector.js";
declare class CoinbaseWalletConnector extends WalletConnector {
    walletId: string;
    walletName: string;
    walletIcon: CoinbaseWalletIcon;
    init(config: Config): void;
}
declare const _default: CoinbaseWalletConnector;
export default _default;
//# sourceMappingURL=CoinbaseWalletConnector.d.ts.map