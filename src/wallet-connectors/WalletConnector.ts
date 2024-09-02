import { BrowserProvider } from "ethers";

export default interface WalletConnector {
  connect(): Promise<BrowserProvider>;
}
