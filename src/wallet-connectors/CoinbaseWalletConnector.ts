import { coinbaseWallet } from "@wagmi/connectors";
import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";

class CoinbaseWalletConnector extends WalletConnector {
  public walletId = "coinbase-wallet";

  public init(config: Config) {
    this.config = config;
    this.wagmiConnector = coinbaseWallet();
  }
}

export default new CoinbaseWalletConnector();
