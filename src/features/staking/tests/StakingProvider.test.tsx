import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  StakingProvider,
  useStake,
  initBalance,
  initInfo
} from '../StakingProvider'
import { TonConnect } from '@tonconnect/sdk'
import { Tonstakers } from 'tonstakers-sdk'
import { vi } from 'vitest'
import { useTonstakersSetup } from '../hooks/useTonstakersSetup'

vi.mock('../hooks/useTonstakersSetup', () => ({
  useTonstakersSetup: vi.fn()
}))

const mockTonConnect = {} as TonConnect
const mockTonstakers = {} as Tonstakers

const TestComponent: React.FC = () => {
  const { wallet, loader, balance, info } = useStake()
  return (
    <div>
      <div>Wallet: {wallet ? 'Connected' : 'Disconnected'}</div>
      <div>Loader: {loader ? 'Loading' : 'Not Loading'}</div>
      <div>Balance: {balance?.tonBalance}</div>
      <div>APY: {info.apy}</div>
    </div>
  )
}

describe('StakingProvider', () => {
  it('should provide initial state values', () => {
    render(
      <StakingProvider connector={mockTonConnect} tonstakers={mockTonstakers}>
        <TestComponent />
      </StakingProvider>
    )

    expect(screen.getByText('Wallet: Disconnected')).toBeInTheDocument()
    expect(screen.getByText('Loader: Not Loading')).toBeInTheDocument()
    expect(
      screen.getByText(`Balance: ${initBalance.tonBalance}`)
    ).toBeInTheDocument()
    expect(screen.getByText(`APY: ${initInfo.apy}`)).toBeInTheDocument()
  })

  it('should call useTonstakersSetup with correct arguments', () => {
    render(
      <StakingProvider connector={mockTonConnect} tonstakers={mockTonstakers}>
        <TestComponent />
      </StakingProvider>
    )

    expect(useTonstakersSetup).toHaveBeenCalledWith(
      mockTonConnect,
      mockTonstakers,
      expect.any(Function), // setWallet
      expect.any(Function), // setLoader
      expect.any(Function), // setBalance
      expect.any(Function), // setInfo
      null
    )
  })
})
