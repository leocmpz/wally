import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Footer from "./Footer"

describe("Footer", () => {
  it("renders the footer element", () => {
    render(<Footer />)
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("renders the Wally brand in the footer", () => {
    render(<Footer />)
    expect(screen.getByText("Wally")).toBeInTheDocument()
  })

  it("renders navigation links", () => {
    render(<Footer />)
    expect(
      screen.getByRole("link", { name: /política de privacidade/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /termos de uso/i })
    ).toBeInTheDocument()
  })

  it("renders social media links", () => {
    render(<Footer />)
    const socialLinks = screen.getAllByRole("link")
    expect(socialLinks.length).toBeGreaterThanOrEqual(2)
  })

  it("renders copyright text", () => {
    render(<Footer />)
    expect(screen.getByText(/\d{4}.*wally/i)).toBeInTheDocument()
  })
})
