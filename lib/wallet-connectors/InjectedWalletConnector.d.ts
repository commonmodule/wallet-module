import { Dom } from "@commonmodule/app";
import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";
export interface InjectedWalletInfo {
    name: string;
    icon: string;
    rdns: string;
    uuid: string;
}
export default class InjectedWalletConnector extends WalletConnector {
    private walletInfo;
    private provider;
    walletId: string;
    walletName: string;
    walletIcon: Dom;
    constructor(walletInfo: InjectedWalletInfo, provider: any);
    init(config: Config): void;
}
//# sourceMappingURL=InjectedWalletConnector.d.ts.map