import WalletProvider from "./providers/WalletProvider.js";
declare class WalletConnectionManager {
    private store;
    private providers;
    addProvider(walletName: string, walletProvider: WalletProvider): void;
    connectWallet(walletName: string): Promise<void>;
    get connectedWalletName(): string | undefined;
    get connectedWalletAddress(): string | undefined;
    disconnect(): void;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager.d.ts.map