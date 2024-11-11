import { Store } from "@common-module/app";
import { EventContainer } from "@common-module/ts";
import { JsonRpcSigner } from "ethers";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
class WalletConnectionManager extends EventContainer {
    store = new Store("wallet-connection-manager");
    get connectedWallet() {
        return this.store.get("connectedWallet");
    }
    get connectedAddress() {
        return this.store.get("connectedAddress");
    }
    get isConnected() {
        return !!this.connectedWallet && !!this.connectedAddress;
    }
    addConnectionInfo(walletId, walletAddress) {
        this.store.setPermanent("connectedWallet", walletId);
        this.store.setPermanent("connectedAddress", walletAddress);
        this.emit("connectionChanged");
    }
    async disconnect() {
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        this.emit("connectionChanged");
    }
    async getBalance() {
        if (!this.isConnected)
            throw new Error("Not connected");
        const provider = await UniversalWalletConnector.getProvider(this.connectedWallet);
        return await provider.getBalance(this.connectedAddress);
    }
    async addChain(chainName) {
        if (!this.isConnected)
            throw new Error("Not connected");
        const walletId = this.connectedWallet;
        await UniversalWalletConnector.addChain(walletId, chainName);
    }
    async getSigner(targetChainName) {
        if (!this.isConnected)
            throw new Error("Not connected");
        const walletAddress = await UniversalWalletConnector.connect(this.connectedWallet);
        if (walletAddress === undefined)
            throw new Error("No accounts found");
        if (!this.connectedAddress || walletAddress !== this.connectedAddress) {
            throw new Error("Connected wallet address does not match");
        }
        let provider = await UniversalWalletConnector.getProvider(this.connectedWallet);
        let chainName = (await provider.getNetwork()).name;
        if (chainName !== targetChainName) {
            await UniversalWalletConnector.switchChain(this.connectedWallet, targetChainName);
            provider = await UniversalWalletConnector.getProvider(this.connectedWallet);
            chainName = (await provider.getNetwork()).name;
        }
        if (chainName !== targetChainName) {
            throw new Error("Connected chain does not match");
        }
        return new JsonRpcSigner(provider, walletAddress);
    }
}
export default new WalletConnectionManager();
//# sourceMappingURL=WalletConnectionManager.js.map