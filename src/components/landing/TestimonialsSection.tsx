import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const testimonials = [
  {
    quote:
      "O Wally transformou nosso atendimento. A IA responde 80% das perguntas dos leads com precisão, e quando não sabe, passa para nossa equipe sem perder o contexto.",
    name: "Ana Lima",
    role: "Diretora Comercial",
    company: "E-commerce Moda",
    initials: "AL",
  },
  {
    quote:
      "Implementamos em dois dias. O agente aprendeu tudo sobre nosso catálogo de produtos e agora atende no WhatsApp 24 horas sem custo de equipe adicional.",
    name: "Carlos Mendes",
    role: "CEO",
    company: "Pet Shop Online",
    initials: "CM",
  },
  {
    quote:
      "O fallback para humano é o que nos convenceu. A IA lida com perguntas simples, mas escalona prontamente quando o cliente precisa de suporte especializado.",
    name: "Fernanda Castro",
    role: "Head de Suporte",
    company: "SaaS B2B",
    initials: "FC",
  },
  {
    quote:
      "Usamos o Wally no Telegram para qualificar leads antes de passar para o time de vendas. A taxa de conversão aumentou 40% no primeiro mês.",
    name: "Ricardo Oliveira",
    role: "Gerente de Marketing",
    company: "Consultoria Imobiliária",
    initials: "RO",
  },
]

export default function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="bg-zinc-900 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-50 md:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-zinc-400">
            Empresas de diferentes segmentos usando o Wally para automatizar o
            atendimento
          </p>
          <Separator className="mx-auto mt-8 w-16 bg-violet-600" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-zinc-800 bg-zinc-950"
            >
              <CardContent className="p-6">
                <blockquote className="mb-6">
                  <p className="text-sm leading-relaxed text-zinc-300">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-violet-600/30">
                    <AvatarFallback className="bg-violet-600/20 text-violet-300 text-sm font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p
                      className="text-sm font-semibold text-zinc-50"
                      data-testid="reviewer-name"
                    >
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
