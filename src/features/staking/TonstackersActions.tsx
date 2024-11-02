import {memo, useState, FC} from "react"
import { useStake } from "./StakingProvider"
import globalStyles from "@src/App.module.css"
import styles from './styles.module.css'
import ActionButton from './components/ActionButton'
import InputField from './components/InputField'
import {useStakeActions} from './hooks/useStakeActions'
import {useUnstakeActions} from './hooks/useUnstakeActions'

interface StakeFormProps {
  stakeValue: string
  setStakeValue: (value: string) => void
  handleStake: () => void
  handleStakeMax: () => void
  balance?: { tonBalance?: number } | null
}

interface UnstakeFormProps {
  unstakeValue: string
  setUnstakeValue: (value: string) => void
  handleUnstake: () => void
  handleUnstakeInstant: () => void
  handleUnstakeBestRate: () => void
  balance: { tsTonStacked?: number } | null
}

const StakeForm: FC<StakeFormProps> = ({ stakeValue, setStakeValue, handleStake, handleStakeMax, balance }) => {
 const check = Number(balance?.tonBalance) < Number(stakeValue)

  return (<div className={styles.form_area}>
    {check && <span className={styles.form_alert}>Insufficient TON balance</span>}
    <InputField
      value={stakeValue}
      prefix="TON"
      onChange={(e) => setStakeValue(e.target.value)}
      placeholder="Enter amount to stake"
      suffixTooltip="TON will be convert to tsTON"
    />
    <ActionButton
      onClick={handleStake}
      text={`Stake ${stakeValue ? `${stakeValue} TONs` : ''}`}
      disabled={check || !Number(stakeValue)}
    />
    <ActionButton
      onClick={handleStakeMax}
      disabled={Number(balance?.tonBalance) < 1}
      text="Stake Max"
    />
  </div>)
}

const UnstakeForm:FC<UnstakeFormProps> = ({ unstakeValue, setUnstakeValue, handleUnstake, handleUnstakeInstant, handleUnstakeBestRate, balance }) => {
  const check = (Number(balance?.tsTonStacked) / import.meta.env.VITE_LAMPORTS) < Number(unstakeValue)
  return (<div className={styles.form_area}>
    {check && <span className={styles.form_alert}>Insufficient staked balance</span>}
    <InputField
      value={unstakeValue}
      prefix="tsTON"
      onChange={(e) => setUnstakeValue(e.target.value)}
      placeholder="Enter amount to unstake"
      suffixTooltip="Unstaking converts tsTON back to TON"
    />
    <ActionButton
      onClick={handleUnstake}
      text={`Unstake ${unstakeValue ? `${unstakeValue} tsTONs` : ''}`}
      disabled={check || !Number(unstakeValue)}
    />
    <ActionButton
      onClick={handleUnstakeInstant}
      text={`Unstake Instant ${unstakeValue ? `${unstakeValue} tsTONs` : ''}`}
      disabled={check || !Number(unstakeValue)}
    />
    <ActionButton
      onClick={handleUnstakeBestRate}
      text={`Unstake Best Rate ${unstakeValue ? `${unstakeValue} tsTONs` : ''}`}
      disabled={check || !Number(unstakeValue)}
    />
  </div>)
}


const TonstackersManageUI:FC = memo(() => {
  const [stakeValue, setStakeValue] = useState<string>('')
  const [unstakeValue, setUnstakeValue] = useState<string>('')

  const { balance } = useStake()

  const stakeActions = useStakeActions(stakeValue)
  const unstakeActions = useUnstakeActions(unstakeValue)

  return (
    <div className={globalStyles.component_wrapper}>
      <h1>Start to Earn</h1>
      <StakeForm
        stakeValue={stakeValue}
        setStakeValue={setStakeValue}
        handleStake={stakeActions.handleStake}
        handleStakeMax={stakeActions.handleStakeMax}
        balance={balance}
      />
      <UnstakeForm
        unstakeValue={unstakeValue}
        setUnstakeValue={setUnstakeValue}
        handleUnstake={unstakeActions.handleUnstake}
        handleUnstakeInstant={unstakeActions.handleUnstakeInstant}
        handleUnstakeBestRate={unstakeActions.handleUnstakeBestRate}
        balance={balance}
      />
    </div>
  )
})

export default TonstackersManageUI
