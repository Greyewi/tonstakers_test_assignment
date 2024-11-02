import {useStake} from "./StakingProvider"
import {memo} from "react"
import globalStyles from "@src/App.module.css";
import {formatTvl} from "@utils/formatTVL";

const TonstackersInfo = memo(() => {
  const { info } = useStake()

  if(!info) {
    return
  }

  return (
    <div className={globalStyles.component_wrapper}>
      <h1>Tonstakers Status</h1>
      <div>APY: {info.apy.toFixed(import.meta.env.VITE_FIXED_DECIMALS)}%</div>
      <div>TVL: {formatTvl(info.tvl)}</div>
      <div>Stakers: {info.stakers}</div>
    </div>
  )
})


export default TonstackersInfo