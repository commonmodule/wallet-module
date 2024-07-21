import { BrowserInfo, Confirm } from "@common-module/app";
import { Contract as EthersContract, JsonRpcProvider, } from "ethers";
import WalletService from "./WalletService.js";
export default class Contract {
    abi;
    chain;
    address;
    provider;
    viewContract;
    constructor(abi, chain, address) {
        this.abi = abi;
        this.chain = chain;
        this.address = address;
        this.viewContract = new EthersContract(address, abi, this.provider = new JsonRpcProvider(chain.rpc));
    }
    async wait(run) {
        try {
            if (BrowserInfo.isMobileDevice &&
                WalletService.loggedInWallet === "metamask") {
                new Confirm({
                    title: "Transaction Request",
                    message: "Please confirm the transaction in MetaMask",
                }, () => WalletService.openWallet());
            }
            const contract = new EthersContract(this.address, this.abi, await WalletService.getSigner(this.chain.id));
            const tx = await run(contract);
            const checkReceipt = async () => {
                while (true) {
                    const receipt = await this.provider.getTransactionReceipt(tx.hash);
                    if (receipt?.blockNumber && receipt.status === 1)
                        return;
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                }
            };
            await Promise.race([checkReceipt(), tx.wait()]);
        }
        catch (e) {
            console.error(e);
            if (e.message?.includes("MetaMask is not connected/installed,")) {
                await WalletService.disconnect();
                await this.wait(run);
            }
            else
                throw e;
        }
    }
}
//# sourceMappingURL=Contract.js.map