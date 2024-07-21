import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { EventContainerV2, StringUtil } from "@common-module/app";
import { BrowserProvider, ethers } from "ethers";
class CoinbaseWallet extends EventContainerV2 {
    chains;
    eip1193Provider;
    init(options) {
        this.chains = options.chains;
        this.eip1193Provider = new CoinbaseWalletSDK({
            appName: options.name,
            appLogoUrl: options.icon,
        }).makeWeb3Provider();
    }
    open() {
        window.open("https://coinbasewallet.app.link");
    }
    async connect() {
        await this.eip1193Provider.request({ method: "eth_requestAccounts" });
        return new BrowserProvider(this.eip1193Provider);
    }
    async disconnect() { }
    async switchChain(chainId) {
        const [chainName, chainInfo] = Object.entries(this.chains).find(([, info]) => info.id === chainId) || [];
        if (!chainName || !chainInfo)
            throw new Error("Chain not found");
        const param = {
            chainId: ethers.toBeHex(chainInfo.id),
            chainName: StringUtil.capitalize(chainName),
            blockExplorerUrls: [chainInfo.explorerUrl],
            nativeCurrency: { symbol: chainInfo.symbol, decimals: 18 },
            rpcUrls: [chainInfo.rpc],
        };
        await this.eip1193Provider.request({
            method: "wallet_addEthereumChain",
            params: [param],
        });
        await this.eip1193Provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: param.chainId }],
        });
    }
}
export default new CoinbaseWallet();
//# sourceMappingURL=CoinbaseWallet.js.map