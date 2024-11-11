import { EventContainer, StringUtils } from "@common-module/ts";
import { MetaMaskSDK } from "@metamask/sdk";
import { BrowserProvider, getAddress, toBeHex } from "ethers";
class MetaMaskSDKConnector extends EventContainer {
    metaMaskSdk;
    eip1193Provider;
    displayMode = "modal";
    connectedProvider;
    init(options) {
        this.metaMaskSdk = new MetaMaskSDK({
            dappMetadata: {
                name: options.name,
                url: window.location.origin,
                iconUrl: options.icon,
            },
        });
    }
    async connect() {
        if (!this.metaMaskSdk)
            throw new Error("MetaMask SDK not found");
        const accounts = await this.metaMaskSdk.connect();
        this.eip1193Provider = this.metaMaskSdk.getProvider();
        if (!this.eip1193Provider) {
            throw new Error("MetaMask SDK provider not found");
        }
        this.connectedProvider = new BrowserProvider(this.eip1193Provider);
        return accounts?.[0] ? getAddress(accounts[0]) : undefined;
    }
    async disconnect() {
        await this.metaMaskSdk?.terminate();
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