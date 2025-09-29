const hre = require("hardhat");

async function main() {
  const address = process.argv[2];
  const name = "Pancake Token";
  const symbol = "PNC";
  const initialSupply = 1000000;
  const owner = "REPLACE_OWNER";
  const treasury = "REPLACE_TREASURY";

  await hre.run("verify:verify", {
    address,
    constructorArguments: [name, symbol, initialSupply, owner, treasury],
  });
}

main().catch((e)=>{ console.error(e); process.exit(1); });
