import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Twitter, Linkedin, Instagram } from "lucide-react"

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      id="contato"
      className="bg-zinc-950 border-t border-zinc-800"
    >
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-violet-600" aria-hidden="true" />
              <span className="text-xl font-semibold text-zinc-50">Wally</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-zinc-400">
              Plataforma SaaS de atendimento via mensageria com agente de IA
              baseado em RAG. Automatize leads no WhatsApp e Telegram.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="https://twitter.com/wallyhq"
                aria-label="Twitter do Wally"
                className="text-zinc-400 transition-colors hover:text-zinc-50"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/wallyhq"
                aria-label="LinkedIn do Wally"
                className="text-zinc-400 transition-colors hover:text-zinc-50"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/wallyhq"
                aria-label="Instagram do Wally"
                className="text-zinc-400 transition-colors hover:text-zinc-50"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-50">
              Produto
            </h3>
            <ul className="space-y-3">
              {["#sobre", "#beneficios", "#como-funciona", "#depoimentos", "#faq"].map(
                (href) => {
                  const label = href.replace("#", "").replace(/-/g, " ")
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm capitalize text-zinc-400 transition-colors hover:text-zinc-50"
                      >
                        {label}
                      </Link>
                    </li>
                  )
                }
              )}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-zinc-50">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacidade"
                  className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:contato@wallyhq.com"
                  className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
                >
                  contato@wallyhq.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-400 sm:flex-row">
          <p>
            &copy; {currentYear} Wally. Todos os direitos reservados.
          </p>
          <p>
            Feito com IA para quem usa IA.
          </p>
        </div>
      </div>
    </footer>
  )
}
