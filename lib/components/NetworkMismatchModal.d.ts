import { StructuredModal } from "@common-module/app-components";
interface NetworkMismatchModalOptions {
    currentChainId?: number;
    targetChainId: number;
}
export default class NetworkMismatchModal extends StructuredModal {
    private resolveProceed;
    private rejectProceed;
    constructor(options: NetworkMismatchModalOptions);
    waitForProceed(): Promise<void>;
}
export {};
//# sourceMappingURL=NetworkMismatchModal.d.ts.map