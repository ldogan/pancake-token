# 🥞 Pancake Token Pro (BEP20) — Contracts + DApp (Advanced JS)

Production-style **BEP20 token** with modern Hardhat setup and an advanced **React + Vite + Ethers v6** DApp:
- ✅ Permit (gasless approvals via **ERC20Permit**)
- 🔥 Burn (ERC20Burnable), **Pause** (Pausable), **Ownable** (admin)
- 🧪 Unit tests (Mocha/Chai) + coverage ready
- 🚀 Deploy & Verify scripts
- 🖥️ DApp: wallet connect, network guard (BSC Testnet), balance, transfer, approve/allowance, permit flow, pause indicator, owner-only mint

> This repo is meant as an interview‑ready, realistic template you can extend.

## Monorepo Layout
```
pancake-token-pro/
├─ contracts/             # Hardhat project
│  ├─ contracts/PancakeToken.sol
│  ├─ scripts/deploy.js
│  ├─ scripts/verify.js
│  ├─ test/PancakeToken.t.js
│  ├─ hardhat.config.js
│  ├─ package.json
│  ├─ .env.example
│  └─ README.md
└─ dapp/                  # React + Vite + Ethers v6 + Wagmi (minimal)
   ├─ src/
   │  ├─ lib/ethers.js
   │  ├─ lib/networks.js
   │  ├─ hooks/useToken.js
   │  ├─ components/Connect.jsx
   │  ├─ components/TokenPanel.jsx
   │  ├─ App.jsx
   │  ├─ main.jsx
   │  └─ styles.css
   ├─ index.html
   ├─ package.json
   ├─ vite.config.js
   └─ README.md
```

## Quick Start (Contracts)
```bash
cd contracts
cp .env.example .env
# set PRIVATE_KEY, BSCSCAN_API_KEY, RPC_URL_BSCT
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network bsct
# then: npx hardhat verify --network bsct <DEPLOYED_ADDRESS> "Pancake Token" "PNC" <INITIAL_SUPPLY>
```

## Quick Start (DApp)
```bash
cd dapp
npm install
# set env vars in .env (see README)
npm run dev
```

## Disclaimer
Example only. Review before mainnet use.
