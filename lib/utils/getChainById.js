import * as all from "viem/chains";
const { ...chains } = all;
export default function getChainById(chainId) {
    for (const chain of Object.values(chains)) {
        if (chain.id === chainId) {
            return chain;
        }
    }
}
//# sourceMappingURL=getChainById.js.map