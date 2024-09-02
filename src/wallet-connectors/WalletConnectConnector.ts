import { EventContainer } from "@common-module/ts";
import { Web3Modal } from "@web3modal/ethers";
import { BrowserProvider, ethers } from "ethers";
import WalletConnector from "./WalletConnector.js";

class WalletConnectConnector extends EventContainer<{
  addressChanged: (address: string) => void;
}> implements WalletConnector {
  private web3Modal: Web3Modal | undefined;

  private resolveConnection: (() => void) | undefined;
  private rejectConnection: ((error: Error) => void) | undefined;

  public async connect() {
    if (!this.web3Modal) throw new Error("Web3Modal not initialized");

    const walletAddress = this.web3Modal.getAddress();
    if (walletAddress !== undefined) {
      this.emit("addressChanged", ethers.getAddress(walletAddress));
    } else {
      await new Promise<void>((resolve, reject) => {
        this.resolveConnection = resolve;
        this.rejectConnection = reject;
        this.web3Modal?.open();
      });
    }
    const walletProvider = this.web3Modal.getWalletProvider();
    if (!walletProvider) throw new Error("Wallet provider not found");
    return new BrowserProvider(walletProvider);
  }
}

export default new WalletConnectConnector();
