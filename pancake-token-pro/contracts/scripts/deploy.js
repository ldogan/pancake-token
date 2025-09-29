const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const name = "Pancake Token";
  const symbol = "PNC";
  const initialSupply = 1_000_000; // 1M (before decimals)
  const owner = deployer.address;
  const treasury = process.env.TREASURY_ADDRESS || deployer.address;

  const Token = await hre.ethers.getContractFactory("PancakeToken");
  const token = await Token.deploy(name, symbol, initialSupply, owner, treasury);
  await token.waitForDeployment();

  console.log("Deployer:", deployer.address);
  console.log("Token:", await token.getAddress());

  // example fee config
  const tx = await token.setFee(false, 0);
  await tx.wait();
  console.log("Fee disabled");
}

main().catch((e)=>{ console.error(e); process.exit(1); });
