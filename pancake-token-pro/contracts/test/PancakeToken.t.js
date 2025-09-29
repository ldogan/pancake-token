const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PancakeToken", function () {
  async function deploy() {
    const [owner, user, treasury] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("PancakeToken");
    const token = await Token.deploy("Pancake Token", "PNC", 1000, owner.address, treasury.address);
    await token.waitForDeployment();
    return { token, owner, user, treasury };
  }

  it("mints initial supply to owner", async () => {
    const { token, owner } = await deploy();
    const bal = await token.balanceOf(owner.address);
    expect(bal).to.equal(ethers.parseUnits("1000", 18));
  });

  it("transfers", async () => {
    const { token, owner, user } = await deploy();
    await token.transfer(user.address, ethers.parseUnits("10", 18));
    const bal = await token.balanceOf(user.address);
    expect(bal).to.equal(ethers.parseUnits("10", 18));
  });

  it("owner can pause", async () => {
    const { token, owner, user } = await deploy();
    await token.pause();
    await expect(token.transfer(user.address, 1)).to.be.revertedWith("token paused");
  });

  it("fee works", async () => {
    const { token, owner, user, treasury } = await deploy();
    await token.setFee(true, 100); // 1%
    await token.transfer(user.address, ethers.parseUnits("100", 18));
    const userBal = await token.balanceOf(user.address);
    // user receives 99
    expect(userBal).to.equal(ethers.parseUnits("99", 18));
    const trBal = await token.balanceOf(treasury.address);
    expect(trBal).to.equal(ethers.parseUnits("1", 18));
  });

  it("owner-only mint", async () => {
    const { token, owner, user } = await deploy();
    await expect(token.connect(user).mint(user.address, 1)).to.be.reverted;
    await token.mint(user.address, 100);
    const bal = await token.balanceOf(user.address);
    expect(bal).to.equal(100n);
  });
});
