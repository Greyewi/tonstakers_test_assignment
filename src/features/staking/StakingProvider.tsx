import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Tonstakers } from 'tonstakers-sdk'
import { TonConnect } from '@tonconnect/sdk'
import { useTonstakersSetup } from './hooks/useTonstakersSetup'
import {
  StakeContextType,
  TonstakersInfo,
  Balance,
  Wallet
} from '@features/staking/interfaces'

export const initBalance: Balance = {
  tonBalance: 0,
  tonAvailable: 0,
  tsTonStacked: 0
}

export const initInfo: TonstakersInfo = {
  apy: 0,
  tvl: 0,
  stakers: 0
}

const WalletContext = createContext<StakeContextType | undefined>(undefined)

export const useStake = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useStake must be used within a StakingProvider')
  }
  return context
}

export const StakingProvider: React.FC<{
  children: ReactNode
  connector: TonConnect
  tonstakers: Tonstakers
}> = ({ children, connector, tonstakers }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loader, setLoader] = useState<boolean>(false)
  const [balance, setBalance] = useState<Balance>(initBalance)
  const [info, setInfo] = useState<TonstakersInfo>(initInfo)

  useTonstakersSetup(
    connector,
    tonstakers,
    setWallet,
    setLoader,
    setBalance,
    setInfo,
    wallet
  )

  return (
    <WalletContext.Provider
      value={{ wallet, loader, balance, info, setWallet }}
    >
      {children}
    </WalletContext.Provider>
  )
}
