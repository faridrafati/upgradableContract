const { ethers } = require("ethers");
const fs = require("fs").promises;

async function loadContract(
  abiFilePath,
  contractAddress,
  providerUrl,
  privateKey
) {
  const abi = JSON.parse(await fs.readFile(abiFilePath, "utf8")); // Read and parse the ABI file
  const provider = new ethers.JsonRpcProvider(providerUrl); // Set up the provider
  const wallet = new ethers.Wallet(privateKey, provider); // Create a wallet instance
  return new ethers.Contract(contractAddress, abi, wallet); // Return a contract instance
}

async function main() {
  try {
    // Load the original contract
    const deployedUpgradableToken = await loadContract(
      "dpTABI.json",
      process.env.HOLESKY_CONTRACT_ADDRESS,
      process.env.HOLESKY_URL,
      process.env.PRIVATE_KEY_HOLESKY
    );
    console.log("Old Deployed Address: ", deployedUpgradableToken.target);

    // Log the current value from the original contract
    console.log(
      "Original Contract myValue: ",
      await deployedUpgradableToken.myValue()
    );

    // Load the upgraded contract
    const upgradedToken = await loadContract(
      "upTABI.json",
      process.env.HOLESKY_UPDATEDC_ADDRESS,
      process.env.HOLESKY_URL,
      process.env.PRIVATE_KEY_HOLESKY
    );
    console.log("Upgraded Deployed Address: ", upgradedToken.target);
    // Log the current value from the upgraded contract

    console.log(
      "Upgraded Original Contract myValue (is maintained from Old Contract): ",
      await upgradedToken.myValue()
    );

    // Set a new value in the upgraded contract and wait for confirmation
    const tx = await upgradedToken.setNewValue("Hello");
    await tx.wait();

    // Log the updated value after the transaction
    console.log(
      "Updated String newValue in Upgraded Contract:",
      await upgradedToken.newValue()
    );
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error during contract interaction:", error);
  }
}

// Execute the main function and handle exit codes
main()
  .then(() => process.exit(0)) // Exit the process successfully
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1); // Exit with an error code
  });
