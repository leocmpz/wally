import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Wally — Atendimento via IA para WhatsApp e Telegram",
  description:
    "Automatize o atendimento de leads no WhatsApp e Telegram com um agente de IA treinado com o contexto do seu negócio. RAG, fallback humano e multicanal em uma única plataforma.",
  keywords: [
    "atendimento ao cliente com IA",
    "chatbot WhatsApp empresa",
    "automação de mensagens empresariais",
    "Wally atendimento IA",
    "chatbot WhatsApp",
    "agente IA mensageria",
    "RAG chatbot",
    "atendimento automatizado",
  ],
  authors: [{ name: "Wally" }],
  creator: "Wally",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Wally",
    title: "Wally — Atendimento via IA para WhatsApp e Telegram",
    description:
      "Automatize o atendimento de leads no WhatsApp e Telegram com IA baseada em RAG.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wally — Atendimento via IA",
    description: "Automatize o atendimento de leads com IA no WhatsApp e Telegram.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  )
}
