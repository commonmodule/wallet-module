import { DomNode } from "@common-module/app";
import {
  Config,
  connect,
  ConnectReturnType,
  CreateConnectorFn,
  signMessage,
} from "@wagmi/core";

export default abstract class WalletConnector {
  abstract walletId: string;
  abstract walletName: string;
  abstract walletIcon: DomNode;

  private _config?: Config;
  protected get config() {
    if (!this._config) throw new Error("Config not initialized");
    return this._config;
  }
  protected set config(config: Config) {
    this._config = config;
  }

  private _wagmiConnector?: CreateConnectorFn;
  public get wagmiConnector() {
    if (!this._wagmiConnector) throw new Error("Connector not initialized");
    return this._wagmiConnector;
  }
  public set wagmiConnector(connector: CreateConnectorFn) {
    this._wagmiConnector = connector;
  }

  public abstract init(config: Config): void;

  public async connect(): Promise<ConnectReturnType<Config>> {
    return await connect(this.config, { connector: this.wagmiConnector });
  }

  public async signMessage(walletAddress: `0x${string}`, message: string) {
    return await signMessage(this.config, { account: walletAddress, message });
  }
}
