import "./App.css"
import {TonConnectButton} from "@tonconnect/ui-react";
import { TonstakersConnector } from "./features/wallet/components/tonstackers/Tonstakers";

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <TonConnectButton/>
        <TonstakersConnector/>
      </header>
    </div>
  )
}

export default App
