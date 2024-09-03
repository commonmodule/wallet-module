import { EventContainer } from "@common-module/ts";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { BrowserProvider, ethers } from "ethers";
class WalletConnectConnector extends EventContainer {
    web3Modal;
    resolveConnection;
    rejectConnection;
    init(options) {
        this.web3Modal = createWeb3Modal({
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
        this.web3Modal.subscribeEvents((newEvent) => {
            if (newEvent.data.event === "MODAL_CLOSE" && this.rejectConnection) {
                this.rejectConnection(new Error("User closed WalletConnect modal"));
                this.rejectConnection = undefined;
                this.resolveConnection = undefined;
            }
        });
        let cachedAddress = this.web3Modal.getAddress();
        this.web3Modal.subscribeProvider((newState) => {
            if (newState.address && this.resolveConnection) {
                this.resolveConnection();
                this.rejectConnection = undefined;
                this.resolveConnection = undefined;
            }
            if (newState.address && cachedAddress !== newState.address) {
                this.emit("addressChanged", ethers.getAddress(newState.address));
                cachedAddress = newState.address;
            }
        });
    }
    async connect() {
        if (!this.web3Modal)
            throw new Error("Web3Modal not initialized");
        const walletAddress = this.web3Modal.getAddress();
        if (walletAddress !== undefined) {
            this.emit("addressChanged", ethers.getAddress(walletAddress));
        }
        else {
            await new Promise((resolve, reject) => {
                this.resolveConnection = resolve;
                this.rejectConnection = reject;
                this.web3Modal?.open();
            });
        }
        const walletProvider = this.web3Modal.getWalletProvider();
        if (!walletProvider)
            throw new Error("Wallet provider not found");
        return new BrowserProvider(walletProvider);
    }
}
export default new WalletConnectConnector();
//# sourceMappingURL=WalletConnectConnector.js.map