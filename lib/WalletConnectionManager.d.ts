import { Metadata } from "@reown/appkit";
import { AppKitSIWEClient } from "@reown/appkit-siwe";
import { AppKitNetwork } from "@reown/appkit/networks";
declare class WalletConnectionManager {
    private _modal;
    private get modal();
    private set modal(value);
    init(projectId: string, metadata: Metadata, networks: [AppKitNetwork, ...AppKitNetwork[]], siweConfig?: AppKitSIWEClient): void;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager.d.ts.map