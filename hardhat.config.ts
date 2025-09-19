// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";   // <-- REQUIRED so hre.ethers exists
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const PRIVATE_KEY = (process.env.PRIVATE_KEY ?? "").trim();
const MAINNET_RPC_URL = (process.env.MAINNET_RPC_URL ?? "").trim();
const ETHERSCAN_API_KEY = (process.env.ETHERSCAN_API_KEY ?? "").trim();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    mainnet: {
      type: "http",
      url: MAINNET_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
