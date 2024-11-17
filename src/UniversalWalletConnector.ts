import { Config, createConfig, disconnect, http } from "@wagmi/core";
import CoinbaseWalletConnector from "./wallet-connectors/CoinbaseWalletConnector.js";
import MetaMaskConnector from "./wallet-connectors/MetaMaskConnector.js";
import WalletConnectConnector from "./wallet-connectors/WalletConnectConnector.js";
import WalletConnector from "./wallet-connectors/WalletConnector.js";
import WalletModuleConfig from "./WalletModuleConfig.js";

class UniversalWalletConnector {
  private _config?: Config;
  protected get config() {
    if (!this._config) throw new Error("Config not initialized");
    return this._config;
  }
  protected set config(config: Config) {
    this._config = config;
  }

  public connectors: WalletConnector[] = [
    WalletConnectConnector,
    MetaMaskConnector,
    CoinbaseWalletConnector,
  ];

  public init() {
    this.config = createConfig({
      chains: WalletModuleConfig.chains,
      transports: Object.fromEntries(
        WalletModuleConfig.chains.map((chain) => [chain.id, http()]),
      ),
    });

    for (const connector of this.connectors) {
      connector.init(this.config);
    }
  }

  public disconnect() {
    disconnect(this.config);
  }
}

export default new UniversalWalletConnector();
