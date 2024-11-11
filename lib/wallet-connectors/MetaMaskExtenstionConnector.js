import { EventContainer, StringUtils } from "@common-module/ts";
import { BrowserProvider, getAddress, toBeHex } from "ethers";
const windowEthereum = window.ethereum;
class MetaMaskExtenstionConnector extends EventContainer {
    displayMode = "extension";
    connectedProvider = windowEthereum
        ? new BrowserProvider(windowEthereum)
        : undefined;
    init() {
        const accountsChanged = ([address]) => {
            this.emit("addressChanged", address ? getAddress(address) : undefined);
        };
        windowEthereum.on("accountsChanged", accountsChanged);
    }
    async connect() {
        const accounts = await windowEthereum.request({
            method: "eth_requestAccounts",
        });
        return accounts?.[0] ? getAddress(accounts[0]) : undefined;
    }
    async disconnect() {
        await windowEthereum.request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }],
        });
    }
    async addChain(chain) {
        await windowEthereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                    chainId: toBeHex(chain.id).replace(/^0x0+/, "0x"),
                    chainName: StringUtils.capitalize(chain.name),
                    blockExplorerUrls: [chain.explorerUrl],
                    nativeCurrency: { symbol: chain.symbol, decimals: 18 },
                    rpcUrls: [chain.rpc],
                }],
        });
    }
    async switchChain(chain) {
        await windowEthereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toBeHex(chain.id).replace(/^0x0+/, "0x") }],
        });
    }
}
export default new MetaMaskExtenstionConnector();
//# sourceMappingURL=MetaMaskExtenstionConnector.js.map