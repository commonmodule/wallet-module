import { EventContainer } from "@common-module/ts";
import { Metadata } from "@reown/appkit";
import { AppKitSIWEClient } from "@reown/appkit-siwe";
import { AppKitNetwork } from "@reown/appkit/networks";
import { Config, ReadContractParameters, WriteContractParameters } from "@wagmi/core";
import type { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
interface WalletConnectionManagerOptions {
    projectId: string;
    metadata: Metadata;
    networks: [AppKitNetwork, ...AppKitNetwork[]];
    siweConfig?: AppKitSIWEClient;
}
declare class WalletConnectionManager extends EventContainer<{
    connectionChanged: () => void;
}> {
    private store;
    private wagmiAdapter;
    private _modal;
    private _walletAddress;
    getConnectedAddress(): string | undefined;
    private get modal();
    private set modal(value);
    private getWagmiConfig;
    init(options: WalletConnectionManagerOptions): void;
    openModal(): void;
    readContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(parameters: ReadContractParameters<abi, functionName, args, Config>): Promise<import("viem").ContractFunctionReturnType<abi, "pure" | "view", functionName, args>>;
    writeContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainId extends Config["chains"][number]["id"]>(parameters: WriteContractParameters<abi, functionName, args, Config, chainId>): Promise<`0x${string}`>;
}
declare const _default: WalletConnectionManager;
export default _default;
//# sourceMappingURL=WalletConnectionManager%20copy.d.ts.map