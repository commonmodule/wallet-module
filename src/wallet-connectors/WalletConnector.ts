import { BrowserProvider } from "ethers";

export interface ChainInfo {
  id: number;
  name: string;
  symbol: string;
  rpc: string;
  explorerUrl: string;
}

export interface WalletConnectorOptions {
  name: string;
  icon: string;
  chains: { [name: string]: ChainInfo };
}

export default interface WalletConnector {
  init(options: WalletConnectorOptions): void;
  connect(): Promise<BrowserProvider>;
  addChain(chain: ChainInfo): Promise<void>;
}
