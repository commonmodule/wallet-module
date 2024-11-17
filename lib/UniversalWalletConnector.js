import { createConfig, disconnect, getAccount, getBalance, getWalletClient, http, readContract, reconnect, switchChain, waitForTransactionReceipt, writeContract, } from "@wagmi/core";
import { hexToNumber, } from "viem";
import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
import WalletModuleConfig from "./WalletModuleConfig.js";
class UniversalWalletConnector {
    _config;
    get config() {
        if (!this._config)
            throw new Error("Config not initialized");
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    connectors = [
        WalletConnectConnector,
        MetaMaskConnector,
        CoinbaseWalletConnector,
    ];
    init() {
        this.config = createConfig({
            chains: WalletModuleConfig.chains,
            transports: Object.fromEntries(WalletModuleConfig.chains.map((chain) => [chain.id, http()])),
        });
        for (const connector of this.connectors) {
            connector.init(this.config);
        }
        reconnect(this.config, {
            connectors: this.connectors.map((connector) => connector.wagmiConnector),
        });
    }
    disconnect() {
        disconnect(this.config);
    }
    async getChainId() {
        const walletClient = await getWalletClient(this.config);
        const hexChainId = await walletClient.request({
            method: "eth_chainId",
        });
        return hexToNumber(hexChainId);
    }
    async switchChain(chainId) {
        const result = await switchChain(this.config, { chainId });
        return result.id;
    }
    getAddress() {
        return getAccount(this.config).address;
    }
    async getBalance(chainId, walletAddress) {
        return (await getBalance(this.config, { chainId, address: walletAddress }))
            .value;
    }
    async readContract(parameters) {
        return await readContract(this.config, parameters);
    }
    async writeContract(parameters) {
        const hash = await writeContract(this.config, parameters);
        const receipt = await waitForTransactionReceipt(this.config, { hash });
        console.log(receipt);
    }
}
export default new UniversalWalletConnector();
//# sourceMappingURL=UniversalWalletConnector.js.map