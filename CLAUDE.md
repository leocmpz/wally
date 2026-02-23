# Wally — Project Context for Claude

## Sobre o Projeto

Wally é uma plataforma SaaS de atendimento via mensageria com agente de IA baseado em RAG (Retrieval-Augmented Generation). Empresas usam o Wally para automatizar o atendimento de leads em múltiplos canais de mensagens — o agente responde com contexto da empresa e escalona para humanos quando necessário.

**Canais suportados (Adapter Pattern):**
- **WhatsApp** — pago, via Meta Business Cloud API + BSP parceiro (360dialog ou Twilio)
- **Telegram** — gratuito, via Telegram Bot API (grammy)
- Novos canais são adicionados criando um novo adaptador em `src/infrastructure/channels/` — sem alterar Application ou Domain

**O usuário da plataforma escolhe qual canal ativar durante o onboarding** (configuração por organização).

---

## Arquitetura

Clean Architecture com 4 camadas. Dependências apontam sempre para dentro.

```
Domain ← Application ← Infrastructure / Presentation
```

Leia `.context/architecture.md` para a documentação completa, incluindo:
- Interfaces de repositório (ports)
- Interface `IChannelAdapter` e o padrão AdapterRegistry
- Fluxo completo de mensagem recebida → RAG → resposta ou fallback humano
- Guia de como adicionar um novo canal (5 passos, zero mudanças internas)

---

## Tech Stack

Ver `.context/tech-stack.md` para versões exatas e justificativas.

Resumo rápido:
- **Runtime**: Node.js 20 LTS + TypeScript 5.x (strict)
- **Framework**: Next.js 14 App Router
- **UI**: React 18 + Tailwind CSS 3.x + shadcn/ui
- **ORM**: Prisma 5.x + PostgreSQL 15 (Supabase)
- **Vetores**: pgvector (Supabase) ou Pinecone
- **RAG**: LangChain.js 0.3.x
- **IA**: Claude (`claude-sonnet-4-6` padrão) via Anthropic SDK
- **WhatsApp**: Meta Cloud API
- **Telegram**: grammy 1.x
- **Testes**: Vitest (unit) + Playwright (e2e)
- **Package manager**: pnpm

---

## Design System

Ver `.context/design-system.md`.

- Paleta: `violet-600` (primary), `emerald-500` (success), `amber-400` (warning), `zinc-950/900` (backgrounds)
- Sempre usar componentes de `@/components/ui` (shadcn/ui) — nunca criar primitivos do zero
- Nunca usar valores hex inline ou classes Tailwind arbitrárias (`p-[13px]`)

---

## Segurança

Ver `.context/security-policy.md`. Regras inegociáveis:

1. Todo input de API validado com Zod antes de qualquer processamento
2. Cada canal tem seu próprio endpoint de webhook e seu próprio método de verificação de assinatura
3. Todas as queries filtram por `organizationId` (multi-tenancy)
4. Secrets sempre em variáveis de ambiente — nunca no código
5. Conteúdo de mensagens sanitizado antes de interpolação em prompts de IA

---

## Regras de Desenvolvimento

- **Nunca importar infraestrutura diretamente em componentes React ou use cases** — use DI / server actions
- **Nunca criar componentes de UI genéricos** se existir equivalente no shadcn/ui
- **Nunca introduzir bibliotecas novas** sem atualizar `.context/tech-stack.md` primeiro
- **Nunca hardcodar secrets** — acesse sempre via `src/config/env.ts`
- **Nunca compartilhar endpoints de webhook entre canais**
- Ao adicionar um canal novo: seguir o guia em `.context/architecture.md` (seção "Adding a New Channel")
