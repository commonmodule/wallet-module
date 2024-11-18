import { walletConnect } from "@wagmi/connectors";
import { Config } from "@wagmi/core";
import WalletConnectIcon from "../components/wallet-icons/WalletConnectIcon.js";
import WalletModuleConfig from "../WalletModuleConfig.js";
import WalletConnector from "./WalletConnector.js";

class WalletConnectConnector extends WalletConnector {
  public walletId = "walletconnect";
  public walletName = "WalletConnect";
  public walletIcon = new WalletConnectIcon();

  public init(config: Config) {
    this.config = config;
    this.wagmiConnector = walletConnect({
      projectId: WalletModuleConfig.walletConnectProjectId,
      qrModalOptions: {
        themeVariables: {
          "--wcm-z-index": "99998",
        },
      },
    });
  }
}

export default new WalletConnectConnector();
