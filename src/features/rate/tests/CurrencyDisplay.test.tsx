import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"
import { vi, Mock } from "vitest"
import CurrencyRate from "../CurrencyRate"
import { useAssetData } from '../hooks/useAssetData'

vi.mock('../hooks/useAssetData', () => ({
  useAssetData: vi.fn(),
}))

const mockTonData = {
  symbol: "TON",
  image_url: "https://example.com/ton_logo.png",
  dex_usd_price: "1.2345",
}

const mockTsTonData = {
  symbol: "tsTON",
  image_url: "https://example.com/tston_logo.png",
  dex_usd_price: "2.3456",
}

describe("CurrencyRate", () => {
  let tonRefetch: Mock
  let tsTonRefetch: Mock
  let tonSetInterval: Mock
  let tsTonSetInterval: Mock

  beforeEach(() => {
    vi.clearAllMocks()
    tonRefetch = vi.fn()
    tsTonRefetch = vi.fn()
    tonSetInterval = vi.fn()
    tsTonSetInterval = vi.fn()
  })

  it("displays loading state initially", () => {
    (useAssetData as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
      interval: 30,
      setInterval: vi.fn(),
    })

    render(<CurrencyRate />)

    expect(screen.getAllByText("Loading data...")).toHaveLength(2)
  })

  it("displays error message when there is an error", () => {
    (useAssetData as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to load data"),
      refetch: vi.fn(),
      interval: 30,
      setInterval: vi.fn(),
    })

    render(<CurrencyRate />)

    expect(screen.getAllByText("Error loading data")).toHaveLength(2)
  })

  it("displays currency data correctly when loaded", () => {
    (useAssetData as Mock)
      .mockReturnValueOnce({
        data: mockTonData,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
        interval: 30,
        setInterval: vi.fn(),
      })
      .mockReturnValueOnce({
        data: mockTsTonData,
        isLoading: false,
        error: null,
        refetch: vi.fn(),
        interval: 30,
        setInterval: vi.fn(),
      })

    render(<CurrencyRate />)

    expect(screen.getByText("TON")).toBeInTheDocument()
    expect(screen.getByAltText("TON logo")).toHaveAttribute("src", mockTonData.image_url)
    expect(screen.getByText(`Price: $${Number(mockTonData.dex_usd_price).toFixed(Number(import.meta.env.VITE_FIXED_DECIMALS))}`)).toBeInTheDocument()

    expect(screen.getByText("tsTON")).toBeInTheDocument()
    expect(screen.getByAltText("tsTON logo")).toHaveAttribute("src", mockTsTonData.image_url)
    expect(screen.getByText(`Price: $${Number(mockTsTonData.dex_usd_price).toFixed(Number(import.meta.env.VITE_FIXED_DECIMALS))}`)).toBeInTheDocument()
  })

  it("calls onRefetch when 'Update currency' button is clicked", () => {
    (useAssetData as Mock)
      .mockReturnValueOnce({
        data: mockTonData,
        isLoading: false,
        error: null,
        refetch: tonRefetch,
        interval: 30,
        setInterval: vi.fn(),
      })
      .mockReturnValueOnce({
        data: mockTsTonData,
        isLoading: false,
        error: null,
        refetch: tsTonRefetch,
        interval: 30,
        setInterval: vi.fn(),
      })

    render(<CurrencyRate />)

    fireEvent.click(screen.getAllByText("Update currency")[0])
    expect(tonRefetch).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getAllByText("Update currency")[1])
    expect(tsTonRefetch).toHaveBeenCalledTimes(1)
  })
})
