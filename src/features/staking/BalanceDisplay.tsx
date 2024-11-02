import { useStake } from '@features/staking/StakingProvider'
import globalStyles from '@src/App.module.css'

const BalanceDisplay = () => {
  const { balance } = useStake()

  const tonBalance = balance?.tonBalance
    ? balance.tonBalance.toFixed(3)
    : '0.000'

  const tonAvailable = balance?.tonAvailable
    ? (
        Number(balance.tonAvailable) /
        Number(import.meta.env.VITE_LAMPORTS || 1)
      ).toFixed(3)
    : '0.000'

  const tsTonStacked = balance?.tsTonStacked
    ? (
        Number(balance.tsTonStacked) /
        Number(import.meta.env.VITE_LAMPORTS || 1)
      ).toFixed(3)
    : '0.000'

  return (
    <div className={globalStyles.component_wrapper}>
      <h1>Your Balance</h1>
      <div>
        <span>Balance:</span> {tonBalance} TON
      </div>
      <div>
        <span>Available to stake:</span> {tonAvailable} TON
      </div>
      <div>
        <span>Already staked:</span> {tsTonStacked} tsTON
      </div>
    </div>
  )
}

export default BalanceDisplay
