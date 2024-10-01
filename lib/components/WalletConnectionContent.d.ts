import { DomNode } from "@common-module/app";
export default class WalletConnectionContent extends DomNode {
    private onConnected;
    private onError;
    private onBeforeConnect?;
    constructor(onConnected: () => void, onError: (error: Error) => void, onBeforeConnect?: ((walletId: string) => void) | undefined);
    private handleConnect;
}
//# sourceMappingURL=WalletConnectionContent.d.ts.map