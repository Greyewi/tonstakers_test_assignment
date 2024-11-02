import {FC} from 'react'
import CurrencyDisplay from './components/CurrencyDisplay'
import { useAssetData } from './hooks/useAssetData'
import globalStyles from "@src/App.module.css"
import styles from './styles.module.css'

const tonUrl = 'https://api.ston.fi/v1/assets/0:0000000000000000000000000000000000000000000000000000000000000000'
const tsTonUrl = 'https://api.ston.fi/v1/assets/0:bdf3fa8098d129b54b4f73b5bac5d1e1fd91eb054169c3916dfc8ccd536d1000'

const CurrencyRate: FC = () => {

  const tonData = useAssetData(tonUrl)
  const tsTonData = useAssetData(tsTonUrl)

  return (
    <div className={globalStyles.component_wrapper}>
      <h1>Currency Rates</h1>

      <div className={styles.currency}>
        <CurrencyDisplay
          isLoading={tonData.isLoading}
          error={tonData.error}
          data={tonData.data || null}
          onRefetch={tonData.refetch}
          setInterval={tonData.setInterval}
          interval={tonData.interval}
        />
      </div>

      <div className={styles.currency}>
        <CurrencyDisplay
          isLoading={tsTonData.isLoading}
          error={tsTonData.error}
          data={tsTonData.data || null}
          onRefetch={tsTonData.refetch}
          setInterval={tsTonData.setInterval}
          interval={tsTonData.interval}
        />
      </div>
    </div>
  )
}

export default CurrencyRate
