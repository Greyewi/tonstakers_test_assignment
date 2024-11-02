import {Tonstakers} from "tonstakers-sdk";
import {TonConnect} from "@tonconnect/sdk";

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

import {ChangeEvent, Dispatch, ReactNode, SetStateAction} from "react";

export interface StakeHandlers {
  stake: (amount: number) => Promise<any>
  unstake: (amount: number) => Promise<any>
  stakeMax: () => Promise<any>
}

export interface Balance {
  tonBalance: number
  tonAvailable: number
  tsTonStacked: number
}

export interface UseStakeHandlersResult {
  balance: Balance | null
  stakeValue: string
  setStakeValue: Dispatch<SetStateAction<string>>
  unstakeValue: string
  setUnstakeValue: Dispatch<SetStateAction<string>>
  handleStake: () => Promise<void>
  handleUnstake: () => Promise<void>
  handleStakeMax: () => Promise<void>
  handleUnstakeBestRate: () => Promise<void>
  handleUnstakeInstant: () => Promise<void>
  tonSHandlers: StakeHandlers | null
}

export interface BalanceProps {
  balance: {
    tonBalance: number;
    tonAvailable: number;
    tsTonStacked: number;
  } | null;
}