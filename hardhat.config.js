require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },

    holesky: {
      url: process.env.HOLESKY_URL,
      accounts: [process.env.PRIVATE_KEY_HOLESKY],
    },
    hardhat: {
      // Need this for testing because TestHelperOz5.sol is exceeding the compiled contract size limit
      allowUnlimitedContractSize: true,
    },
    // Add your network configuration if deploying to testnet/mainnet
    // rinkeby: {
    //     url: "https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    //     accounts: [process.env.PRIVATE_KEY]
    // }
  },
};
