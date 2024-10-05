import { EventContainer } from "@common-module/ts";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { BrowserProvider, getAddress, toBeHex } from "ethers";
class WalletConnectConnector extends EventContainer {
    _web3Modal;
    get web3Modal() {
        if (!this._web3Modal)
            throw new Error("Web3Modal not initialized");
        return this._web3Modal;
    }
    resolveConnection;
    rejectConnection;
    init(options) {
        this._web3Modal = createWeb3Modal({
            projectId: options.walletConnectProjectId,
            ethersConfig: defaultConfig({
                metadata: {
                    name: options.name,
                    description: options.description,
                    url: window.location.origin,
                    icons: [options.icon],
                },
            }),
            chains: Object.entries(options.chains).map(([name, info]) => ({
                chainId: info.id,
                name,
                currency: info.symbol,
                rpcUrl: info.rpc,
                explorerUrl: info.explorerUrl,
            })),
        });
        this._web3Modal.subscribeEvents((newEvent) => {
            if (newEvent.data.event === "MODAL_CLOSE" && this.rejectConnection) {
                this.rejectConnection(new Error("User closed WalletConnect modal"));
                this.rejectConnection = undefined;
                this.resolveConnection = undefined;
            }
        });
        let cachedAddress = this._web3Modal.getAddress();
        this._web3Modal.subscribeProvider((newState) => {
            if (newState.address && this.resolveConnection) {
                this.resolveConnection();
                this.rejectConnection = undefined;
                this.resolveConnection = undefined;
            }
            if (cachedAddress !== newState.address) {
                this.emit("addressChanged", newState.address ? getAddress(newState.address) : undefined);
                cachedAddress = newState.address;
            }
        });
    }
    checkDisplayMode() {
        return "modal";
    }
    async connect() {
        const walletAddress = this.web3Modal.getAddress();
        if (walletAddress !== undefined) {
            this.emit("addressChanged", getAddress(walletAddress));
        }
        else {
            await new Promise((resolve, reject) => {
                this.resolveConnection = resolve;
                this.rejectConnection = reject;
                this._web3Modal?.open();
            });
        }
        const walletProvider = this.web3Modal.getWalletProvider();
        if (!walletProvider)
            throw new Error("Wallet provider not found");
        return new BrowserProvider(walletProvider);
    }
    async disconnect() {
        await this._web3Modal?.disconnect();
    }
    async addChain(chain) {
        const walletProvider = this.web3Modal.getWalletProvider();
        if (!walletProvider)
            throw new Error("Wallet provider not found");
        await walletProvider.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: toBeHex(chain.id).replace(/^0x0+/, "0x"),
                    chainName: chain.name,
                    blockExplorerUrls: [chain.explorerUrl],
                    nativeCurrency: { symbol: chain.symbol, decimals: 18 },
                    rpcUrls: [chain.rpc],
                },
            ],
        });
    }
}
export default new WalletConnectConnector();
//# sourceMappingURL=WalletConnectConnector.js.map