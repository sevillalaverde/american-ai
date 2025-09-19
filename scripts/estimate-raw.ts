import "dotenv/config";
import { ethers } from "ethers";
import artifact from "./../artifacts/contracts/AAT.sol/AAT.json" assert { type: "json" };

async function main() {
  const url = process.env.MAINNET_RPC_URL!;
  const pk  = process.env.PRIVATE_KEY!;
  const provider = new ethers.JsonRpcProvider(url);
  const wallet   = new ethers.Wallet(pk, provider);

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const unsigned = await factory.getDeployTransaction();

  const gas = await provider.estimateGas({ ...unsigned, from: wallet.address });
  const fee = await provider.getFeeData();
  const max = (fee.maxFeePerGas ?? fee.gasPrice)!; // bigint

  const totalWei = gas * max;
  console.log("Deployer:", wallet.address);
  console.log("Estimated gas:", gas.toString());
  console.log("Max fee per gas (wei):", max.toString());
  console.log("Est. max total (ETH):", Number(totalWei) / 1e18);
}
main().catch((e) => (console.error(e), process.exit(1)));
