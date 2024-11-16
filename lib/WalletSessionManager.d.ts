import { EventContainer } from "@common-module/ts";
import { Config, ReadContractParameters, WriteContractParameters } from "@wagmi/core";
import type { Abi, ContractFunctionArgs, ContractFunctionName } from "viem";
import { WalletConnectorOptions } from "./WalletConnector.js";
declare class WalletSessionManager extends EventContainer<{
    sessionChanged: (walletAddress: string | undefined) => void;
}> {
    private store;
    getWalletAddress(): string | undefined;
    constructor();
    init(options: WalletConnectorOptions): void;
    openWallet(): void;
    readContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(parameters: ReadContractParameters<abi, functionName, args, Config>): Promise<import("viem").ContractFunctionReturnType<abi, "pure" | "view", functionName, args>>;
    writeContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainId extends Config["chains"][number]["id"]>(parameters: WriteContractParameters<abi, functionName, args, Config, chainId>): Promise<`0x${string}`>;
}
declare const _default: WalletSessionManager;
export default _default;
//# sourceMappingURL=WalletSessionManager.d.ts.map