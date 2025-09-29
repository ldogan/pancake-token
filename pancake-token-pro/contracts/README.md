# Contracts — Pancake Token Pro

## Features
- **ERC20** base with **name/symbol** constructor inputs
- **ERC20Permit** (EIP-2612) — gasless approvals
- **ERC20Burnable** — users can burn their tokens
- **Pausable** — owner can pause all transfers
- **Ownable** — owner‑only `mint` function (for demo)
- Optional **transfer fee** toggle to a **treasury** address (demo)

## Env
Copy `.env.example` to `.env` and fill:
```
PRIVATE_KEY=0xabc...               # deployer
RPC_URL_BSCT=https://bsc-testnet... # BSC Testnet endpoint
BSCSCAN_API_KEY=xxxxxxxxxxxxxxxx    # for verification
TREASURY_ADDRESS=0x0000000000000000000000000000000000000000
```

## Common
```bash
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network bsct
npx hardhat verify --network bsct <ADDRESS> "Pancake Token" "PNC" 1000000
```
