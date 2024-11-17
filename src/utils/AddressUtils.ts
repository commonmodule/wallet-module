import { getAddress } from "viem";

class AddressUtils {
  public shortenAddress(
    address: string,
    frontLength: number = 6,
    endLength: number = 4,
  ): string {
    const normalizedAddress = getAddress(address);

    if (normalizedAddress.length <= frontLength + endLength) {
      return normalizedAddress;
    }

    const front = normalizedAddress.slice(0, frontLength);
    const end = normalizedAddress.slice(-endLength);

    return `${front}...${end}`;
  }
}

export default new AddressUtils();
