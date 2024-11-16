import { EventContainer } from "@common-module/ts";
import { AppKit } from "@reown/appkit";
import { Config, ReadContractParameters, WriteContractParameters } from "@wagmi/core";
import { type Abi, type ContractFunctionArgs, type ContractFunctionName } from "viem";
export default class WalletConnector extends EventContainer<{
    addressChanged: (walletAddress: string | undefined) => void;
}> {
    private appKit;
    walletAddress: string | undefined;
    constructor(appKit: AppKit);
    openWallet(): void;
    disconnect(): Promise<void>;
    readContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(parameters: ReadContractParameters<abi, functionName, args, Config>): Promise<import("viem").ContractFunctionReturnType<abi, "pure" | "view", functionName, args>>;
    writeContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainId extends Config["chains"][number]["id"]>(parameters: WriteContractParameters<abi, functionName, args, Config, chainId>): Promise<`0x${string}`>;
}
//# sourceMappingURL=WalletConnector.d.ts.map