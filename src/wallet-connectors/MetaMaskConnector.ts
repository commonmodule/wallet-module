import { metaMask } from "@wagmi/connectors";
import { Config, connect, ConnectReturnType } from "@wagmi/core";
import MetaMaskIcon from "../components/wallet-icons/MetaMaskIcon.js";
import WalletConnector from "./WalletConnector.js";

class MetaMaskConnector extends WalletConnector {
  public walletId = "metamask";
  public walletName = "MetaMask";
  public walletIcon = new MetaMaskIcon();

  public init(config: Config) {
    this.config = config;
    this.wagmiConnector = metaMask();
  }

  public async connect(): Promise<ConnectReturnType<Config>> {
    return new Promise((resolve, reject) => {
      let found = false;

      const findingModelInterval = setInterval(() => {
        const model = document.querySelector(".install-model");
        if (model) {
          if (!found) found = true;
        } else {
          if (found) {
            clearInterval(findingModelInterval);
            reject(new Error("User rejected request"));
          }
        }
      }, 1000);

      connect(this.config, { connector: this.wagmiConnector })
        .then((result) => resolve(result))
        .catch((error) => reject(error))
        .finally(() => clearInterval(findingModelInterval));
    });
  }
}

export default new MetaMaskConnector();
