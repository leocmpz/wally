import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, Zap, Shield } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      aria-label="Hero — apresentação do Wally"
      className="relative overflow-hidden bg-zinc-950 py-20 md:py-32"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Highlight badges */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <Badge className="bg-violet-600/20 text-violet-300 border-violet-600/30">
              IA com RAG
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              WhatsApp
            </Badge>
            <Badge className="bg-zinc-700 text-zinc-300">
              Telegram
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-50 md:text-6xl">
            Atendimento via IA que{" "}
            <span className="text-violet-500">entende sua empresa</span>
          </h1>

          {/* Description */}
          <p className="mb-10 text-lg text-zinc-400 md:text-xl">
            O Wally automatiza o atendimento de leads no WhatsApp e Telegram com
            um agente de IA treinado com o contexto do seu negócio. Quando
            necessário, escalona para humanos.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Link href="#contato">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
            >
              <Link href="#como-funciona">Saiba Mais</Link>
            </Button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="flex items-start gap-3 p-6">
              <Bot className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-zinc-50">
                  Agente com RAG
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Responde com base no conhecimento real da sua empresa
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="flex items-start gap-3 p-6">
              <Zap className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-zinc-50">
                  Respostas instantâneas
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Atendimento 24/7 sem latência para seus leads
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="flex items-start gap-3 p-6">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-zinc-50">
                  Fallback humano
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Escalona para atendentes quando a IA não tem resposta
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
