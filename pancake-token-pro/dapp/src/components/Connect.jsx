import React, { useEffect, useState } from 'react'
import { getProvider, ensureNetwork } from '../lib/ethers.js'

export default function Connect(){
  const [account, setAccount] = useState(null)
  const [chainId, setChainId] = useState(null)

  async function connect(){
    const { provider } = getProvider()
    const accounts = await provider.send('eth_requestAccounts', [])
    setAccount(accounts[0])
    const id = await provider.send('eth_chainId', [])
    setChainId(parseInt(id, 16))
    await ensureNetwork()
  }

  useEffect(()=>{
    const { provider } = getProvider()
    if(!provider) return
    provider.on('accountsChanged', (acc)=> setAccount(acc[0]||null))
    provider.on('chainChanged', ()=> window.location.reload())
  }, [])

  return (
    <div className="row" style={{marginTop:12}}>
      <div className="card">
        <div className="h2">Wallet</div>
        <div className="kv"><span className="label">Account</span><span>{account||'—'}</span></div>
        <div className="kv"><span className="label">Chain</span><span>{chainId||'—'}</span></div>
        <button className="btn" onClick={connect} style={{marginTop:12}}>Connect MetaMask</button>
      </div>
      <div className="card">
        <div className="h2">Network Guard</div>
        <p className="label">Target: BSC Testnet (97)</p>
        <p className="label">App enforces chain on connect.</p>
        <a href="https://testnet.bscscan.com/" target="_blank" rel="noreferrer">BscScan Testnet</a>
      </div>
    </div>
  )
}
