import TonstackersManageUI from "./TonstackersManageUI";
import TonstackersInfoUI from "./TonstackersInfoUI";
import {useWallet, Wallet} from "../../WalletProvider";
import {memo, useEffect} from "react";
import {useTonWallet} from "@tonconnect/ui-react";
import { Tonstakers } from "tonstakers-sdk"
import {IWalletConnector} from './tonstakersService'
export const TonstakersConnector = memo(() => {
  const tonWallet = useTonWallet()
  const { setWallet, wallet } = useWallet()

  useEffect(() => {
    if(tonWallet?.account.address && wallet){
      const tonstackers = new Tonstakers(
        {
          connector: (wallet.tonConnectHandlers as unknown as IWalletConnector),
          partnerCode: 123456,
          tonApiKey: 'b1a84bc1c20fd3a243ae56b29fb86c15aa5ea25d86497ea8c1a23261ea13f52f'
        }
      )
      setWallet({
        tonConnectHandlers: wallet.tonConnectHandlers,
        tonSHandlers: tonstackers
      })
    } else {
      setWallet(null)
    }
  }, [tonWallet?.account.address])

  if(!wallet) {
    return "Please connect wallet"
  }

  return (
    <>
      <TonstackersManageUI/>
      <TonstackersInfoUI/>
    </>
  );
});
