import { EventContainer, StringUtils } from "@common-module/ts";
import { toBeHex } from "ethers";
const METAMASK_STORES = {
    ios: "https://apps.apple.com/us/app/metamask/id1438144202",
    android: "https://play.google.com/store/apps/details?id=io.metamask",
};
class MetaMaskSDKConnector extends EventContainer {
    eip1193Provider;
    connectedAddress;
    displayMode = "modal";
    connectedProvider;
    init(options) {
    }
    async connect() {
        const currentUrl = window.location.href;
        const metamaskDeepLink = `https://metamask.app.link/dapp/${currentUrl}`;
        window.location.href = metamaskDeepLink;
        return undefined;
    }
    async disconnect() {
    }
    async addChain(chain) {
        if (!this.eip1193Provider)
            throw new Error("No EIP-1193 provider");
        await this.eip1193Provider.request({
            method: "wallet_addEthereumChain",
            params: [{
                    chainId: toBeHex(chain.id).replace(/^0x0+/, "0x"),
                    chainName: StringUtils.capitalize(chain.name),
                    blockExplorerUrls: [chain.explorerUrl],
                    nativeCurrency: { symbol: chain.symbol, decimals: 18 },
                    rpcUrls: [chain.rpc],
                }],
        });
    }
    async switchChain(chain) {
        if (!this.eip1193Provider)
            throw new Error("No EIP-1193 provider");
        await this.eip1193Provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toBeHex(chain.id).replace(/^0x0+/, "0x") }],
        });
    }
}
export default new MetaMaskSDKConnector();
//# sourceMappingURL=MetaMaskSDKConnector.js.map