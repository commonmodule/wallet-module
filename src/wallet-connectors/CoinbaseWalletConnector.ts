import { coinbaseWallet } from "@wagmi/connectors";
import { Config } from "@wagmi/core";
import CoinbaseWalletIcon from "../components/wallet-icons/CoinbaseWalletLogo.js";
import WalletConnector from "./WalletConnector.js";

class CoinbaseWalletConnector extends WalletConnector {
  public walletId = "coinbase-wallet";
  public walletName = "Coinbase Wallet";
  public walletIcon = new CoinbaseWalletIcon();

  public init(config: Config) {
    this.config = config;
    this.wagmiConnector = coinbaseWallet();
  }
}

export default new CoinbaseWalletConnector();
