async function main() {
  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  console.log("Upgrading to MyContractV2...");
  const upgradedInstance = await upgrades.upgradeProxy(
    process.env.HOLESKY_CONTRACT_ADDRESS,
    MyContractV2
  );
  console.log("MyContract upgraded at:", upgradedInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
