"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

const faqs = [
  {
    id: "faq-1",
    question: "O que é RAG e como o Wally usa essa tecnologia?",
    answer:
      "RAG (Retrieval-Augmented Generation) é uma técnica que combina um banco de conhecimento indexado com IA generativa. O Wally processa os documentos da sua empresa, armazena as informações em um banco vetorial e, quando um lead faz uma pergunta, busca o contexto relevante antes de gerar a resposta — garantindo precisão e alinhamento com o seu negócio.",
  },
  {
    id: "faq-2",
    question: "Quais canais de mensagem são suportados?",
    answer:
      "Atualmente o Wally suporta WhatsApp (via Meta Business Cloud API, com suporte a BSPs como 360dialog e Twilio) e Telegram (via Bot API). O arquitetura foi desenhada para suportar novos canais facilmente — cada canal é um adaptador independente.",
  },
  {
    id: "faq-3",
    question: "Como funciona o fallback para atendentes humanos?",
    answer:
      "Quando o agente de IA não tem confiança suficiente para responder ou detecta que o lead precisa de suporte especializado, ele aciona automaticamente o fallback humano. O atendente recebe o histórico completo da conversa e pode assumir o atendimento sem que o lead precise repetir informações.",
  },
  {
    id: "faq-4",
    question: "Meus dados estão seguros na plataforma?",
    answer:
      "Sim. Todos os dados são isolados por organização (multi-tenancy). As credenciais de API são armazenadas em variáveis de ambiente seguras, nunca no código. O conteúdo das mensagens é sanitizado antes de ser processado pela IA, e cada canal de webhook tem sua própria verificação de assinatura.",
  },
  {
    id: "faq-5",
    question: "Preciso de conhecimento técnico para configurar o Wally?",
    answer:
      "Não. O onboarding é guiado e voltado para gestores. Você faz upload dos seus documentos, escolhe o canal, e o agente já está pronto para atender. Integrações técnicas como webhooks são configuradas automaticamente pela plataforma.",
  },
  {
    id: "faq-6",
    question: "É possível personalizar as respostas do agente?",
    answer:
      "Sim. Você pode configurar o tom de voz do agente, adicionar saudações personalizadas, definir limitações de assunto e atualizar a base de conhecimento a qualquer momento com novos documentos ou FAQs.",
  },
]

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-label="Perguntas Frequentes"
      className="bg-zinc-950 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-50 md:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-zinc-400">
            Dúvidas comuns sobre o Wally e como a plataforma funciona
          </p>
          <Separator className="mx-auto mt-8 w-16 bg-violet-600" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-zinc-800"
            >
              <AccordionTrigger className="text-left text-zinc-50 hover:text-violet-400 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
