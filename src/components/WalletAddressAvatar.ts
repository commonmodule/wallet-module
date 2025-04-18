import { DefaultAvatar } from "@commonmodule/app-components";
import { getAddress } from "viem";

export default class WalletAddressAvatar extends DefaultAvatar {
  constructor(walletAddress: string) {
    super(".wallet-avatar", getAddress(walletAddress));
  }
}
