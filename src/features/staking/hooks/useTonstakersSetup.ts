import {TonConnect} from "@tonconnect/sdk";
import {Tonstakers} from "tonstakers-sdk";
import React, {useEffect} from "react";
import {useTonWallet} from "@tonconnect/ui-react";
import {getWalletBalance} from "@utils/get-balance";
import {Balance, Wallet, TonstakersInfo} from "@features/staking/interfaces";

export const useTonstakersSetup = (
  connector: TonConnect,
  tonstakers: Tonstakers,
  setWallet: React.Dispatch<React.SetStateAction<Wallet | null>>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>,
  setBalance: React.Dispatch<React.SetStateAction<Balance>>,
  setInfo: React.Dispatch<React.SetStateAction<TonstakersInfo>>,
  wallet: Wallet | null
) => {
  const tonWallet = useTonWallet()

  useEffect(() => {
    if (tonWallet?.account.address) {
      setLoader(true)
      tonstakers.addEventListener("initialized", async () => {
        const tonBalance = await getWalletBalance(connector) as number
        const tonAvailable = await tonstakers.getAvailableBalance()
        const tsTonStacked = await tonstakers.getStakedBalance()

        const apy = await tonstakers.getCurrentApy()
        const tvl = await tonstakers.getTvl()
        const stakers = await tonstakers.getStakersCount()

        setWallet({
          tonConnectHandlers: connector, tonSHandlers: tonstakers
        })
        setLoader(false)
        setBalance({ tonBalance, tonAvailable, tsTonStacked })
        setInfo({ apy, tvl, stakers })
      })

      tonstakers.addEventListener("deinitialized", async () => {
        setWallet(null)
        setLoader(false)
      })
    }
  }, [tonWallet?.account.address])

  useEffect(() => {
    if (wallet) {
      connector.onStatusChange(async () => {
        const walletBalance = await getWalletBalance(connector) as number
        setBalance(prev => ({ ...prev, tonBalance: walletBalance }))
      })
    }
  }, [wallet])
}