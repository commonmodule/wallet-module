import { Chain as WagmiChain, mainnet } from "@wagmi/core/chains";

interface Chain extends WagmiChain {
  faucetUrl?: string;
}

export interface IWalletModuleConfig {
  chains: [Chain, ...Chain[]];
  walletConnectProjectId: string;
}

class WalletModuleConfig implements IWalletModuleConfig {
  public chains: [Chain, ...Chain[]] = [mainnet];

  private _walletConnectProjectId?: string;
  public get walletConnectProjectId() {
    if (!this._walletConnectProjectId) {
      throw new Error("WalletConnect project ID not set");
    }
    return this._walletConnectProjectId;
  }
  public set walletConnectProjectId(projectId: string) {
    this._walletConnectProjectId = projectId;
  }

  public init(options: IWalletModuleConfig) {
    this.chains = options.chains;
    this.walletConnectProjectId = options.walletConnectProjectId;
  }
}

export default new WalletModuleConfig();
