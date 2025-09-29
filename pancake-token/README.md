# 🥞 Pancake Token (PNC)

A simple **BEP20 token** built with Solidity and deployed on Binance Smart Chain.  
Includes a minimal **React + Web3.js frontend** for balance display and transfers.

---

## ✨ Features
- BEP20-compatible token (using OpenZeppelin ERC20)
- Configurable initial supply
- Frontend with Metamask connection
- Token balance display
- Transfer form (send tokens to another wallet)

---

## 🛠 Tech Stack
- Solidity ^0.8.0
- OpenZeppelin Contracts
- Web3.js
- React

---

## 🚀 Getting Started

### Compile & Deploy (Hardhat/Truffle)
```bash
npm install @openzeppelin/contracts
# Deploy using your favorite framework (Hardhat/Truffle)
```

### Run Frontend
```bash
cd frontend
npm install
npm start
```

---

## 📌 Notes
- Replace `0xYourDeployedAddressHere` in `frontend/src/App.js` with the deployed contract address.
- ABI file included at `frontend/src/PancakeTokenABI.json`.

---

👨‍💻 Developed by Lutfullah Dogan
