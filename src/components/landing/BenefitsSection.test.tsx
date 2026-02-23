import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import BenefitsSection from "./BenefitsSection"

describe("BenefitsSection", () => {
  it("renders the section heading", () => {
    render(<BenefitsSection />)
    expect(
      screen.getByRole("heading", { name: /wally|benefícios|por que/i })
    ).toBeInTheDocument()
  })

  it("renders at least 3 benefit items", () => {
    render(<BenefitsSection />)
    const listItems = screen.getAllByRole("listitem")
    expect(listItems.length).toBeGreaterThanOrEqual(3)
  })

  it("renders benefit descriptions", () => {
    render(<BenefitsSection />)
    // Should include key benefit keywords
    const matches = screen.getAllByText(/escala|automatiz|eficiênc|respost|atendimento/i)
    expect(matches.length).toBeGreaterThan(0)
  })

  it("renders the region landmark", () => {
    render(<BenefitsSection />)
    expect(screen.getByRole("region")).toBeInTheDocument()
  })
})
