import { Separator } from "@/components/ui/separator"
import {
  Clock,
  TrendingUp,
  Users,
  MessageSquare,
  Brain,
  BarChart3,
} from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Atendimento 24/7",
    description:
      "Seu agente nunca dorme. Responde leads a qualquer hora do dia ou da noite, sem custo adicional.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidade instantânea",
    description:
      "Atenda centenas de conversas simultâneas sem contratar mais equipe. Cresça sem gargalos.",
  },
  {
    icon: Brain,
    title: "Contexto da sua empresa",
    description:
      "O agente é treinado com documentos, FAQs e informações do seu negócio via RAG — responde como você responderia.",
  },
  {
    icon: Users,
    title: "Fallback inteligente",
    description:
      "Quando a IA não sabe a resposta, escalona automaticamente para um atendente humano.",
  },
  {
    icon: MessageSquare,
    title: "Multicanal nativo",
    description:
      "WhatsApp e Telegram em uma única plataforma. Novos canais são adicionados sem mudar o core.",
  },
  {
    icon: BarChart3,
    title: "Visibilidade total",
    description:
      "Acompanhe todas as conversas, leads e métricas de atendimento em um dashboard unificado.",
  },
]

export default function BenefitsSection() {
  return (
    <section
      id="beneficios"
      aria-label="Benefícios do Wally"
      className="bg-zinc-900 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-50 md:text-4xl">
            Por que escolher o{" "}
            <span className="text-violet-500">Wally</span>?
          </h2>
          <p className="mt-4 text-zinc-400">
            Benefícios reais para empresas que querem automatizar o atendimento
            com inteligência
          </p>
          <Separator className="mx-auto mt-8 w-16 bg-violet-600" />
        </div>

        <ul
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <li
                key={benefit.title}
                className="flex items-start gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-violet-600/50"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600/20"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-50">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    {benefit.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
