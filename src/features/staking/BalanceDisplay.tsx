import {useStake} from "@features/staking/StakingProvider"
import globalStyles from "@src/App.module.css";

const BalanceDisplay = () => {
  const { balance } = useStake()

  return <div className={globalStyles.component_wrapper}>
    <h1>Your Balance</h1>
    <div><span>Balance:</span> {balance?.tonBalance.toFixed(3)} TON</div>
    <div>
      <span>Available to stake:</span> {(Number(balance?.tonAvailable) / import.meta.env.VITE_LAMPORTS).toFixed(3)} TON
    </div>
    <div><span>Already staked:</span> {(Number(balance?.tsTonStacked) / import.meta.env.VITE_LAMPORTS).toFixed(3)} tsTON
    </div>
  </div>
};

export default BalanceDisplay
