import { expect } from "chai";
import { network } from "hardhat";

describe("AAT Token", function () {
  let ethers: any;
  let token: any;
  let owner: any;

  before(async function () {
    ({ ethers } = await network.connect());
  });

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const AAT = await ethers.getContractFactory("AAT");
    token = await AAT.deploy();
    await token.waitForDeployment();
  });

  it("has correct name & symbol", async function () {
    expect(await token.name()).to.equal("American AI");
    expect(await token.symbol()).to.equal("AAT");
  });

  it("mints total supply of 1B", async function () {
    const total = await token.totalSupply();
    expect(total).to.equal(ethers.parseUnits("1000000000", 18));
  });

  it("assigns the supply to the deployer (owner)", async function () {
    const bal = await token.balanceOf(await owner.getAddress());
    expect(bal).to.equal(ethers.parseUnits("1000000000", 18));
  });
});
