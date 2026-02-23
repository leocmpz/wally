# Security Policy — Wally

> These rules are non-negotiable. Every line of code generated for this project must comply with them. OWASP Top 10 + LGPD alignment.

---

## A01 — Broken Access Control

**Multi-tenancy isolation is mandatory on every query.**

Every database query that touches tenant data MUST filter by `organizationId`. There are no exceptions.

```typescript
// ✅ Always filter by organizationId
const leads = await prisma.lead.findMany({
  where: { organizationId: session.user.organizationId }
})

// ❌ Never query without tenant scope
const leads = await prisma.lead.findMany()
```

- Every authenticated route MUST verify that the requested resource belongs to the authenticated tenant before returning or mutating data.
- Never expose internal database IDs in public URLs — always use UUIDs (`cuid()` or `uuid()` in Prisma schema).
- Admin routes must check `role === 'admin'` in addition to authentication.

---

## A02 — Cryptographic Failures / Sensitive Data (+ LGPD)

**Lead data (name, phone, conversation history) is personal data under LGPD.**

- Never log PII (names, phone numbers, message content) in plaintext to console or external logging services.
- Conversations must have a configurable TTL (default: **90 days**). Implement a scheduled cleanup job.
- Passwords (if any) must use **bcrypt** with cost factor ≥ 12. Never MD5/SHA1.
- Database connections must use TLS (`?sslmode=require` in `DATABASE_URL`).
- Files uploaded by users (context documents) must be stored in Supabase Storage with private bucket access, not public URLs.

```typescript
// ✅ Safe logging — omit PII
logger.info('Message processed', { conversationId, confidence, orgId })

// ❌ Never log message content or phone numbers
logger.info('Message received', { phone, content, leadName })
```

---

## A03 — Injection

### SQL Injection
Never concatenate strings for queries. Always use Prisma ORM with typed parameters.

```typescript
// ✅ Prisma parameterized query
await prisma.lead.findFirst({ where: { phone, organizationId } })

// ❌ Raw string interpolation
await prisma.$queryRaw`SELECT * FROM leads WHERE phone = '${phone}'`
```

### AI Prompt Injection
User message content must be sanitized before interpolation into AI prompts. Treat all user input as untrusted.

```typescript
// ✅ Sanitized user content in prompt
const sanitized = sanitizeForPrompt(message.content)
const prompt = `${systemPrompt}\n\nUser: ${sanitized}`

// ❌ Direct interpolation of raw user input
const prompt = `${systemPrompt}\n\nUser: ${message.content}`
```

Sanitization must: strip control characters, limit length (max 4000 chars per message), and escape any prompt-injection patterns (e.g., "Ignore previous instructions").

### Input Validation (all API endpoints)
Every request body MUST be validated with a Zod schema before any processing.

```typescript
// ✅ Validate before use
const body = await request.json()
const parsed = incomingMessageSchema.safeParse(body)
if (!parsed.success) {
  return Response.json({ error: 'Invalid payload' }, { status: 400 })
}

// ❌ Never use unvalidated input
const { phone, content } = await request.json()
```

---

## A07 — Authentication and Session Failures

### Channel Webhook Security

**Each channel adapter MUST implement its own `verifyWebhookSignature` method** and must be called as the first operation before any payload parsing or business logic.

**Rule: one webhook route per channel — never share endpoints.**
```
✅ POST /api/webhooks/whatsapp  ← WhatsAppAdapter.verifyWebhookSignature()
✅ POST /api/webhooks/telegram  ← TelegramAdapter.verifyWebhookSignature()

❌ POST /api/webhooks           ← single endpoint for all channels (forbidden)
❌ POST /api/webhooks?channel=whatsapp
```

**WhatsApp — HMAC-SHA256 (Meta):**
```typescript
// WhatsAppAdapter.verifyWebhookSignature()
verifyWebhookSignature(rawBody: string, headers: Record<string, string>): boolean {
  const signature = headers['x-hub-signature-256'] ?? ''
  const expected = crypto
    .createHmac('sha256', env.WHATSAPP_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(`sha256=${expected}`),
    Buffer.from(signature)
  )
}
```

**Telegram — Secret Token header:**
```typescript
// TelegramAdapter.verifyWebhookSignature()
verifyWebhookSignature(_rawBody: string, headers: Record<string, string>): boolean {
  const token = headers['x-telegram-bot-api-secret-token'] ?? ''
  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(env.TELEGRAM_WEBHOOK_SECRET)
  )
}
```

**Session Cookies:**
- Never store session tokens in `localStorage` or `sessionStorage`.
- Session cookies must have: `HttpOnly; Secure; SameSite=Strict`.
- Use NextAuth.js with JWT strategy or database sessions — never roll custom auth.

**API Keys and Secrets:**
- Never commit secrets to source control.
- Never hardcode API keys, even in tests (use test environment variables).
- All required secrets must be in `.env.local` (local) and Vercel environment variables (production).

---

## Rate Limiting

All public-facing endpoints must have rate limiting. Use Vercel's built-in rate limiting or an `upstash/ratelimit` middleware.

| Endpoint | Limit |
|---|---|
| `POST /api/webhooks/whatsapp` | 100 req/min per IP |
| `POST /api/webhooks/telegram` | 100 req/min per IP |
| `POST /api/context` | 10 req/min per organization |
| `GET /api/leads` | 60 req/min per organization |
| Auth endpoints | 10 req/min per IP |

When new channel adapters are added, their webhook routes must be included in the rate limiting configuration before going to production.

---

## Required Environment Variables

These variables MUST exist in all environments. The app must fail to start if any are missing (validated via `src/config/env.ts`).

**Channel — WhatsApp:**

| Variable | Purpose |
|---|---|
| `WHATSAPP_API_TOKEN` | Meta Cloud API bearer token |
| `WHATSAPP_WEBHOOK_SECRET` | HMAC-SHA256 webhook signature verification |

**Channel — Telegram:**

| Variable | Purpose |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Telegram Bot API token (from @BotFather) |
| `TELEGRAM_WEBHOOK_SECRET` | Secret token sent with every Telegram update |

**Core:**

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API access |
| `DATABASE_URL` | PostgreSQL connection string (must include `?sslmode=require`) |
| `NEXTAUTH_SECRET` | NextAuth.js session signing (min 32 chars) |
| `NEXTAUTH_URL` | Canonical app URL |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |

**Rule for future channels**: every new channel adapter requires its own `<CHANNEL>_BOT_TOKEN` and `<CHANNEL>_WEBHOOK_SECRET` env vars — never reuse secrets across channels.

Variables suffixed with `_KEY`, `_SECRET`, or `_TOKEN` must never appear in client-side bundles (`NEXT_PUBLIC_` prefix is forbidden for these).

---

## Security Checklist (pre-deploy)

- [ ] All API routes validate input with Zod
- [ ] WhatsApp webhook verifies HMAC-SHA256 (`x-hub-signature-256`)
- [ ] Telegram webhook verifies secret token (`x-telegram-bot-api-secret-token`)
- [ ] Each channel has its own dedicated webhook route (no shared endpoints)
- [ ] All DB queries filter by `organizationId`
- [ ] No secrets in source code or git history
- [ ] Session cookies are HttpOnly + Secure + SameSite=Strict
- [ ] Rate limiting is active on all webhook and public API routes
- [ ] PII is not logged in plaintext
- [ ] User message content is sanitized before AI prompt injection
- [ ] UUIDs used in all public-facing resource URLs
- [ ] `env.ts` validates all required variables at startup
- [ ] New channel adapters added to the rate limiting config before deploy
