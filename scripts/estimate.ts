import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const AAT = await hre.ethers.getContractFactory("AAT");
  const unsigned = await AAT.getDeployTransaction();
  unsigned.from = deployer.address;

  const gas = await hre.ethers.provider.estimateGas(unsigned);
  const fee = await hre.ethers.provider.getFeeData();
  const max = (fee.maxFeePerGas ?? fee.gasPrice)!; // bigint

  const totalWei = gas * max;
  const toEth = (w: bigint) => Number(w) / 1e18;

  console.log("Deployer:", deployer.address);
  console.log("Estimated gas:", gas.toString());
  console.log("Max fee per gas (wei):", max.toString());
  console.log("Est. max total (ETH):", toEth(totalWei).toFixed(6));
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
