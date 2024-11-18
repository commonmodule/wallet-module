import { Store } from "@common-module/app";
import { ConfirmDialog, ErrorDialog } from "@common-module/app-components";
import { EventContainer } from "@common-module/ts";
import { ContractFunctionExecutionError, } from "viem";
import * as all from "viem/chains";
import WalletConnectionModal from "./components/WalletConnectionModal.js";
import UniversalWalletConnector from "./UniversalWalletConnector.js";
const { ...chains } = all;
function getChainById(chainId) {
    for (const chain of Object.values(chains)) {
        if (chain.id === chainId) {
            return chain;
        }
    }
}
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
    async connect() {
        this.disconnect();
        const result = await new WalletConnectionModal().waitForLogin();
        this.store.setPermanent("connectedWallet", result.walletId);
        this.store.setPermanent("connectedAddress", result.walletAddress);
        this.emit("sessionChanged");
    }
    disconnect() {
        UniversalWalletConnector.disconnect();
        this.store.remove("connectedWallet");
        this.store.remove("connectedAddress");
        this.emit("sessionChanged");
    }
    async getBalance(chainId, walletAddress) {
        return await UniversalWalletConnector.getBalance(chainId, walletAddress);
    }
    async readContract(parameters) {
        return await UniversalWalletConnector.readContract(parameters);
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
        if (!parameters.chainId)
            throw new Error("Chain ID not provided");
        const chainId = UniversalWalletConnector.getChainId();
        if (chainId !== parameters.chainId) {
            this.showSwitchNetworkDialog(chainId, parameters.chainId);
            throw new Error("Chain mismatch");
        }
        try {
            return await UniversalWalletConnector.writeContract(parameters);
        }
        catch (error) {
            if (error instanceof ContractFunctionExecutionError) {
                const match = error.message.match(/The current chain of the wallet \(id: (\d+)\) does not match the target chain for the transaction \(id: (\d+)/);
                if (match) {
                    this.showSwitchNetworkDialog(parseInt(match[1]), parseInt(match[2]));
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
            title: "Switch Network",
            message: `You are currently connected to ${currentChainName}. Unable to execute transaction on ${targetChainName}. Would you like to switch to ${targetChainName}?`,
            confirmButtonTitle: "Switch Network",
            onConfirm: () => {
                UniversalWalletConnector.switchChain(targetChainId);
            },
        });
    }
}
export default new WalletSessionManager();
//# sourceMappingURL=WalletSessionManager.js.map