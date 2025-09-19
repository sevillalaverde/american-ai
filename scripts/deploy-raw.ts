import "dotenv/config";
import { ethers } from "ethers";
import artifact from "./../artifacts/contracts/AAT.sol/AAT.json" assert { type: "json" };

async function main() {
  const url = process.env.MAINNET_RPC_URL!;
  const pk  = process.env.PRIVATE_KEY!;
  const provider = new ethers.JsonRpcProvider(url);
  const wallet   = new ethers.Wallet(pk, provider);

  console.log("Deployer:", wallet.address);
  const bal = await provider.getBalance(wallet.address);
  console.log("ETH balance:", ethers.formatEther(bal));

  if (bal === 0n) {
    throw new Error("No ETH for gas. Fund this wallet first.");
  }

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();               // no constructor args
  console.log("Tx sent:", contract.deploymentTransaction()?.hash);

  const addr = await contract.getAddress();
  console.log("AAT deployed at:", addr);
}
main().catch((e) => (console.error(e), process.exit(1)));
