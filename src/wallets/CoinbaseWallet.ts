import { BrowserProvider } from "ethers";
import Wallet from "./Wallet.js";
import ChainInfo from "../ChainInfo.js";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

class CoinbaseWallet implements Wallet {
  public init(options: {
    name: string;
    icon: string;
    chains: { [name: string]: ChainInfo };
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

export default new CoinbaseWallet();
