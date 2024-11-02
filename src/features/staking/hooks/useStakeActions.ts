import { useStake } from '../StakingProvider'

export const useStakeActions = (stakeValue: string) => {
  const { wallet } = useStake()

  const handleStake = async () => {
    const amount = parseFloat(stakeValue)
    if (!isNaN(amount) && wallet) {
      const res = await wallet.tonSHandlers?.stake(amount)
      console.log(`Staked ${amount} TON, ${res}`)
    }
  }

  const handleStakeMax = async () => {
    if (wallet) {
      const res = await wallet.tonSHandlers?.stakeMax()
      console.log(`Staked maximum TON available, ${res}`)
    }
  }

  return { handleStake, handleStakeMax }
}
