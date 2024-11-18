import { StructuredModal } from "@common-module/app-components";
interface NetworkMismatchModalOptions {
    currentChainId?: number;
    targetChainId: number;
}
export default class NetworkMismatchModal extends StructuredModal {
    private resolveTransaction;
    private rejectTransaction;
    constructor(options: NetworkMismatchModalOptions);
}
export {};
//# sourceMappingURL=ChainSwitchDialog.d.ts.map