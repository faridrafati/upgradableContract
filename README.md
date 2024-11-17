
# Upgradable Contract - Upgradeable Smart Contracts with Hardhat

## Overview
This project, hosted at [GitHub - upgradableContract](https://github.com/faridrafati/upgradableContract/tree/main), demonstrates the deployment and interaction of upgradeable smart contracts using Hardhat and `ethers.js`. It includes JavaScript scripts for deploying and interacting with both the original and upgraded versions of a contract. The project leverages OpenZeppelin's upgradeable libraries to ensure the contracts can be improved over time while retaining their state and addresses.

## Project Structure
```
upgradableContract/
├── contracts/
│   ├── MyContract.sol
│   └── MyContractV2.sol
├── scripts/
│   ├── deployProxy.js
│   ├── upgradeProxy.js
│   └── interactWithContracts.js
├── test/
│   └── myContractTest.js
├── dpTABI.json
├── upTABI.json
├── hardhat.config.js
└── README.md
```

## Requirements
- **Node.js**: Ensure you have Node.js installed.
- **Hardhat**: A development environment for Ethereum smart contracts.
- **Ethers.js**: A library for interacting with the Ethereum blockchain.
- **OpenZeppelin Upgrades Plugin**: For deploying upgradeable contracts.

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/faridrafati/upgradableContract.git
   cd upgradableContract
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add:
   ```ini
   HOLESKY_URL="YOUR_RPC_URL"
   PRIVATE_KEY_HOLESKY="YOUR_PRIVATE_KEY"
   HOLESKY_CONTRACT_ADDRESS="ADDRESS_OF_DEPLOYED_ORIGINAL_CONTRACT"
   HOLESKY_UPDATEDC_ADDRESS="ADDRESS_OF_DEPLOYED_UPGRADED_CONTRACT"
   ```

## Hardhat Configuration
Ensure `hardhat.config.js` is set up to use your environment and network:
```javascript
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  solidity: "0.8.4",
  networks: {
    holesky: {
      url: process.env.HOLESKY_URL,
      accounts: [process.env.PRIVATE_KEY_HOLESKY],
    },
  },
};
```

## Deployment Scripts

### `deployProxy.js`
Deploys the initial version of the contract:
```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("MyContract");
  console.log("Deploying MyContract...");
  const instance = await upgrades.deployProxy(Contract, [42], {
    initializer: "initialize",
  });
  console.log("MyContract deployed to:", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying the contract:", error);
    process.exit(1);
  });
```

### `upgradeProxy.js`
Deploys the upgraded version:
```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const ContractV2 = await ethers.getContractFactory("MyContractV2");
  console.log("Upgrading to MyContractV2...");
  const instance = await upgrades.upgradeProxy(process.env.HOLESKY_CONTRACT_ADDRESS, ContractV2);
  console.log("Contract upgraded to MyContractV2 at:", instance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error upgrading the contract:", error);
    process.exit(1);
  });
```

### `interactWithContracts.js`
Interacts with the deployed contracts:
```javascript
const { ethers } = require("ethers");
const fs = require("fs").promises;

async function loadContract(abiFilePath, contractAddress, providerUrl, privateKey) {
  const abi = JSON.parse(await fs.readFile(abiFilePath, "utf8"));
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  return new ethers.Contract(contractAddress, abi, wallet);
}

async function main() {
  try {
    const deployedToken = await loadContract("dpTABI.json", process.env.HOLESKY_CONTRACT_ADDRESS, process.env.HOLESKY_URL, process.env.PRIVATE_KEY_HOLESKY);
    console.log("Deployed Contract Address:", deployedToken.target);

    let value = await deployedToken.myValue();
    console.log("Original myValue:", ethers.BigNumber.isBigNumber(value) ? ethers.utils.formatUnits(value, 0) : value.toString());

    const upgradedToken = await loadContract("upTABI.json", process.env.HOLESKY_UPDATEDC_ADDRESS, process.env.HOLESKY_URL, process.env.PRIVATE_KEY_HOLESKY);
    console.log("Upgraded Contract Address:", upgradedToken.target);

    value = await upgradedToken.myValue();
    console.log("Upgraded myValue:", ethers.BigNumber.isBigNumber(value) ? ethers.utils.formatUnits(value, 0) : value.toString());

    const tx = await upgradedToken.setNewValue("Hello");
    await tx.wait();
    console.log("Updated newValue:", await upgradedToken.newValue());
  } catch (error) {
    console.error("Error during contract interaction:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
```

## Usage
1. **Deploy the original contract**:
   ```bash
   npx hardhat run scripts/deployProxy.js --network holesky
   ```

2. **Upgrade the contract**:
   ```bash
   npx hardhat run scripts/upgradeProxy.js --network holesky
   ```

3. **Interact with the contracts**:
   ```bash
   node scripts/interactWithContracts.js
   ```

## License
This project is licensed under the MIT License.
