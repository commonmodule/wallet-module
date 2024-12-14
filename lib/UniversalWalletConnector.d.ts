import { Config, ReadContractParameters, WriteContractParameters } from "@wagmi/core";
import { type Abi, type ContractFunctionArgs, type ContractFunctionName, DecodeEventLogReturnType } from "viem";
import WalletConnector from "./wallet-connectors/WalletConnector.js";
declare class UniversalWalletConnector {
    private _config?;
    protected get config(): Config;
    protected set config(config: Config);
    connectors: WalletConnector[];
    init(walletId?: string): void;
    disconnect(): void;
    getChainId(): number | undefined;
    getChainIdTest(): Promise<void>;
    switchChain(chainId: number): Promise<number>;
    getAddress(): `0x${string}` | undefined;
    getBalance(chainId: number | undefined, walletAddress: `0x${string}`): Promise<bigint>;
    readContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "pure" | "view">, args extends ContractFunctionArgs<abi, "pure" | "view", functionName>>(parameters: ReadContractParameters<abi, functionName, args, Config>): Promise<import("viem").ContractFunctionReturnType<abi, "pure" | "view", functionName, args>>;
    writeContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, "nonpayable" | "payable">, args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainId extends Config["chains"][number]["id"]>(parameters: WriteContractParameters<abi, functionName, args, Config, chainId>): Promise<DecodeEventLogReturnType[]>;
}
declare const _default: UniversalWalletConnector;
export default _default;
//# sourceMappingURL=UniversalWalletConnector.d.ts.map