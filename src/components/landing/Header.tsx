import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <nav
        className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-violet-600" aria-hidden="true" />
          <span className="text-xl font-semibold text-zinc-50">Wally</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#sobre"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
          >
            Sobre
          </Link>
          <Link
            href="#beneficios"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
          >
            Benefícios
          </Link>
          <Link
            href="#como-funciona"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
          >
            Como Funciona
          </Link>
          <Link
            href="#contato"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
          >
            Contato
          </Link>
        </div>

        {/* CTA */}
        <Button asChild size="sm" className="bg-violet-600 hover:bg-violet-700">
          <Link href="#contato">Começar Grátis</Link>
        </Button>
      </nav>
    </header>
  )
}
