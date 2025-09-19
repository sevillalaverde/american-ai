import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const bal = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer:", deployer.address);
  console.log("ETH balance:", hre.ethers.formatEther(bal));
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
