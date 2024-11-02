import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {useRef, useState} from 'react'

interface AssetData {
  asset: {
    symbol: string
    image_url: string
    dex_usd_price: string
  }
}

const fetchAssetData = async (url: string): Promise<AssetData> => {
  const { data } = await axios.get(url)
  return data
}

export const useAssetData = (url: string) => {
  const [interval, setInterval] = useState<number>(30)
  const cache = useRef<number>(0)

  const { data, isLoading, error, refetch } = useQuery<AssetData>({
    queryKey: [`${url}?cache=${cache.current}`],
    queryFn: () => fetchAssetData(`${url}?cache=${cache.current}`),
    refetchInterval: interval * 1000,
    gcTime: interval * 1000,
    refetchOnWindowFocus: true,
  })

  const fetchWithoutCache = async () => {
    cache.current++
    return refetch()
  }

  return { data: data?.asset, isLoading, error, refetch: fetchWithoutCache, interval, setInterval }
}
