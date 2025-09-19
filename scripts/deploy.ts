import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const AAT = await ethers.getContractFactory("AAT");
  const token = await AAT.deploy();

  const txHash = token.deploymentTransaction()?.hash;
  if (txHash) console.log("Deploy tx:", txHash);

  await token.waitForDeployment();
  const addr = await token.getAddress();
  console.log("AAT deployed at:", addr);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
