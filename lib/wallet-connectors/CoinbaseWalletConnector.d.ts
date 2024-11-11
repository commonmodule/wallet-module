import { BrowserProvider } from "ethers";
import WalletConnector, { ChainInfo, WalletConnectorOptions } from "./WalletConnector.js";
declare class CoinbaseWalletConnector implements WalletConnector {
    private _eip1193Provider;
    private get eip1193Provider();
    init(options: WalletConnectorOptions): void;
    get displayMode(): "modal" | "extension";
    get connectedProvider(): BrowserProvider;
    connect(): Promise<{
        provider: BrowserProvider;
        walletAccount: string | undefined;
    }>;
    disconnect(): Promise<void>;
    addChain(chain: ChainInfo): Promise<void>;
    switchChain(chain: ChainInfo): Promise<void>;
}
declare const _default: CoinbaseWalletConnector;
export default _default;
//# sourceMappingURL=CoinbaseWalletConnector.d.ts.map