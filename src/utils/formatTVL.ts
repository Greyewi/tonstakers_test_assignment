export const formatTvl = (tvl: number | bigint): string => {
  const normalizedTvl = Number(tvl) / Number(import.meta.env.VITE_LAMPORTS)
  const tvlString = Math.round(normalizedTvl).toString()
  const length = tvlString.length

  let formattedValue
  let unit

  if (length > 12) {
    formattedValue = normalizedTvl / 1e12
    unit = 'T'
  } else if (length > 9) {
    formattedValue = normalizedTvl / 1e9
    unit = 'B'
  } else if (length > 6) {
    formattedValue = normalizedTvl / 1e6
    unit = 'M'
  } else {
    formattedValue = normalizedTvl
    unit = ''
  }

  return `${formattedValue.toFixed(1)}${unit} TON`
}
