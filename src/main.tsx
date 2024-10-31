import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import {TonConnect} from "@tonconnect/sdk";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {WalletProvider} from "./features/wallet/WalletProvider";
import {Tonstakers} from "tonstakers-sdk";

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)
  const queryClient = new QueryClient();
  const connector = new TonConnect({
    manifestUrl: "http://159.69.22.219:1000/tonconnect-manifest.json",
  });

  const tonstackers = new Tonstakers( // @ts-ignore TODO: fix interface
    {connector}
  )

  root.render(
    <QueryClientProvider client={queryClient}>
      <TonConnectUIProvider connector={connector}>
        <React.StrictMode>
          <WalletProvider
            connector={connector}
            tonstackers={tonstackers}
          >
            <App/>
          </WalletProvider>
        </React.StrictMode>
      </TonConnectUIProvider>
    </QueryClientProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
