import { BrowserProvider } from "ethers";
import ChainInfo from "../ChainInfo.js";

export default interface Wallet {
  init(options: {
    name: string;
    icon: string;
    description: string;
    chains: { [name: string]: ChainInfo };
    walletConnectProjectId: string;
  }): void;
  connect(): Promise<BrowserProvider>;
  disconnect(): Promise<void>;
  switchChain(chainId: number): Promise<void>;
}
