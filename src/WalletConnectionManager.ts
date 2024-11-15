import { AppKit, createAppKit, Metadata } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { AppKitSIWEClient } from "@reown/appkit-siwe";
import { AppKitNetwork } from "@reown/appkit/networks";

class WalletConnectionManager {
  private _modal: AppKit | undefined;

  private get modal() {
    if (!this._modal) throw new Error("Modal not initialized");
    return this._modal;
  }

  private set modal(modal: AppKit) {
    this._modal = modal;
  }

  public init(
    projectId: string,
    metadata: Metadata,
    networks: [AppKitNetwork, ...AppKitNetwork[]],
    siweConfig?: AppKitSIWEClient,
  ) {
    const wagmiAdapter = new WagmiAdapter({
      projectId,
      networks,
    });

    this.modal = createAppKit({
      adapters: [wagmiAdapter],
      networks,
      metadata,
      projectId,
      features: { analytics: true },
      siweConfig,
    });
  }
}

export default new WalletConnectionManager();
