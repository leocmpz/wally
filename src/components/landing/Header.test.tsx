import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Header from "./Header"

describe("Header", () => {
  it("renders the Wally logo/brand", () => {
    render(<Header />)
    expect(screen.getByText("Wally")).toBeInTheDocument()
  })

  it("renders navigation links", () => {
    render(<Header />)
    expect(screen.getByRole("link", { name: /sobre/i })).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /benefícios/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /como funciona/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /contato/i })).toBeInTheDocument()
  })

  it("renders the CTA button", () => {
    render(<Header />)
    expect(
      screen.getByRole("link", { name: /começar grátis/i })
    ).toBeInTheDocument()
  })

  it("renders a <header> landmark element", () => {
    render(<Header />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
  })

  it("has navigation landmark", () => {
    render(<Header />)
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })
})
