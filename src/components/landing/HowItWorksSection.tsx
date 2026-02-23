"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, MessageSquare, GitBranch, BarChart } from "lucide-react"

const steps = [
  {
    id: "configurar",
    label: "1. Configurar",
    icon: Upload,
    title: "Configure seu agente",
    description:
      "Faça upload dos documentos da sua empresa — FAQs, catálogos, políticas. O Wally processa e indexa tudo via RAG para que o agente tenha contexto real.",
    badge: "Onboarding",
    badgeColor: "bg-violet-600/20 text-violet-300 border-violet-600/30",
  },
  {
    id: "conectar",
    label: "2. Conectar",
    icon: MessageSquare,
    title: "Conecte seus canais",
    description:
      "Ative WhatsApp (via Meta Business API) ou Telegram (via Bot API) com poucos cliques. Cada canal tem seu próprio webhook seguro e isolado.",
    badge: "Integração",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "atender",
    label: "3. Atender",
    icon: GitBranch,
    title: "IA atende e escalonona",
    description:
      "Leads chegam e o agente responde automaticamente com base no contexto da sua empresa. Quando não sabe a resposta, escalona para humanos com todo o histórico.",
    badge: "Automação",
    badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/30",
  },
  {
    id: "analisar",
    label: "4. Analisar",
    icon: BarChart,
    title: "Analise e otimize",
    description:
      "Acompanhe métricas de atendimento, taxa de resolução, leads convertidos e tempo de resposta em tempo real pelo dashboard.",
    badge: "Insights",
    badgeColor: "bg-zinc-700 text-zinc-300",
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      aria-label="Como o Wally funciona"
      className="bg-zinc-950 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-50 md:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-zinc-400">
            Do upload de documentos ao atendimento automatizado em 4 passos
          </p>
        </div>

        <Tabs defaultValue="configurar" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 gap-1 bg-zinc-900 p-1 md:grid-cols-4">
            {steps.map((step) => (
              <TabsTrigger
                key={step.id}
                value={step.id}
                className="text-xs data-[state=active]:bg-violet-600 data-[state=active]:text-white md:text-sm"
              >
                {step.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <TabsContent key={step.id} value={step.id}>
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
                        <Icon className="h-6 w-6 text-violet-400" aria-hidden="true" />
                      </div>
                      <div>
                        <Badge className={step.badgeColor}>
                          {step.badge}
                        </Badge>
                        <CardTitle className="mt-1 text-xl text-zinc-50">
                          {step.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400">{step.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
