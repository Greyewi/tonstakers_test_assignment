import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react'
import {Tonstakers} from "tonstakers-sdk"
import {TonConnect} from "@tonconnect/sdk"

export interface Wallet {
  tonSHandlers?: Tonstakers;
  tonConnectHandlers: TonConnect;
}

interface WalletContextType {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{
  children: ReactNode, connector: TonConnect, tonstackers: Tonstakers
}> = ({children, connector, tonstackers}) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    tonstackers.addEventListener("initialized", async () => {
      await tonstackers.getStakedBalance();
      await tonstackers.getAvailableBalance();
      setWallet({
        tonConnectHandlers: connector, tonSHandlers: tonstackers
      })
    });
    return () => {
      tonstackers.addEventListener("deinitialized", async () => {
        await tonstackers.getStakedBalance();
        await tonstackers.getAvailableBalance();
      });
    };
  }, []);

  return (<WalletContext.Provider value={{wallet, setWallet}}>
      {children}
    </WalletContext.Provider>);
};
