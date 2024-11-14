import { EventContainer, StringUtils } from "@common-module/ts";
import { BrowserProvider, getAddress, toBeHex } from "ethers";
import WalletConnector, { ChainInfo } from "./WalletConnector.js";

const windowEthereum = window.ethereum as any;

class MetaMaskExtenstionConnector extends EventContainer<{
  addressChanged: (address: string | undefined) => void;
}> implements WalletConnector {
  public displayMode: "extension" = "extension";
  public connectedProvider = windowEthereum
    ? new BrowserProvider(windowEthereum)
    : undefined;

  public init() {
    const accountsChanged: any = ([address]: string[]) => {
      this.emit(
        "addressChanged",
        address ? getAddress(address) : undefined,
      );
    };
    windowEthereum.on("accountsChanged", accountsChanged);
  }

  public async connect() {
    const accounts = await windowEthereum.request({
      method: "eth_requestAccounts",
    }) as string[] | undefined;
    return accounts?.[0] ? getAddress(accounts[0]) : undefined;
  }

  public async disconnect() {
    await windowEthereum.request({
      method: "wallet_revokePermissions",
      params: [{ eth_accounts: {} }],
    });
  }

  public async addChain(chain: ChainInfo) {
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

  public async switchChain(chain: ChainInfo): Promise<void> {
    await windowEthereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toBeHex(chain.id).replace(/^0x0+/, "0x") }],
    });
  }
}

export default new MetaMaskExtenstionConnector();
