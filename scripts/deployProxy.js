const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyContract = await ethers.getContractFactory("MyContract");
  console.log("Deploying MyContract...");
  const instance = await upgrades.deployProxy(MyContract, [42], {
    initializer: "initialize",
  });
  console.log("MyContract deployed to: ", instance.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
