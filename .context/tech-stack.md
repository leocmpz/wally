# Tech Stack — Wally

> **Rule**: never introduce a library outside this list without updating this file first. Open a discussion or PR to justify the addition.

---

## Runtime & Language

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 LTS | Runtime |
| TypeScript | 5.x | Language (strict mode enabled) |

---

## Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14 (App Router) | Full-stack framework |
| React | 18 | UI rendering |
| Tailwind CSS | 3.x | Utility-first styling |
| shadcn/ui | latest | Component library (`@/components/ui`) |

**shadcn/ui components in use**: Button, Card, Badge, Table, Dialog, Sheet, Input, Textarea, Select, Tabs, Avatar, Skeleton, Toast (Sonner), Separator, DropdownMenu.

---

## Backend

| Technology | Version | Purpose |
|---|---|---|
| Next.js API Routes | 14 | REST endpoints + webhooks |
| Zod | 3.x | Schema validation (all API inputs) |
| Prisma | 5.x | ORM + migrations |

---

## Database

| Technology | Version | Purpose |
|---|---|---|
| PostgreSQL | 15 | Primary database (via Supabase) |
| pgvector | latest extension | Embedding storage + similarity search |
| Pinecone | — | Alternative vector DB (if pgvector is insufficient) |

---

## AI / RAG

| Technology | Version | Purpose |
|---|---|---|
| LangChain.js | 0.3.x | RAG pipeline, document loaders, text splitters |
| Anthropic SDK | latest | Claude API client (`claude-sonnet-4-6` default) |
| OpenAI SDK | 4.x | GPT-4o fallback / alternative |
| tiktoken | latest | Token counting for context window management |

**Default model**: `claude-sonnet-4-6`. Configurable per `Agent` entity.

---

## Messaging Channels

Wally uses an **Adapter Pattern** — each channel is an independent adapter implementing `IChannelAdapter`. The core application (Domain + Application) has no knowledge of specific channel SDKs.

### WhatsApp (paid)

| Technology | Purpose |
|---|---|
| Meta WhatsApp Business Cloud API | Official webhook + message sending |
| 360dialog or Twilio | BSP (Business Solution Provider) for Cloud API access |

**Webhook verification**: HMAC-SHA256 with `X-Hub-Signature-256` header.

### Telegram (free)

| Technology | Version | Purpose |
|---|---|---|
| grammy | 1.x | Telegram Bot API client (preferred over `node-telegram-bot-api` — fully typed, modern, native ESM) |

**Webhook verification**: secret token in `X-Telegram-Bot-Api-Secret-Token` header, set during `setWebhook` registration.

**Rationale for grammy over node-telegram-bot-api**: grammy offers first-class TypeScript support, a composable middleware system, active maintenance, and native support for webhook mode in serverless environments (Vercel). `node-telegram-bot-api` is in maintenance mode with weaker TypeScript typings.

---

## Infrastructure & Deploy

| Technology | Purpose |
|---|---|
| Vercel | Frontend hosting + serverless functions |
| Supabase | PostgreSQL 15 + pgvector + file storage (context documents) |

---

## Tooling & DX

| Technology | Version | Purpose |
|---|---|---|
| pnpm | 9.x | Package manager |
| ESLint | 8.x | Linting (`eslint-config-next`) |
| Prettier | 3.x | Code formatting |
| Vitest | 1.x | Unit and integration tests |
| Playwright | 1.x | End-to-end tests |

---

## Environment Variables

All secrets and configuration are injected via environment variables. See `.context/security-policy.md` for the full list of required variables.

Never use `process.env.VARIABLE` directly in components — always access via a typed config module (`src/config/env.ts`) that validates with Zod at startup.

```typescript
// src/config/env.ts — example pattern
import { z } from 'zod'

const envSchema = z.object({
  // WhatsApp
  WHATSAPP_API_TOKEN: z.string().min(1),
  WHATSAPP_WEBHOOK_SECRET: z.string().min(1),
  // Telegram
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_WEBHOOK_SECRET: z.string().min(1),
  // AI
  ANTHROPIC_API_KEY: z.string().min(1),
  // Database
  DATABASE_URL: z.string().url(),
  // Auth
  NEXTAUTH_SECRET: z.string().min(32),
})

export const env = envSchema.parse(process.env)
```
