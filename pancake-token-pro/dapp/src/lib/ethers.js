import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'
import abi from './pancake-abi.json'
import { CHAIN_ID, RPC_URL } from './networks'

export function getProvider(){
  const eth = window.ethereum
  if(!eth) return { provider: null, signer: null }
  const provider = new BrowserProvider(eth)
  return { provider }
}

export async function ensureNetwork(){
  const eth = window.ethereum
  if(!eth) return
  const current = await eth.request({ method:'eth_chainId' })
  const desiredHex = '0x' + CHAIN_ID.toString(16)
  if(current !== desiredHex){
    try{
      await eth.request({ method:'wallet_switchEthereumChain', params:[{ chainId: desiredHex }] })
    }catch(e){
      // add chain if missing
      await eth.request({ method:'wallet_addEthereumChain', params:[{
        chainId: desiredHex,
        chainName: 'BSC Testnet',
        nativeCurrency: { name:'tBNB', symbol:'tBNB', decimals:18 },
        rpcUrls: [RPC_URL],
        blockExplorerUrls: ['https://testnet.bscscan.com']
      }]})
    }
  }
}

export async function getSignerAddress(){
  const { provider } = getProvider()
  if(!provider) return { signer:null, address:null }
  const signer = await provider.getSigner()
  const address = await signer.getAddress()
  return { signer, address }
}

export function getContract(){
  const addr = import.meta.env.VITE_CONTRACT_ADDRESS || '0xYourTokenAddress'
  const { provider } = getProvider()
  if(!provider) throw new Error('No provider')
  return new Contract(addr, abi, provider.getSigner())
}

export const fmt = (n, d=18)=> formatUnits(n, d)
export const toUnits = (n, d=18)=> parseUnits(n || '0', d)
