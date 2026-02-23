import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import FAQSection from "./FAQSection"

describe("FAQSection", () => {
  it("renders the section heading", () => {
    render(<FAQSection />)
    expect(
      screen.getByRole("heading", { name: /perguntas frequentes|faq/i })
    ).toBeInTheDocument()
  })

  it("renders accordion triggers (questions)", () => {
    render(<FAQSection />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBeGreaterThanOrEqual(3)
  })

  it("expands an item when clicked", async () => {
    render(<FAQSection />)
    const user = userEvent.setup()
    const firstButton = screen.getAllByRole("button")[0]
    await user.click(firstButton)
    // After clicking, the content panel should be visible
    expect(firstButton).toHaveAttribute("aria-expanded", "true")
  })

  it("renders the region landmark", () => {
    render(<FAQSection />)
    expect(screen.getByRole("region")).toBeInTheDocument()
  })
})
