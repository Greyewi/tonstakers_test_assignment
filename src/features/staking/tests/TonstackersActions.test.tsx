import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"
import TonstakersActions from "../TonstackersActions"
import { useStake } from "../StakingProvider"
import { vi, Mock } from "vitest"
import { useStakeActions } from '../hooks/useStakeActions'
import { useUnstakeActions } from '../hooks/useUnstakeActions'

vi.mock("../StakingProvider", () => ({
  useStake: vi.fn(),
}))

vi.mock('../hooks/useStakeActions', () => ({
  useStakeActions: vi.fn(),
}))

vi.mock('../hooks/useUnstakeActions', () => ({
  useUnstakeActions: vi.fn(),
}))

const mockBalance = {
  tonBalance: 100,
  tsTonStacked: 50 * Number(import.meta.env.VITE_LAMPORTS),
}

const mockStakeActions = {
  handleStake: vi.fn(),
  handleStakeMax: vi.fn(),
}

const mockUnstakeActions = {
  handleUnstake: vi.fn(),
  handleUnstakeInstant: vi.fn(),
  handleUnstakeBestRate: vi.fn(),
}

describe("TonstackersManageUI", () => {
  beforeEach(() => {
    (useStake as Mock).mockReturnValue({ balance: mockBalance })
    ;(useStakeActions as Mock).mockReturnValue(mockStakeActions)
    ;(useUnstakeActions as Mock).mockReturnValue(mockUnstakeActions)
  })

  it("renders StakeForm and UnstakeForm correctly", () => {
    render(<TonstakersActions />)

    expect(screen.getByText("Start to Earn")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter amount to stake")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter amount to unstake")).toBeInTheDocument()
  })

  it("displays insufficient balance message for staking when stake amount exceeds tonBalance", () => {
    render(<TonstakersActions />)

    const stakeInput = screen.getByPlaceholderText("Enter amount to stake")
    fireEvent.change(stakeInput, { target: { value: "200" } })

    expect(screen.getByText("Insufficient TON balance")).toBeInTheDocument()

    const stakeButton = screen.getByRole("button", { name: /stake 200 TONs/i })
    expect(stakeButton).toBeDisabled()
  })

  it("displays insufficient staked balance message for unstaking when unstake amount exceeds tsTonStacked", () => {
    render(<TonstakersActions />)

    const unstakeInput = screen.getByPlaceholderText("Enter amount to unstake")
    fireEvent.change(unstakeInput, { target: { value: "60" } })

    expect(screen.getByText("Insufficient staked balance")).toBeInTheDocument()

    const unstakeButton = screen.getByRole("button", { name: /unstake 60 tsTONs/i })
    expect(unstakeButton).toBeDisabled()
  })

  it("enables 'Stake Max' button when tonBalance is sufficient", () => {
    render(<TonstakersActions />)

    const stakeMaxButton = screen.getByText("Stake Max")
    expect(stakeMaxButton).toBeEnabled()
    fireEvent.click(stakeMaxButton)
    expect(mockStakeActions.handleStakeMax).toHaveBeenCalled()
  })

  it("handles stake and unstake actions", () => {
    render(<TonstakersActions />)

    const stakeInput = screen.getByPlaceholderText("Enter amount to stake")
    const unstakeInput = screen.getByPlaceholderText("Enter amount to unstake")

    fireEvent.change(stakeInput, { target: { value: "50" } })
    fireEvent.click(screen.getByText("Stake 50 TONs"))
    expect(mockStakeActions.handleStake).toHaveBeenCalled()

    fireEvent.change(unstakeInput, { target: { value: "10" } })
    fireEvent.click(screen.getByText("Unstake 10 tsTONs"))
    expect(mockUnstakeActions.handleUnstake).toHaveBeenCalled()
  })

  it("handles unstake instant and best rate actions", () => {
    render(<TonstakersActions />)

    const unstakeInput = screen.getByPlaceholderText("Enter amount to unstake")
    fireEvent.change(unstakeInput, { target: { value: "10" } })

    fireEvent.click(screen.getByText("Unstake Instant 10 tsTONs"))
    expect(mockUnstakeActions.handleUnstakeInstant).toHaveBeenCalled()

    fireEvent.click(screen.getByText("Unstake Best Rate 10 tsTONs"))
    expect(mockUnstakeActions.handleUnstakeBestRate).toHaveBeenCalled()
  })
})
