import { EventContainer } from "@common-module/ts";
import { MetaMaskSDK } from "@metamask/sdk";
import { BrowserProvider, ethers } from "ethers";
class MetaMaskConnector extends EventContainer {
    metaMaskSdk;
    eip1193Provider;
    init(options) {
        if (window.ethereum) {
            const accountsChanged = ([address]) => {
                this.emit("addressChanged", ethers.getAddress(address));
            };
            window.ethereum.on("accountsChanged", accountsChanged);
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
    async connect() {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            return new BrowserProvider(window.ethereum);
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
}
export default new MetaMaskConnector();
//# sourceMappingURL=MetaMaskConnector.js.map