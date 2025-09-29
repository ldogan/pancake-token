import React from 'react'
import Connect from './components/Connect.jsx'
import TokenPanel from './components/TokenPanel.jsx'

export default function App(){
  return (
    <div className="container">
      <div className="card">
        <div className="h1">🥞 Pancake Token Pro</div>
        <p style={{color:'#9ca3af'}}>Advanced BEP20 with Permit, Burn, Pause — plus a modern DApp.</p>
        <Connect />
        <TokenPanel />
      </div>
      <p style={{marginTop:12, color:'#94a3b8'}}>Demo only. Review before mainnet.</p>
    </div>
  )
}
