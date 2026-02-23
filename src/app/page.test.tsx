import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Page from "./page"

describe("Landing Page", () => {
  it("renders without crashing", () => {
    const { container } = render(<Page />)
    expect(container).toBeTruthy()
  })

  it("renders the header", () => {
    render(<Page />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
  })

  it("renders the main content area", () => {
    render(<Page />)
    expect(screen.getByRole("main")).toBeInTheDocument()
  })

  it("renders the footer", () => {
    render(<Page />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("renders the h1 heading", () => {
    render(<Page />)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("has all required sections", () => {
    render(<Page />)
    const regions = screen.getAllByRole("region")
    expect(regions.length).toBeGreaterThanOrEqual(5)
  })
})
