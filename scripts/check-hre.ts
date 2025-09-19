import "@nomicfoundation/hardhat-ethers"; // ensure plugin is registered even if config import was skipped
import hre from "hardhat";
console.log("hre.ethers loaded?", !!hre.ethers);
