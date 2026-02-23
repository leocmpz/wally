# Architecture — Wally

## Overview

Wally follows **Clean Architecture** with 4 layers. The fundamental rule is that **dependencies always point inward**: outer layers depend on inner layers, never the reverse.

```
┌─────────────────────────────────────────┐
│           Presentation (Next.js)        │
│  ┌───────────────────────────────────┐  │
│  │      Infrastructure               │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │       Application           │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │       Domain          │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Layers

### 1. Domain (`src/domain/`)

The innermost layer. **Zero external dependencies** — no imports from Node.js, ORMs, HTTP clients, or frameworks.

**Entities:**
- `Lead` — contact captured via any messaging channel (phone/chatId, name, status, channel, organizationId)
- `Conversation` — thread of messages between a lead and the AI agent or human agent
- `Message` — individual message (content, role: user|assistant|human, timestamp, confidence)
- `Agent` — AI agent configuration (model, system prompt, fallback threshold, organizationId)

**Value Objects:**
- `PhoneNumber` — validated E.164 format
- `ChannelId` — opaque string identifying a contact within a channel (phone for WhatsApp, numeric id for Telegram)
- `ChannelName` — enum: `whatsapp | telegram` (extensible)
- `ConfidenceScore` — float [0, 1] with threshold comparison logic
- `MessageRole` — enum: `user | assistant | human_agent`
- `LeadStatus` — enum: `new | in_progress | fallback | lost | converted`

**Channel Adapter Interface (port):**
```typescript
// src/domain/ports/IChannelAdapter.ts
interface NormalizedMessage {
  channelId: string        // sender identifier within the channel
  content: string          // plain text content
  rawPayload: unknown      // original webhook payload (for audit)
  messageRef: string       // channel-native message ID
  channel: ChannelName
}

interface IChannelAdapter {
  getChannelName(): ChannelName
  parseIncomingPayload(rawBody: unknown): NormalizedMessage
  sendMessage(channelId: string, text: string, orgId: string): Promise<void>
  verifyWebhookSignature(rawBody: string, headers: Record<string, string>): boolean
}
```

**Repository Interfaces (ports):**
```typescript
interface LeadRepository {
  findByPhone(phone: string, orgId: string): Promise<Lead | null>
  save(lead: Lead): Promise<Lead>
  findByOrganization(orgId: string): Promise<Lead[]>
}

interface ConversationRepository {
  findById(id: string, orgId: string): Promise<Conversation | null>
  findByLead(leadId: string, orgId: string): Promise<Conversation[]>
  save(conversation: Conversation): Promise<Conversation>
}

interface VectorRepository {
  similarity(query: string, orgId: string, topK: number): Promise<DocumentChunk[]>
  upsert(chunks: DocumentChunk[], orgId: string): Promise<void>
}
```

---

### 2. Application (`src/application/`)

Orchestrates domain entities through use cases. **Depends only on Domain** (via interfaces). No framework code, no HTTP, no DB calls.

The Application layer receives an `IChannelAdapter` instance via dependency injection — it never imports `WhatsAppAdapter` or `TelegramAdapter` directly.

**Use Cases:**

| Use Case | Input | Output | Description |
|---|---|---|---|
| `ProcessIncomingMessage` | `{ channelId, content, messageRef, channel, orgId, adapter: IChannelAdapter }` | `{ reply, confidence, fallbackTriggered }` | Channel-agnostic message handling |
| `CaptureLeadData` | `{ channelId, channel, name?, metadata, orgId }` | `Lead` | Upsert lead on first contact (any channel) |
| `TriggerHumanFallback` | `{ conversationId, reason, orgId, adapter: IChannelAdapter }` | `void` | Escalate conversation to human |
| `IngestContextFile` | `{ fileBuffer, mimeType, filename, orgId }` | `{ chunksStored: number }` | Parse and embed context documents |

---

### 3. Infrastructure (`src/infrastructure/`)

Concrete implementations of domain interfaces. **Depends on Application and Domain**.

**Implementations:**

| Interface | Implementation | Technology |
|---|---|---|
| `LeadRepository` | `PrismaLeadRepository` | PostgreSQL + Prisma 5.x |
| `ConversationRepository` | `PrismaConversationRepository` | PostgreSQL + Prisma 5.x |
| `VectorRepository` | `PgVectorRepository` | pgvector (or `PineconeRepository`) |
| `IChannelAdapter` | `WhatsAppAdapter` | Meta Business Cloud API |
| `IChannelAdapter` | `TelegramAdapter` | Telegram Bot API (via grammy) |
| `AIGateway` | `ClaudeGateway` / `OpenAIGateway` | Anthropic SDK / OpenAI SDK |
| `FileParser` | `LangChainFileParser` | LangChain.js |
| `Embedder` | `LangChainEmbedder` | LangChain.js + tiktoken |

**Channel Adapters location:** `src/infrastructure/channels/`
```
src/infrastructure/channels/
  whatsapp/
    WhatsAppAdapter.ts      ← implements IChannelAdapter
    whatsapp.schemas.ts     ← Zod schemas for Meta webhook payloads
  telegram/
    TelegramAdapter.ts      ← implements IChannelAdapter
    telegram.schemas.ts     ← Zod schemas for Telegram update payloads
  index.ts                  ← AdapterRegistry: maps ChannelName → IChannelAdapter
```

**AdapterRegistry pattern** — resolves the correct adapter at runtime:
```typescript
// src/infrastructure/channels/index.ts
const registry: Record<ChannelName, IChannelAdapter> = {
  whatsapp: new WhatsAppAdapter(env.WHATSAPP_API_TOKEN, env.WHATSAPP_WEBHOOK_SECRET),
  telegram: new TelegramAdapter(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_WEBHOOK_SECRET),
}

export function getAdapter(channel: ChannelName): IChannelAdapter {
  return registry[channel]
}
```

---

### 4. Presentation (`src/presentation/` + `app/`)

Next.js App Router — routes, React components, webhook handlers. **Depends only on Application** (calls use cases, never repositories directly).

**Structure:**
```
app/
  api/
    webhooks/
      whatsapp/route.ts     ← getAdapter('whatsapp'), calls ProcessIncomingMessage
      telegram/route.ts     ← getAdapter('telegram'), calls ProcessIncomingMessage
    leads/route.ts
    context/route.ts        ← calls IngestContextFile
  (dashboard)/
    leads/page.tsx
    conversations/[id]/page.tsx
    settings/
      channels/page.tsx     ← channel activation UI per organization
    page.tsx
```

**Non-negotiable rule**: React components and API routes **never** import from `src/infrastructure/` directly. They receive use case factories via dependency injection or server actions. The sole exception is the webhook route fetching an adapter from the `AdapterRegistry` — this is the only place Infrastructure touches Presentation, and it is limited to the registry lookup.

---

## Main Flows

### Flow 1: Incoming Message (any channel) → AI Response or Human Fallback

```
Webhook POST /api/webhooks/{channel}   ← e.g. /whatsapp or /telegram
  │
  ├─ 1. Identify channel from route param
  ├─ 2. adapter = AdapterRegistry.getAdapter(channel)
  ├─ 3. adapter.verifyWebhookSignature(rawBody, headers)  [HALT if invalid]
  ├─ 4. normalized = adapter.parseIncomingPayload(rawBody)  ← NormalizedMessage
  ├─ 5. Validate normalized message with Zod
  │
  └─ UseCase: ProcessIncomingMessage({ ...normalized, adapter, orgId })
       │
       ├─ 6. CaptureLeadData (upsert lead with channel + channelId)
       ├─ 7. Load conversation history
       ├─ 8. VectorRepository.similarity(content, orgId) → relevant chunks
       ├─ 9. Build prompt: system prompt + chunks + history + user message
       ├─ 10. AIGateway.complete(prompt) → { reply, confidence }
       │
       ├─ [confidence >= threshold]
       │     └─ 11a. Save assistant message
       │            adapter.sendMessage(channelId, reply, orgId)
       │            → dispatched to the originating channel's API
       │
       └─ [confidence < threshold]
             └─ 11b. TriggerHumanFallback
                     Save message with role=human_agent_needed
                     adapter.sendMessage(channelId, fallback_message, orgId)
                     Notify human agents (webhook/email)
```

### Flow 2: Context File Upload → Vector DB

```
POST /api/context (multipart/form-data)
  │
  ├─ 1. Authenticate request (session + organizationId)
  ├─ 2. Validate file type and size (Zod)
  │
  └─ UseCase: IngestContextFile
       │
       ├─ 3. FileParser.parse(buffer, mimeType)
       │     → text chunks (LangChain RecursiveTextSplitter)
       ├─ 4. Embedder.embed(chunks) → float32 vectors
       └─ 5. VectorRepository.upsert(chunks + vectors, orgId)
             → stored in pgvector with orgId filter
```

---

## Adding a New Channel

To add a new messaging channel (e.g. Instagram DM, SMS), the steps are:

1. **Create the adapter** in `src/infrastructure/channels/<channel>/`:
   - Implement `IChannelAdapter` (4 methods)
   - Add Zod schemas for the channel's webhook payload
2. **Register it** in `src/infrastructure/channels/index.ts` (one line)
3. **Add a webhook route** at `app/api/webhooks/<channel>/route.ts` (copy an existing one)
4. **Add env vars** `<CHANNEL>_BOT_TOKEN` and `<CHANNEL>_WEBHOOK_SECRET`
5. **Update** `ChannelName` value object in Domain to include the new value

**Zero changes required** in Application use cases, Domain entities, or any other Infrastructure adapter.

---

## Dependency Rule — Summary

```
✅ Domain         ← no imports
✅ Application    ← imports Domain only (receives IChannelAdapter via DI)
✅ Infrastructure ← imports Application + Domain
✅ Presentation   ← imports Application only
                    (+ AdapterRegistry for webhook route DI bootstrap)

❌ Domain importing anything external
❌ Application importing WhatsAppAdapter or TelegramAdapter directly
❌ Application importing Prisma, fetch, or SDKs
❌ React component importing any Infrastructure class
❌ Webhook route importing pgvector or AI SDKs directly
```
