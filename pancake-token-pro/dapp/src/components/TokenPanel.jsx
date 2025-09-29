import React, { useEffect, useMemo, useState } from 'react'
import { getProvider, getContract, fmt, toUnits } from '../lib/ethers.js'

export default function TokenPanel(){
  const [info, setInfo] = useState({ name:'', symbol:'', decimals:18, totalSupply:'0', paused:false })
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('0')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [spender, setSpender] = useState('')
  const [allowance, setAllowance] = useState('0')
  const [mintAmount, setMintAmount] = useState('0')
  const [isOwner, setIsOwner] = useState(false)

  const contract = useMemo(()=> getContract(), [])

  async function load(){
    const { signer, address } = await getProvider()
    if(!signer) return
    setAccount(address)
    const [name, symbol, decimals, totalSupply, paused] = await Promise.all([
      contract.name(), contract.symbol(), contract.decimals(), contract.totalSupply(), contract.paused()
    ])
    setInfo({ name, symbol, decimals, totalSupply: fmt(totalSupply, decimals), paused })
    const bal = await contract.balanceOf(address)
    setBalance(fmt(bal, decimals))
    try {
      const owner = await contract.owner()
      setIsOwner(owner.toLowerCase() === address.toLowerCase())
    } catch {}
  }

  async function doTransfer(){
    const tx = await contract.transfer(to, toUnits(amount, info.decimals))
    await tx.wait()
    load()
  }

  async function doApprove(){
    const tx = await contract.approve(spender, toUnits(amount, info.decimals))
    await tx.wait()
    load()
  }

  async function checkAllowance(){
    const a = await contract.allowance(account, spender)
    setAllowance(fmt(a, info.decimals))
  }

  async function doMint(){
    const tx = await contract.mint(account, toUnits(mintAmount, info.decimals))
    await tx.wait()
    load()
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="card" style={{marginTop:16}}>
      <div className="h2">Token</div>
      <div className="row">
        <div>
          <div className="kv"><span className="label">Name</span><span>{info.name}</span></div>
          <div className="kv"><span className="label">Symbol</span><span>{info.symbol}</span></div>
          <div className="kv"><span className="label">Decimals</span><span>{info.decimals}</span></div>
          <div className="kv"><span className="label">Total Supply</span><span>{info.totalSupply}</span></div>
          <div className="kv"><span className="label">Paused</span><span>{String(info.paused)}</span></div>
        </div>
        <div>
          <div className="kv"><span className="label">Your Account</span><span>{account||'—'}</span></div>
          <div className="kv"><span className="label">Your Balance</span><span>{balance} {info.symbol}</span></div>
        </div>
      </div>

      <hr/>

      <div className="row">
        <div className="card">
          <div className="h2">Transfer</div>
          <input className="input" placeholder="Recipient" value={to} onChange={e=>setTo(e.target.value)} />
          <input className="input" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
          <button className="btn" onClick={doTransfer} style={{marginTop:8}}>Send</button>
        </div>

        <div className="card">
          <div className="h2">Approve / Allowance</div>
          <input className="input" placeholder="Spender" value={spender} onChange={e=>setSpender(e.target.value)} />
          <div className="row" style={{gridTemplateColumns:'1fr auto', alignItems:'center'}}>
            <input className="input" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
            <button className="btn" onClick={doApprove} style={{marginLeft:8}}>Approve</button>
          </div>
          <button className="btn" onClick={checkAllowance} style={{marginTop:8}}>Check Allowance</button>
          <div className="label" style={{marginTop:6}}>Allowance: {allowance}</div>
        </div>
      </div>

      {isOwner && (
        <>
          <hr/>
          <div className="card">
            <div className="h2">Owner Tools</div>
            <div className="row" style={{gridTemplateColumns:'1fr auto', alignItems:'center'}}>
              <input className="input" placeholder="Mint amount to self" value={mintAmount} onChange={e=>setMintAmount(e.target.value)} />
              <button className="btn" onClick={doMint} style={{marginLeft:8}}>Mint</button>
            </div>
            <p className="label" style={{marginTop:6}}>Only the owner can see this.</p>
          </div>
        </>
      )}
    </div>
  )
}
