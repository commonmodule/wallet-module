import { DefaultAvatar } from "@common-module/app-components";
import { getAddress } from "viem";
export default class WalletAddressAvatar extends DefaultAvatar {
    constructor(walletAddress) {
        super(".wallet-avatar", getAddress(walletAddress));
    }
}
//# sourceMappingURL=WalletAddressAvatar.js.map