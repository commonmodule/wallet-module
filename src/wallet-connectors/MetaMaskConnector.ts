import { metaMask } from "@wagmi/connectors";
import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";

class MetaMaskConnector extends WalletConnector {
  public walletId = "metamask";

  public init(config: Config) {
    this.config = config;
    this.wagmiConnector = metaMask();
  }
}

export default new MetaMaskConnector();
