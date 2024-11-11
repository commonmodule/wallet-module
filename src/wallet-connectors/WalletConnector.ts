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
  init(options: WalletConnectorOptions): void;

  get displayMode(): "modal" | "extension";
  get connectedProvider(): BrowserProvider;

  connect(): Promise<{ provider: BrowserProvider; walletAddress?: string }>;
  disconnect(): Promise<void>;
  addChain(chain: ChainInfo): Promise<void>;
  switchChain(chain: ChainInfo): Promise<void>;
}
