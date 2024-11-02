import { useStake } from '../StakingProvider'

export const useUnstakeActions = (unstakeValue: string) => {
  const { wallet } = useStake()

  const handleUnstake = async () => {
    const amount = parseFloat(unstakeValue)
    if (!isNaN(amount) && wallet) {
      const res = await wallet.tonSHandlers?.unstake(amount)
      console.log(`Unstaked ${amount} tsTON, ${res}`)
    }
  }

  const handleUnstakeInstant = async () => {
    const amount = parseFloat(unstakeValue)
    if (!isNaN(amount) && wallet) {
      const res = await wallet.tonSHandlers?.unstakeInstant(amount)
      console.log(`Instantly unstaked ${amount} tsTON, ${res}`)
    }
  }

  const handleUnstakeBestRate = async () => {
    const amount = parseFloat(unstakeValue)
    if (!isNaN(amount) && wallet) {
      const res = await wallet.tonSHandlers?.unstakeBestRate(amount)
      console.log(`Unstaked ${amount} tsTON at best rate, ${res}`)
    }
  }

  return { handleUnstake, handleUnstakeInstant, handleUnstakeBestRate }
}
