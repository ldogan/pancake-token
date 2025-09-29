import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import tokenABI from './PancakeTokenABI.json';

const CONTRACT_ADDRESS = "0xYourDeployedAddressHere";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const token = new web3.eth.Contract(tokenABI, CONTRACT_ADDRESS);
      const bal = await token.methods.balanceOf(accounts[0]).call();
      setBalance(web3.utils.fromWei(bal, 'ether'));
    }
  }

  async function transferToken(e) {
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    const token = new web3.eth.Contract(tokenABI, CONTRACT_ADDRESS);
    await token.methods.transfer(recipient, web3.utils.toWei(amount, 'ether')).send({ from: account });
    alert("Transfer complete");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pancake Token DApp</h1>
      <p><b>Account:</b> {account}</p>
      <p><b>Balance:</b> {balance} PNC</p>
      <form onSubmit={transferToken}>
        <input type="text" placeholder="Recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
