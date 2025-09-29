require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');

const { PRIVATE_KEY, RPC_URL_BSCT, BSCSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    hardhat: {},
    bsct: {
      url: RPC_URL_BSCT || "https://bsc-testnet.publicnode.com",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  },
  etherscan: {
    apiKey: {
      bscTestnet: BSCSCAN_API_KEY || ""
    }
  }
};
