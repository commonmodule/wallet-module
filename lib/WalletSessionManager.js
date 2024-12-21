import { Store } from "@common-module/app";
import { AlertDialog, AppCompConfig, ConfirmDialog, ErrorDialog, } from "@common-module/app-components";
import { EventContainer } from "@common-module/ts";
import { getChainById } from "@common-module/wallet-utils";
import { ContractFunctionExecutionError, } from "viem";
import WalletConnectionModal from "./components/WalletConnectionModal.js";
import InsufficientBalanceError from "./errors/InsufficientBalanceError.js";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
import WalletModuleConfig from "./WalletModuleConfig.js";
class WalletSessionManager extends EventContainer {
    store = new Store("wallet-session-manager");
    getConnectedWallet() {
        return this.store.get("connectedWallet");
    }
    getConnectedAddress() {
        return this.store.get("connectedAddress");
    }
    isConnected() {
        return !!this.getConnectedWallet() && !!this.getConnectedAddress();
    }
    init() {
        UniversalWalletConnector.init(this.getConnectedWallet());
    }
    setConnectedWalletInfo(walletId, walletAddress) {
        const currentIsConnected = this.isConnected();
        this.store.setPermanent("connectedWallet", walletId);
        this.store.setPermanent("connectedAddress", walletAddress);
        if (currentIsConnected !== this.isConnected()) {
            this.emit("sessionChanged", this.isConnected());
        }
    }
    async connect() {
        this.disconnect();
        const result = await new WalletConnectionModal().waitForLogin();
        this.setConnectedWalletInfo(result.walletId, result.walletAddress);
    }
    disconnect() {
        UniversalWalletConnector.disconnect();
        const currentIsConnected = this.isConnected();
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        if (currentIsConnected !== this.isConnected()) {
            this.emit("sessionChanged", this.isConnected());
        }
    }
    async getBalance(chainId, walletAddress) {
        return await UniversalWalletConnector.getBalance(chainId, walletAddress);
    }
    async readContract(parameters) {
        return await UniversalWalletConnector.readContract(parameters);
    }
    async estimateGas(parameters) {
        return await UniversalWalletConnector.estimateGas(parameters);
    }
    async writeContract(parameters) {
        if (!this.getConnectedAddress() || !UniversalWalletConnector.getAddress()) {
            this.showConnectWalletDialog();
            throw new Error("Not connected");
        }
        if (UniversalWalletConnector.getAddress() !== this.getConnectedAddress()) {
            this.showWalletMismatchDialog();
            throw new Error("Wallet address mismatch");
        }
        if (!parameters.chainId) {
            throw new Error("Chain ID not provided");
        }
        const chainId = UniversalWalletConnector.getChainId();
        if (chainId !== parameters.chainId) {
            this.showSwitchNetworkDialog(chainId, parameters.chainId);
            throw new Error("Network mismatch");
        }
        try {
            parameters.account = this.getConnectedAddress();
            return await UniversalWalletConnector.writeContract(parameters);
        }
        catch (error) {
            if (error instanceof InsufficientBalanceError) {
                const chain = WalletModuleConfig.chains.find((c) => c.id === parameters.chainId);
                if (chain?.faucetUrl) {
                    const symbol = chain.nativeCurrency.symbol;
                    new ConfirmDialog(".insufficient-balance", {
                        icon: new AppCompConfig.WarningIcon(),
                        title: "Insufficient Balance",
                        message: `You do not have enough balance to execute this transaction. Would you like to get some ${symbol} from the faucet?`,
                        confirmButtonTitle: `Get ${symbol}`,
                        onConfirm: () => window.open(chain.faucetUrl, "_blank"),
                    });
                }
                else {
                    new ErrorDialog({
                        title: "Insufficient Balance",
                        message: "You do not have enough balance to execute this transaction.",
                    });
                }
            }
            else if (error instanceof ContractFunctionExecutionError) {
                const match = error.message.match(/The current chain of the wallet \(id: (\d+)\) does not match the target chain for the transaction \(id: (\d+)/);
                if (match) {
                    this.showSwitchNetworkDialog(parseInt(match[1]), parseInt(match[2]));
                }
                else {
                    new ErrorDialog({
                        title: "Transaction Failed",
                        message: error.message,
                    });
                }
            }
            else {
                new ErrorDialog({
                    title: "Transaction Failed",
                    message: error.message,
                });
            }
            throw error;
        }
    }
    showConnectWalletDialog() {
        new ConfirmDialog(".connect-wallet", {
            icon: new AppCompConfig.WarningIcon(),
            title: "Connect Wallet",
            message: "You need to connect your wallet to execute this transaction. Would you like to connect your wallet now?",
            confirmButtonTitle: "Connect Wallet",
            onConfirm: () => {
                this.connect();
            },
        });
    }
    showWalletMismatchDialog() {
        const currentWalletAddress = UniversalWalletConnector.getAddress();
        const requiredWalletAddress = this.getConnectedAddress();
        new ConfirmDialog(".wallet-mismatch", {
            icon: new AppCompConfig.WarningIcon(),
            title: "Wallet Address Mismatch",
            message: `Your current wallet address (${currentWalletAddress}) differs from the connected wallet address (${requiredWalletAddress}). Would you like to reconnect your wallet with the correct address?`,
            confirmButtonTitle: "Reconnect Wallet",
            onConfirm: () => {
                this.connect();
            },
        });
    }
    showSwitchNetworkDialog(currentChainId, targetChainId) {
        const currentChainName = currentChainId
            ? getChainById(currentChainId)?.name ?? "Unknown"
            : "Unknown";
        const targetChainName = getChainById(targetChainId)?.name ?? "Unknown";
        new ConfirmDialog(".switch-network", {
            icon: new AppCompConfig.WarningIcon(),
            title: "Switch Network",
            message: `You are currently connected to ${currentChainName}. Unable to execute transaction on ${targetChainName}. Would you like to switch to ${targetChainName}?`,
            confirmButtonTitle: "Switch Network",
            onConfirm: async () => {
                const changedChainId = await UniversalWalletConnector.switchChain(targetChainId);
                if (changedChainId !== targetChainId) {
                    new ErrorDialog({
                        title: "Network Switch Failed",
                        message: "Failed to switch network",
                    });
                    throw new Error("Failed to switch network");
                }
                else {
                    new AlertDialog({
                        icon: new AppCompConfig.SuccessIcon(),
                        title: "Network Switched",
                        message: `You have successfully switched to ${targetChainName}.`,
                    });
                }
            },
        });
    }
}
export default new WalletSessionManager();
//# sourceMappingURL=WalletSessionManager.js.map