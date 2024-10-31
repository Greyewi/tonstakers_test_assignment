import {useState} from "react";
import {useWallet} from "../../WalletProvider";
const TonstackersManageUI = () => {
  const [stakeValue, setStakeValue] = useState('1');
  const { wallet } = useWallet()

  if(!wallet.tonSHandlers) {
    return
  }
  const { tonSHandlers } = wallet
  const handleStake = async () => {
    const amount = parseFloat(stakeValue);
    if (!isNaN(amount)) {
      const res = await tonSHandlers.stake(amount);
      console.log(`Staked ${amount} TON, ${res}`);
    }
  };

  const handleUnstake = async () => {
    const amount = parseFloat(stakeValue);
    if (!isNaN(amount)) {
      const res = await tonSHandlers.unstake(amount);
      console.log(`Unstaked ${amount} tsTON, ${res}`);
    }
  };

  const handleUnstakeInstant = async () => {
    const amount = parseFloat(stakeValue);
    if (!isNaN(amount)) {
      const res = await tonSHandlers.unstakeInstant(amount);
      console.log(`Instantly unstaked ${amount} tsTON, ${res}`);
    }
  };

  const handleUnstakeBestRate = async () => {
    const amount = parseFloat(stakeValue);
    if (!isNaN(amount)) {
      const res = await tonSHandlers.unstakeBestRate(amount);
      console.log(`Unstaked ${amount} tsTON at best rate, ${res}`);
    }
  };

  // const handleInitialize = () => {
  //   tonstakersService.get()?.addEventListener("initialized", () => {
  //     console.log("Tonstakers SDK initialized successfully.");
  //   });
  // };
  //
  // const handleDeinitialize = () => {
  //   tonstakersService.get()?.addEventListener("deinitialized", () => {
  //     console.log("Tonstakers SDK has been deinitialized.");
  //   });
  // };

  return (
    <div>
      <input
        type="number"
        value={stakeValue}
        onChange={(e) => setStakeValue(e.target.value)}
        placeholder="Enter amount"
      />

      <button onClick={handleStake}>
        Stake
      </button>

      <button onClick={handleUnstake}>
        Unstake
      </button>

      <button onClick={async () => {
        await tonSHandlers.stakeMax();
        console.log("Staked maximum balance.");
      }}>
        Stake Max
      </button>

      <button onClick={handleUnstakeInstant}>
        Unstake Instant
      </button>

      <button onClick={handleUnstakeBestRate}>
        Unstake Best Rate
      </button>

      {/*<button onClick={handleInitialize}>Initialize</button>*/}
      {/*<button onClick={handleDeinitialize}>Deinitialize</button>*/}
    </div>
  );
};

export default TonstackersManageUI