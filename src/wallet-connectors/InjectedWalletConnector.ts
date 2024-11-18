import { DomNode, el } from "@common-module/app";
import { injected } from "@wagmi/connectors";
import { Config } from "@wagmi/core";
import WalletConnector from "./WalletConnector.js";

export interface InjectedWalletInfo {
  name: string;
  icon: string;
  rdns: string;
  uuid: string;
}

export default class InjectedWalletConnector extends WalletConnector {
  public walletId: string;
  public walletName: string;
  public walletIcon: DomNode;

  constructor(private walletInfo: InjectedWalletInfo, private provider: any) {
    super();
    this.walletId = walletInfo.uuid;
    this.walletName = walletInfo.name;
    this.walletIcon = el("img.icon", { src: walletInfo.icon });
  }

  public init(config: Config) {
    this.config = config;

    const walletInfo = this.walletInfo;
    const provider = this.provider;

    this.wagmiConnector = injected({
      target() {
        return {
          id: walletInfo.uuid,
          name: walletInfo.name,
          icon: walletInfo.icon,
          provider,
        };
      },
    });
  }
}
