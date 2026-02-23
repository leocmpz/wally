import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HowItWorksSection from "./HowItWorksSection"

describe("HowItWorksSection", () => {
  it("renders the section heading", () => {
    render(<HowItWorksSection />)
    expect(
      screen.getByRole("heading", { name: /como funciona/i })
    ).toBeInTheDocument()
  })

  it("renders tab triggers for the steps", () => {
    render(<HowItWorksSection />)
    const tabs = screen.getAllByRole("tab")
    expect(tabs.length).toBeGreaterThanOrEqual(3)
  })

  it("renders step content", () => {
    render(<HowItWorksSection />)
    // Active tab content should be visible
    expect(screen.getByRole("tabpanel")).toBeInTheDocument()
  })

  it("renders the region landmark", () => {
    render(<HowItWorksSection />)
    expect(screen.getByRole("region")).toBeInTheDocument()
  })
})
