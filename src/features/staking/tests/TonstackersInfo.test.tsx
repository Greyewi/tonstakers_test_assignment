import React from 'react'
import { render, screen } from "@testing-library/react"
import TonstackersInfo from "../TonstackersInfo"
import { useStake } from "../StakingProvider"
import { vi, Mock } from "vitest"
import { formatTvl } from "@utils/formatTVL"

vi.mock("../StakingProvider", () => ({
  useStake: vi.fn(),
}))

describe("TonstackersInfo", () => {
  it("renders Tonstakers Status with formatted info data", () => {
    const mockInfo = {
        apy: 12.5,
        tvl: 46954168875074790,
        stakers: 150,
      }

    ;(useStake as Mock).mockReturnValue({ info: mockInfo })

    render(<TonstackersInfo />)

    expect(screen.getByText("Tonstakers Status")).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes("APY: 12.5"))).toBeInTheDocument()
    expect(screen.getByText(`TVL: ${formatTvl(mockInfo.tvl)}`)).toBeInTheDocument()
    expect(screen.getByText("Stakers: 150")).toBeInTheDocument()
  })

  it("does not render when info is not provided", () => {
    (useStake as Mock).mockReturnValue({ info: null })

    const { container } = render(<TonstackersInfo />)
    expect(container).toBeEmptyDOMElement()
  })
})
