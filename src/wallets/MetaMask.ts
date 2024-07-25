import { EventContainerV2, StringUtil } from "@common-module/app";
import { MetaMaskSDK } from "@metamask/sdk";
import { BrowserProvider, Eip1193Provider, ethers, getAddress } from "ethers";
import ChainInfo from "../ChainInfo.js";
import Wallet from "./Wallet.js";

class MetaMask extends EventContainerV2<{
  addressChanged: (address: string) => void;
}> implements Wallet {
  private chains!: { [name: string]: ChainInfo };
  private metaMaskSdk: MetaMaskSDK | undefined;
  private eip1193Provider: Eip1193Provider | undefined;

  public init(options: {
    name: string;
    icon: string;
    chains: { [name: string]: ChainInfo };
  }) {
    this.chains = options.chains;
    if (window.ethereum) {
      const accountsChanged: any = ([address]: string[]) => {
        this.emit("addressChanged", getAddress(address));
      };
      window.ethereum.on("accountsChanged", accountsChanged);
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

  public open() {
    window.open("https://metamask.app.link");
  }

  public async connect(): Promise<BrowserProvider> {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return new BrowserProvider(window.ethereum);
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

  public async disconnect(): Promise<void> {
    this.metaMaskSdk?.terminate();
  }

  public async switchChain(chainId: number): Promise<void> {
    const [chainName, chainInfo] =
      Object.entries(this.chains).find(([, info]) => info.id === chainId) || [];
    if (!chainName || !chainInfo) throw new Error("Chain not found");

    const param = {
      chainId: ethers.toBeHex(chainInfo.id),
      chainName: StringUtil.capitalize(chainName),
      blockExplorerUrls: [chainInfo.explorerUrl],
      nativeCurrency: { symbol: chainInfo.symbol, decimals: 18 },
      rpcUrls: [chainInfo.rpc],
    };

    if (window.ethereum) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [param],
      });
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: param.chainId }],
      });
    } else {
      if (!this.eip1193Provider) throw new Error("No EIP-1193 provider");
      await this.eip1193Provider.request({
        method: "wallet_addEthereumChain",
        params: [param],
      });
      await this.eip1193Provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: param.chainId }],
      });
    }
  }
}

export default new MetaMask();
