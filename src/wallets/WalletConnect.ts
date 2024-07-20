import { BrowserProvider } from "ethers";
import ChainInfo from "../ChainInfo.js";
import Wallet from "./Wallet.js";
import { createWeb3Modal, defaultConfig, Web3Modal } from "@web3modal/ethers";

class WalletConnect implements Wallet {
  public init(options: {
    name: string;
    icon: string;
    description: string;
    chains: { [name: string]: ChainInfo };
    walletConnectProjectId: string;
  }) {}

  public async connect(): Promise<BrowserProvider> {
    throw new Error("Method not implemented.");
  }

  public async disconnect(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async switchChain(chainId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default new WalletConnect();
