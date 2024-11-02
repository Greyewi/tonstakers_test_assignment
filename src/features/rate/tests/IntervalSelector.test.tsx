import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"
import { vi } from "vitest"
import IntervalSelector from "../components/IntervalSelector"

describe("IntervalSelector", () => {
  it("calls onChange with correct value when an interval is selected", () => {
    const handleChange = vi.fn()

    render(<IntervalSelector value={30} onChange={handleChange} />)

    fireEvent.mouseDown(screen.getByText("30 seconds"))

    fireEvent.click(screen.getByText("1 minute"))

    expect(handleChange).toHaveBeenCalledWith(60, expect.objectContaining({ value: 60 }))
  })
})
