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
  chains: Record<string, ChainInfo>;
}

export default interface WalletConnector {
  displayMode: "modal" | "extension";
  connectedProvider: BrowserProvider | undefined;

  init(options: WalletConnectorOptions): void;
  connect(): Promise<string | undefined>;
  disconnect(): Promise<void>;
  addChain(chain: ChainInfo): Promise<void>;
  switchChain(chain: ChainInfo): Promise<void>;
}
