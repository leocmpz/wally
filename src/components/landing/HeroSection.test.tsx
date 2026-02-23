import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HeroSection from "./HeroSection"

describe("HeroSection", () => {
  it("renders the main heading", () => {
    render(<HeroSection />)
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toBeInTheDocument()
  })

  it("renders description text", () => {
    render(<HeroSection />)
    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading).toBeTruthy()
    // Section should have a paragraph/description mentioning channels
    const matches = screen.getAllByText(/whatsapp|telegram|mensag/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it("renders CTA buttons", () => {
    render(<HeroSection />)
    const ctaLinks = screen.getAllByRole("link", {
      name: /começar|começe|grátis|saiba mais/i,
    })
    expect(ctaLinks.length).toBeGreaterThanOrEqual(1)
  })

  it("renders the hero section element", () => {
    render(<HeroSection />)
    expect(screen.getByRole("region")).toBeInTheDocument()
  })

  it("renders a badge/highlight", () => {
    render(<HeroSection />)
    // Badge should appear for highlights (IA, WhatsApp, etc.)
    const badges = screen.getAllByText(/ia|rag|whatsapp|telegram/i)
    expect(badges.length).toBeGreaterThan(0)
  })
})
