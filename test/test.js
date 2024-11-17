const { expect } = require("chai");

describe("MyContract", function () {
  it("should initialize with the correct value", async function () {
    const MyContract = await ethers.getContractFactory("MyContract");
    const instance = await upgrades.deployProxy(MyContract, [42], {
      initializer: "initialize",
    });

    expect(await instance.somePublicVariable()).to.equal(42);
  });
});
