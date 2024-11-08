import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { TonConnect } from '@tonconnect/sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StakingProvider } from '@features/staking/StakingProvider'
import { Tonstakers } from 'tonstakers-sdk'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  const queryClient = new QueryClient()
  const connector = new TonConnect({
    manifestUrl: import.meta.env.VITE_MANIFEST_URL
  })
  // eslint-disable-next-line
  // @ts-ignore TODO: fix tonstakers-sdk interface
  const tonstakers = new Tonstakers({ connector })

  root.render(
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider connector={connector}>
        <React.StrictMode>
          <StakingProvider connector={connector} tonstakers={tonstakers}>
            <App />
          </StakingProvider>
        </React.StrictMode>
      </TonConnectUIProvider>
    </QueryClientProvider>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. " +
      "Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  )
}
