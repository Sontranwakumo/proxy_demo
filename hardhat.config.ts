import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks:{

    localhost: {
      url: 'http://localhost:8545/'
    },
  }
};

export default config;
