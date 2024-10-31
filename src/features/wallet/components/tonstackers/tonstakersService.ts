import { SendTransactionRequest } from "@tonconnect/sdk"
import { TonConnectUI } from '@tonconnect/ui-react'

export interface IWalletConnector {
  wallet: {
    account?: WalletAccount;
  };
  sendTransaction: (transactionDetails: TransactionDetails) => Promise<void>;
  onStatusChange: (callback: (wallet: any) => void) => void;
}

export interface TonstakersOptions {
  connector: IWalletConnector;
  partnerCode?: number;
  tonApiKey?: string;
  cacheFor?: number;
}

interface TransactionDetails {
  validUntil: number;
  messages: TransactionMessage[];
}

interface TransactionMessage {
  address: string;
  amount: string;
  payload: string;
}

interface WalletAccount {
  address: string;
  chain: string;
}
export const tonSFormatter = (tonConnectUI: any): TonstakersOptions => {
  const sendTransactionWrapper = (transaction: SendTransactionRequest) => tonConnectUI.sendTransaction(transaction).then(() => {})
  return {
    connector: {
      wallet: {
        account: {
          address: tonConnectUI.wallet?.account.address as string,
          chain: tonConnectUI.wallet?.account.chain as string,
        },
      },
      sendTransaction: sendTransactionWrapper,
      onStatusChange: tonConnectUI.onStatusChange,
    },
  }
}
