import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  // 👇 Hardhat v3 safe: read from env, not argv
  const txHash = process.env.TX_HASH;

  if (!txHash) {
    console.error(
      "Set TX_HASH in your shell, e.g.:\n" +
      '$env:TX_HASH="0xYOUR_TX_HASH"\n' +
      "Then run:\n" +
      "npx hardhat run --network mainnet scripts/resolveFromTx.ts"
    );
    process.exit(1);
  }

  console.log("Fetching receipt for:", txHash);
  const receipt = await ethers.provider.getTransactionReceipt(txHash);

  if (!receipt) {
    console.log("No receipt yet. The tx may still be pending, or the hash isn’t on mainnet.");
    console.log("Tip: paste the hash into Etherscan to check it.");
    process.exit(1);
  }

  console.log("Status:", receipt.status === 1 ? "SUCCESS" : "FAIL");
  console.log("Contract address:", receipt.contractAddress || "(none)");
}

main().catch((e) => { console.error(e); process.exit(1); });
