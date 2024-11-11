import { EventContainer, StringUtils } from "@common-module/ts";
import { BrowserProvider, Eip1193Provider, getAddress, toBeHex } from "ethers";
import WalletConnector, {
  ChainInfo,
  WalletConnectorOptions,
} from "./WalletConnector.js";

const METAMASK_STORES = {
  ios: "https://apps.apple.com/us/app/metamask/id1438144202",
  android: "https://play.google.com/store/apps/details?id=io.metamask",
};

class MetaMaskSDKConnector extends EventContainer<{
  addressChanged: (address: string | undefined) => void;
}> implements WalletConnector {
  private eip1193Provider: Eip1193Provider | undefined;
  private connectedAddress: string | undefined;

  public displayMode: "modal" = "modal";
  public connectedProvider: BrowserProvider | undefined;

  public init(options: WalletConnectorOptions) {
  }

  public async connect() {
    const currentUrl = window.location.href;
    const metamaskDeepLink = `https://metamask.app.link/dapp/${currentUrl}`;
    window.location.href = metamaskDeepLink;

    /*if (!this.connectedProvider) {
      if (!this.metaMaskSdk) throw new Error("MetaMask SDK not found");
      const accounts = await this.metaMaskSdk.connect();

      this.eip1193Provider = this.metaMaskSdk.getProvider();
      if (!this.eip1193Provider) {
        throw new Error("MetaMask SDK provider not found");
      }

      this.connectedProvider = new BrowserProvider(this.eip1193Provider);
      this.connectedAddress = accounts?.[0]
        ? getAddress(accounts[0])
        : undefined;
    }

    console.log(this.metaMaskSdk?.isAuthorized());
    console.log(this.metaMaskSdk?.isExtensionActive());
    console.log(this.metaMaskSdk?.isInitialized());
    console.log(this.metaMaskSdk?.getWalletStatus());

    return this.connectedAddress;*/

    return undefined;
  }

  public async disconnect() {
  }

  public async addChain(chain: ChainInfo) {
    if (!this.eip1193Provider) throw new Error("No EIP-1193 provider");
    await this.eip1193Provider.request({
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
    if (!this.eip1193Provider) throw new Error("No EIP-1193 provider");
    await this.eip1193Provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toBeHex(chain.id).replace(/^0x0+/, "0x") }],
    });
  }
}

export default new MetaMaskSDKConnector();
