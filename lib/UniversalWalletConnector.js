import { ArrayUtils } from "@common-module/ts";
import { createConfig, disconnect, getAccount, getBalance, http, readContract, reconnect, switchChain, waitForTransactionReceipt, writeContract, } from "@wagmi/core";
import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import InjectedWalletConnector from "./wallet-connectors/InjectedWalletConnector.js";
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
    connectors = window.ethereum?.isCoinbaseWallet
        ? [
            CoinbaseWalletConnector,
            MetaMaskConnector,
            WalletConnectConnector,
        ]
        : [
            MetaMaskConnector,
            CoinbaseWalletConnector,
            WalletConnectConnector,
        ];
    init(walletId) {
        this.config = createConfig({
            chains: WalletModuleConfig.chains,
            transports: Object.fromEntries(WalletModuleConfig.chains.map((chain) => [chain.id, http()])),
        });
        for (const connector of this.connectors) {
            connector.init(this.config);
            if (connector.walletId === walletId) {
                reconnect(this.config, { connectors: [connector.wagmiConnector] });
            }
        }
        window.addEventListener("eip6963:announceProvider", (event) => {
            const walletInfo = event.detail.info;
            const provider = event.detail.provider;
            if (walletInfo && provider) {
                if (walletInfo.rdns === "io.metamask" ||
                    walletInfo.rdns === "io.metamask.mobile") {
                    ArrayUtils.pull(this.connectors, MetaMaskConnector);
                    this.connectors.unshift(MetaMaskConnector);
                }
                else {
                    const connector = new InjectedWalletConnector(walletInfo, provider);
                    this.connectors.unshift(connector);
                    connector.init(this.config);
                    if (connector.walletId === walletId) {
                        reconnect(this.config, {
                            connectors: [connector.wagmiConnector],
                        });
                    }
                }
            }
        });
        window.dispatchEvent(new Event("eip6963:requestProvider"));
    }
    disconnect() {
        disconnect(this.config);
    }
    getChainId() {
        return getAccount(this.config).chainId;
    }
    switchChain(chainId) {
        switchChain(this.config, { chainId });
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