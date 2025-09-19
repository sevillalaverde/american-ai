import "dotenv/config";
import { ethers } from "ethers";

async function main() {
  const url = process.env.MAINNET_RPC_URL!;
  const pk  = process.env.PRIVATE_KEY!;
  const provider = new ethers.JsonRpcProvider(url);
  const wallet   = new ethers.Wallet(pk, provider);

  const bal = await provider.getBalance(wallet.address);
  console.log("Deployer:", wallet.address);
  console.log("ETH balance:", ethers.formatEther(bal));
}
main().catch((e) => (console.error(e), process.exit(1)));
