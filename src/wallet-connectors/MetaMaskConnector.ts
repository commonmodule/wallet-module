import { EventContainer } from "@common-module/ts";
import { MetaMaskSDK } from "@metamask/sdk";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import WalletConnector, { WalletConnectorOptions } from "./WalletConnector.js";

class MetaMaskConnector extends EventContainer<{
  addressChanged: (address: string) => void;
}> implements WalletConnector {
  private metaMaskSdk: MetaMaskSDK | undefined;
  private eip1193Provider: Eip1193Provider | undefined;

  public init(options: WalletConnectorOptions) {
    if (window.ethereum) {
      const accountsChanged: any = ([address]: string[]) => {
        this.emit("addressChanged", ethers.getAddress(address));
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

  public async connect() {
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
}

export default new MetaMaskConnector();
