import { Tonstakers } from 'tonstakers-sdk'
import { TonConnect } from '@tonconnect/sdk'

export interface Wallet {
  tonSHandlers?: Tonstakers
  tonConnectHandlers: TonConnect
}

export interface Balance {
  tonBalance: number
  tonAvailable: number
  tsTonStacked: number
}

export interface TonstakersInfo {
  apy: number
  tvl: number
  stakers: number
}

export interface StakeContextType {
  wallet: Wallet | null
  balance: Balance | null
  info: TonstakersInfo
  setWallet: (wallet: Wallet | null) => void
  loader: boolean
}

export interface Balance {
  tonBalance: number
  tonAvailable: number
  tsTonStacked: number
}
