import { BrowserInfo, Confirm } from "@common-module/app";
import {
  Contract as EthersContract,
  ContractTransactionResponse,
  Interface,
  InterfaceAbi,
  JsonRpcProvider,
} from "ethers";
import ChainInfo from "./ChainInfo.js";
import WalletService from "./WalletService.js";

export default abstract class Contract {
  private provider: JsonRpcProvider;
  private viewContract: EthersContract;

  constructor(
    private abi: Interface | InterfaceAbi,
    private chain: ChainInfo,
    private address: string,
  ) {
    this.viewContract = new EthersContract(
      address,
      abi,
      this.provider = new JsonRpcProvider(chain.rpc),
    );
  }

  protected async wait(
    run: (contract: EthersContract) => Promise<ContractTransactionResponse>,
  ) {
    try {
      // fix for MetaMask bug on mobile
      if (
        BrowserInfo.isMobileDevice &&
        WalletService.loggedInWallet === "metamask"
      ) {
        new Confirm({
          title: "Transaction Request",
          message: "Please confirm the transaction in MetaMask",
        }, () => WalletService.openWallet());
      }

      const contract = new EthersContract(
        this.address,
        this.abi,
        await WalletService.getSigner(this.chain.id),
      );
      const tx = await run(contract);
      const checkReceipt = async () => {
        while (true) {
          const receipt = await this.provider.getTransactionReceipt(tx.hash);
          if (receipt?.blockNumber && receipt.status === 1) return;
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      };
      await Promise.race([checkReceipt(), tx.wait()]);
    } catch (e: any) {
      console.error(e);

      // fix for MetaMask bug on mobile
      if (e.message?.includes("MetaMask is not connected/installed,")) {
        await WalletService.disconnect();
        await this.wait(run); // retry
      } else throw e;
    }
  }
}
