import { screen, render, within } from "@testing-library/react"
import BalanceDisplay from "../BalanceDisplay"
import { useStake } from "@features/staking/StakingProvider"
import { vi, Mock } from "vitest"
import { JSX } from 'react'

vi.mock("@features/staking/StakingProvider", () => ({
  useStake: vi.fn(),
}))

const mockBalance = {
  tonBalance: 123.456,
  tonAvailable: 789000,
  tsTonStacked: 456000,
}

const renderWithProviders = (ui: JSX.Element) => {
  return render(ui)
}

const VITE_LAMPORTS = Number(import.meta.env.VITE_LAMPORTS) || 1000000

test("BalanceDisplay should render correct initial values", () => {
  (useStake as Mock).mockReturnValue({ balance: mockBalance })

  renderWithProviders(<BalanceDisplay />)

  expect(screen.getByText(/your balance/i)).toBeInTheDocument()

  const balanceElement = screen.getByText("Balance:").closest('div')
  expect(within(balanceElement!).getByText("123.456 TON")).toBeInTheDocument()

  const availableElement = screen.getByText("Available to stake:").closest('div')
  const availableToStake = (mockBalance.tonAvailable / VITE_LAMPORTS).toFixed(3)
  expect(within(availableElement!).getByText(`${availableToStake} TON`)).toBeInTheDocument()

  const stakedElement = screen.getByText("Already staked:").closest('div')
  const alreadyStaked = (mockBalance.tsTonStacked / VITE_LAMPORTS).toFixed(3)
  expect(within(stakedElement!).getByText(`${alreadyStaked} tsTON`)).toBeInTheDocument()
})

test("BalanceDisplay should handle missing balance data gracefully", () => {
  (useStake as Mock).mockReturnValue({ balance: null })

  renderWithProviders(<BalanceDisplay />)

  expect(screen.getByText(/your balance/i)).toBeInTheDocument()

  const balanceElement = screen.getByText("Balance:").closest('div')
  expect(within(balanceElement!).getByText("0.000 TON")).toBeInTheDocument()

  const availableElement = screen.getByText("Available to stake:").closest('div')
  expect(within(availableElement!).getByText("0.000 TON")).toBeInTheDocument()

  const stakedElement = screen.getByText("Already staked:").closest('div')
  expect(within(stakedElement!).getByText("0.000 tsTON")).toBeInTheDocument()
})
