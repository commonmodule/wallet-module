import { Chain } from "@wagmi/core/chains";
export interface IWalletModuleConfig {
    chains: [Chain, ...Chain[]];
    walletConnectProjectId: string;
}
declare class WalletModuleConfig implements IWalletModuleConfig {
    chains: [Chain, ...Chain[]];
    private _walletConnectProjectId?;
    get walletConnectProjectId(): string;
    set walletConnectProjectId(projectId: string);
    init(options: IWalletModuleConfig): void;
}
declare const _default: WalletModuleConfig;
export default _default;
//# sourceMappingURL=WalletModuleConfig.d.ts.map