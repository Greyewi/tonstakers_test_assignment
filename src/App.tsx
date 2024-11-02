import {TonConnectButton} from "@tonconnect/ui-react"
import {useStake} from "@features/staking/StakingProvider"
import TonstackersActions from "@features/staking/TonstackersActions"
import TonstackersInfo from "@features/staking/TonstackersInfo"
import InfoMessage from "@shared/components/InfoMessage"
import Logo from "@shared/components/Logo"
import styles from './App.module.css'
import CurrencyRate from "@features/rate/CurrencyRate"
import BalanceDisplay from "@features/staking/BalanceDisplay"

const TonstackersWrapper = () => {
  const {wallet, loader} = useStake()

  if (loader) return <InfoMessage>Please wait for Tonstakers</InfoMessage>
  if (!wallet) return <InfoMessage>Please connect Ton wallet</InfoMessage>

  return (
    <>
      <BalanceDisplay />
      <TonstackersActions/>
      <TonstackersInfo/>
    </>
  )
}

const App = () => {
  return (
    <div className={styles.app}>
      <header className={styles.app_header}>
        <Logo/>
        <TonConnectButton className={styles.app_wallet_connection}/>
      </header>
      <main>
        <TonstackersWrapper/>
        <CurrencyRate/>
      </main>
    </div>
  )
}

export default App
