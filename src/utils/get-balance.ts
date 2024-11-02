import { TonConnect } from '@tonconnect/sdk'

export const getWalletBalance = async (connector: TonConnect) => {
  if (connector.wallet) {
    const wallet = connector.wallet
    const balanceUrl =
      wallet.account.chain === '-3'
        ? 'https://testnet.toncenter.com/api/v2/getAddressBalance?address=' +
          wallet.account.address
        : 'https://toncenter.com/api/v2/getAddressBalance?address=' +
          wallet.account.address

    const balanceResponse = await fetch(balanceUrl)
    const balanceData = await balanceResponse.json()
    return balanceData.result / import.meta.env.VITE_LAMPORTS
  }
}
