import {useWallet} from "../../WalletProvider";
const TonstackersInfoUI = () => {
  const { wallet } = useWallet()

  if(!wallet) {
    return
  }
  const { tonSHandlers } = wallet

  const handleData = async () => {
    console.log(tonSHandlers)
    if(!tonSHandlers){
      return
    }
    tonSHandlers.addEventListener("initialized", async () => {
      await tonSHandlers.getStakedBalance();
      await tonSHandlers.getAvailableBalance();
    });

    const stakedBalance = await tonSHandlers.getStakedBalance();
    console.log(`Current staked balance: ${stakedBalance}`);

    const availableBalance = await tonSHandlers.getAvailableBalance();
    console.log(`Available balance for staking: ${availableBalance}`);

    const currentApy = await tonSHandlers.getCurrentApy();
    console.log(`Current APY: ${currentApy}%`);

    const historicalApy = await tonSHandlers.getHistoricalApy();
    console.log(`Historical APY data: ${historicalApy}`);

    const tvl = await tonSHandlers.getTvl();
    console.log(`Total Value Locked (TVL): ${tvl}`);

    const stakersCount = await tonSHandlers.getStakersCount();
    console.log(`Current number of stakers: ${stakersCount}`);

    const rates = await tonSHandlers.getRates();
    console.log(`1 TON = ${rates.TONUSD} USD`);
    console.log(`1 tsTON = ${rates.tsTONTON} TON`);
    console.log(`Projected 1 tsTON = ${rates.tsTONTONProjected} TON`);
  }

  return (
    <div>
      <button onClick={handleData}>Get Info</button>
    </div>
  );
};


export default TonstackersInfoUI