import { DomNode } from "@common-module/app";
import { Config, ConnectReturnType, CreateConnectorFn } from "@wagmi/core";
export default abstract class WalletConnector {
    abstract walletId: string;
    abstract walletName: string;
    abstract walletIcon: DomNode;
    private _config?;
    protected get config(): Config;
    protected set config(config: Config);
    private _wagmiConnector?;
    get wagmiConnector(): CreateConnectorFn;
    set wagmiConnector(connector: CreateConnectorFn);
    abstract init(config: Config): void;
    connect(): Promise<ConnectReturnType<Config>>;
    signMessage(walletAddress: `0x${string}`, message: string): Promise<`0x${string}`>;
}
//# sourceMappingURL=WalletConnector.d.ts.map