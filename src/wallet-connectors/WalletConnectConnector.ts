import { walletConnect } from "@wagmi/connectors";
import { Config } from "@wagmi/core";
import WalletModuleConfig from "../WalletModuleConfig.js";
import WalletConnector from "./WalletConnector.js";

class WalletConnectConnector extends WalletConnector {
  public walletId = "walletconnect";

  public init(config: Config) {
    this.config = config;
    this.wagmiConnector = walletConnect({
      projectId: WalletModuleConfig.walletConnectProjectId,
    });
  }
}

export default new WalletConnectConnector();
