import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { StringUtil } from "@common-module/app";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import ChainInfo from "../ChainInfo.js";
import Wallet from "./Wallet.js";

class CoinbaseWallet implements Wallet {
  private chains!: { [name: string]: ChainInfo };
  private eip1193Provider!: Eip1193Provider;

  public init(options: {
    name: string;
    icon: string;
    chains: { [name: string]: ChainInfo };
  }) {
    this.chains = options.chains;
    this.eip1193Provider = new CoinbaseWalletSDK({
      appName: options.name,
      appLogoUrl: options.icon,
    }).makeWeb3Provider();
  }

  public open() {
    window.open("https://coinbasewallet.app.link");
  }

  public async connect(): Promise<BrowserProvider> {
    await this.eip1193Provider.request({ method: "eth_requestAccounts" });
    return new BrowserProvider(this.eip1193Provider);
  }

  public async disconnect(): Promise<void> {}

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

export default new CoinbaseWallet();
