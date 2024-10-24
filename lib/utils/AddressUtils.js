import { getAddress } from "ethers";
class AddressUtils {
    shortenAddress(address, frontLength = 6, endLength = 4) {
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
//# sourceMappingURL=AddressUtils.js.map