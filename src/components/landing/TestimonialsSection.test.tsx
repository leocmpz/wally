import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import TestimonialsSection from "./TestimonialsSection"

describe("TestimonialsSection", () => {
  it("renders the section heading", () => {
    render(<TestimonialsSection />)
    expect(
      screen.getByRole("heading", { name: /depoimentos|clientes/i })
    ).toBeInTheDocument()
  })

  it("renders at least 2 testimonial cards", () => {
    render(<TestimonialsSection />)
    const blockquotes = document.querySelectorAll("blockquote")
    expect(blockquotes.length).toBeGreaterThanOrEqual(2)
  })

  it("renders reviewer names", () => {
    render(<TestimonialsSection />)
    // Should render person names in testimonials
    const names = document.querySelectorAll("[data-testid='reviewer-name']")
    expect(names.length).toBeGreaterThanOrEqual(2)
  })

  it("renders the region landmark", () => {
    render(<TestimonialsSection />)
    expect(screen.getByRole("region")).toBeInTheDocument()
  })
})
