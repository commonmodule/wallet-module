import { EventContainer, StringUtils } from "@common-module/ts";
import { MetaMaskSDK } from "@metamask/sdk";
import { BrowserProvider, Eip1193Provider, getAddress, toBeHex } from "ethers";
import WalletConnector, {
  ChainInfo,
  WalletConnectorOptions,
} from "./WalletConnector.js";

const windowEthereum = window.ethereum;

class MetaMaskConnector extends EventContainer<{
  addressChanged: (address: string | undefined) => void;
}> implements WalletConnector {
  private metaMaskSdk: MetaMaskSDK | undefined;
  private eip1193Provider: Eip1193Provider | undefined;

  public init(options: WalletConnectorOptions) {
    if (windowEthereum) {
      const accountsChanged: any = ([address]: string[]) => {
        this.emit(
          "addressChanged",
          address ? getAddress(address) : undefined,
        );
      };
      windowEthereum.on("accountsChanged", accountsChanged);
    } else {
      this.metaMaskSdk = new MetaMaskSDK({
        dappMetadata: {
          name: options.name,
          url: window.location.origin,
          iconUrl: options.icon,
        },
      });
    }
  }

  public checkDisplayMode(): "modal" | "extension" {
    return windowEthereum ? "extension" : "modal";
  }

  public async connect() {
    if (windowEthereum) {
      await windowEthereum.request({ method: "eth_requestAccounts" });
      return new BrowserProvider(windowEthereum);
    } else {
      if (!this.metaMaskSdk) throw new Error("MetaMask SDK not found");
      await this.metaMaskSdk.connect();
      this.eip1193Provider = this.metaMaskSdk.getProvider();
      if (!this.eip1193Provider) {
        throw new Error("MetaMask SDK provider not found");
      }
      await this.eip1193Provider.request({ method: "eth_requestAccounts" });
      return new BrowserProvider(this.eip1193Provider);
    }
  }

  public async disconnect() {
    if (windowEthereum) {
      await windowEthereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
    } else {
      await this.metaMaskSdk?.disconnect();
    }
  }

  public async addChain(chain: ChainInfo) {
    const provider = windowEthereum || this.eip1193Provider;
    if (!provider) throw new Error("No EIP-1193 provider");
    await provider.request({
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
}

export default new MetaMaskConnector();
