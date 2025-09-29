# DApp — Pancake Token Pro

React + Vite + **Ethers v6** minimal DApp:
- Connect wallet (MetaMask)
- Enforce network: BSC Testnet (optional)
- Show token info: name, symbol, decimals, totalSupply
- Balance of current account
- Transfer / Approve / Allowance
- Permit (sign typed data; advanced — stub provided)
- Pause status indicator
- Owner-only mint button

## Env
Create `.env`:
```
VITE_CONTRACT_ADDRESS=0xYourTokenAddress
VITE_CHAIN_ID=97
VITE_RPC_URL=https://bsc-testnet.publicnode.com
```

## Run
```bash
npm install
npm run dev
```
