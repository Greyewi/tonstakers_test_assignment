import { FC, memo } from 'react'
import styles from '../styles.module.css'
import { Button, SelectProps } from 'antd'
import IntervalSelector from '@features/rate/components/IntervalSelector'

interface CurrencyDisplayProps {
  isLoading: boolean
  interval: number
  error: Error | null
  data: {
    symbol: string
    image_url: string
    dex_usd_price: string
  } | null
  onRefetch: () => void
  setInterval: SelectProps<number>['onChange']
}

const CurrencyDisplay: FC<CurrencyDisplayProps> = memo(
  ({ isLoading, error, data, onRefetch, interval, setInterval }) => {
    if (isLoading) return <p>Loading data...</p>
    if (error) return <p>Error loading data</p>

    return (
      <div className={styles.container}>
        {data && (
          <>
            <div className={styles.text}>
              <img
                src={data.image_url}
                alt={`${data.symbol} logo`}
                className={styles.image}
              />
              <h2>{data.symbol}</h2>
            </div>
            <p className={styles.text}>
              Price: $
              {Number(data.dex_usd_price).toFixed(
                import.meta.env.VITE_FIXED_DECIMALS
              )}
            </p>
          </>
        )}
        <Button className={styles.button} onClick={() => onRefetch()}>
          Update currency
        </Button>
        <label>
          {interval && (
            <IntervalSelector value={interval} onChange={setInterval} />
          )}
        </label>
      </div>
    )
  }
)

export default CurrencyDisplay
