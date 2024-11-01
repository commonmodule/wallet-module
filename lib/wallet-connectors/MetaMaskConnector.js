import { EventContainer, StringUtils } from "@common-module/ts";
import { MetaMaskSDK } from "@metamask/sdk";
import { BrowserProvider, getAddress, toBeHex } from "ethers";
const windowEthereum = window.ethereum;
class MetaMaskConnector extends EventContainer {
    metaMaskSdk;
    eip1193Provider;
    init(options) {
        if (windowEthereum) {
            const accountsChanged = ([address]) => {
                this.emit("addressChanged", address ? getAddress(address) : undefined);
            };
            windowEthereum.on("accountsChanged", accountsChanged);
        }
        else {
            this.metaMaskSdk = new MetaMaskSDK({
                dappMetadata: {
                    name: options.name,
                    url: window.location.origin,
                    iconUrl: options.icon,
                },
            });
        }
    }
    checkDisplayMode() {
        return windowEthereum ? "extension" : "modal";
    }
    async connect() {
        if (windowEthereum) {
            await windowEthereum.request({ method: "eth_requestAccounts" });
            return new BrowserProvider(windowEthereum);
        }
        else {
            if (!this.metaMaskSdk)
                throw new Error("MetaMask SDK not found");
            await this.metaMaskSdk.connect();
            this.eip1193Provider = this.metaMaskSdk.getProvider();
            if (!this.eip1193Provider) {
                throw new Error("MetaMask SDK provider not found");
            }
            await this.eip1193Provider.request({ method: "eth_requestAccounts" });
            return new BrowserProvider(this.eip1193Provider);
        }
    }
    async disconnect() {
        if (windowEthereum) {
            await windowEthereum.request({
                method: "wallet_revokePermissions",
                params: [{ eth_accounts: {} }],
            });
        }
        else {
            await this.metaMaskSdk?.disconnect();
        }
    }
    async addChain(chain) {
        const provider = windowEthereum || this.eip1193Provider;
        if (!provider)
            throw new Error("No EIP-1193 provider");
        await provider.request({
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
}
export default new MetaMaskConnector();
//# sourceMappingURL=MetaMaskConnector.js.map