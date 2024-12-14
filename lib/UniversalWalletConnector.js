import { ConfirmDialog } from "@common-module/app-components";
import { ArrayUtils } from "@common-module/ts";
import { createConfig, disconnect, getAccount, getBalance, getChainId, getWalletClient, http, readContract, reconnect, switchChain, waitForTransactionReceipt, writeContract, } from "@wagmi/core";
import { decodeEventLog, hexToNumber, } from "viem";
import InsufficientBalanceError from "./errors/InsufficientBalanceError.js";
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
    async getChainIdTest() {
        const chainId1 = getChainId(this.config);
        const chainId2 = getAccount(this.config).chainId;
        const walletClient = await getWalletClient(this.config);
        const hexChainId = await walletClient.request({
            method: "eth_chainId",
        });
        const chainId3 = hexToNumber(hexChainId);
        await new ConfirmDialog({
            title: "Chain Ids",
            message: `getChainId: ${chainId1}\ngetAccount: ${chainId2}\neth_chainId: ${chainId3}`,
        }).waitForConfirmation();
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
        if (parameters.value) {
            const walletAddress = this.getAddress();
            if (walletAddress) {
                const balance = await this.getBalance(parameters.chainId, walletAddress);
                if (balance < parameters.value) {
                    throw new InsufficientBalanceError();
                }
            }
        }
        const hash = await writeContract(this.config, parameters);
        const receipt = await waitForTransactionReceipt(this.config, { hash });
        const decodedEvents = receipt.logs.map((log) => {
            try {
                return decodeEventLog({
                    abi: parameters.abi,
                    data: log.data,
                    topics: log.topics,
                });
            }
            catch (error) {
                return null;
            }
        }).filter(Boolean);
        return decodedEvents;
    }
}
export default new UniversalWalletConnector();
//# sourceMappingURL=UniversalWalletConnector.js.map