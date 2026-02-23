# Design System — Wally

---

## Color Palette

All colors use **Tailwind CSS utility classes**. Hex values are never used inline.

### Semantic Tokens

| Token | Dark Mode Class | Light Mode Class | Usage |
|---|---|---|---|
| Primary | `bg-violet-600` | `bg-violet-600` | Buttons, active states, brand accent |
| Primary text | `text-violet-600` | `text-violet-600` | Links, highlights |
| Primary border | `border-violet-600` | `border-violet-600` | Focus rings, selected states |
| Success / Active lead | `bg-emerald-500` | `bg-emerald-500` | Active conversations, converted leads |
| Warning / Fallback | `bg-amber-400` | `bg-amber-400` | Human fallback indicator, pending states |
| Destructive | `bg-red-500` | `bg-red-500` | Errors, lost leads, delete actions |
| Background | `bg-zinc-950` | `bg-white` | Page background |
| Surface / Card | `bg-zinc-900` | `bg-zinc-50` | Cards, panels, sidebars |
| Text primary | `text-zinc-50` | `text-zinc-900` | Headings, body text |
| Text secondary | `text-zinc-400` | `text-zinc-400` | Labels, captions, placeholders |
| Border | `border-zinc-800` | `border-zinc-200` | Dividers, input borders |

---

## Components

### Rule: Always Use shadcn/ui

All UI components come from `@/components/ui` (shadcn/ui). Never create generic UI primitives from scratch when a shadcn/ui equivalent exists.

```
✅ import { Button } from '@/components/ui/button'
✅ import { Card, CardContent, CardHeader } from '@/components/ui/card'
✅ import { Badge } from '@/components/ui/badge'
✅ import { Dialog, DialogContent } from '@/components/ui/dialog'

❌ const MyButton = ({ children }) => <button className="...">{children}</button>
```

### Available Components

`Button` `Card` `CardContent` `CardHeader` `CardTitle` `Badge` `Table` `TableRow` `TableCell` `Dialog` `DialogContent` `Sheet` `Input` `Textarea` `Select` `Tabs` `TabsContent` `Avatar` `Skeleton` `Separator` `DropdownMenu` `Toast`

---

## Lead Status Badges

Use the `Badge` component with these exact variants to represent lead lifecycle states:

| Lead Status | Badge Variant | Example |
|---|---|---|
| `new` | `default` | `<Badge>Novo</Badge>` |
| `in_progress` | `secondary` | `<Badge variant="secondary">Em atendimento</Badge>` |
| `fallback` | `outline` | `<Badge variant="outline">Fallback</Badge>` |
| `lost` | `destructive` | `<Badge variant="destructive">Perdido</Badge>` |
| `converted` | custom `emerald` | `<Badge className="bg-emerald-500 text-white">Convertido</Badge>` |

---

## Spacing

Follow the Tailwind 4px-base scale. Never use arbitrary values.

| Scale | Class | px |
|---|---|---|
| xs | `p-1` / `gap-1` | 4px |
| sm | `p-2` / `gap-2` | 8px |
| md | `p-3` / `gap-3` | 12px |
| base | `p-4` / `gap-4` | 16px |
| lg | `p-6` / `gap-6` | 24px |
| xl | `p-8` / `gap-8` | 32px |

```
✅ className="p-4 gap-6"
❌ className="p-[13px] gap-[22px]"
```

---

## Typography

| Element | Classes |
|---|---|
| Page title (h1) | `text-2xl font-semibold text-zinc-50` |
| Section title (h2) | `text-lg font-semibold text-zinc-50` |
| Card title | `text-base font-semibold text-zinc-50` |
| Body text | `text-sm text-zinc-50` |
| Label / caption | `text-sm text-zinc-400` |
| Monospace / code | `font-mono text-xs text-zinc-400` |

Base font: `font-sans` (Inter, loaded via Tailwind/Next.js font optimization).

---

## Layout Patterns

### Dashboard Shell

```
┌──────────────────────────────────────────────┐
│  Sidebar (w-64, bg-zinc-900, border-r)        │
│  ┌────────────────────────────────────────┐   │
│  │  Logo + Nav items (text-zinc-400       │   │
│  │  hover:text-zinc-50 hover:bg-zinc-800) │   │
│  └────────────────────────────────────────┘   │
├──────────────────────────────────────────────┤
│  Main content (flex-1, bg-zinc-950, p-8)      │
│  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Card        │  │  Card                │   │
│  │  bg-zinc-900 │  │  bg-zinc-900         │   │
│  └──────────────┘  └──────────────────────┘   │
└──────────────────────────────────────────────┘
```

### Conversation Panel

```
┌─────────────────────────────────────┐
│  Lead info header (p-4, border-b)   │
├─────────────────────────────────────┤
│  Message list (flex-col, gap-3,     │
│  overflow-y-auto, p-4)              │
│                                     │
│  [User bubble: bg-zinc-800, right]  │
│  [AI bubble: bg-violet-600/20, left]│
│  [Human bubble: bg-amber-400/20]    │
├─────────────────────────────────────┤
│  Input area (p-4, border-t)         │
│  [Textarea] [Send Button]           │
└─────────────────────────────────────┘
```

---

## Do / Don't

| Do | Don't |
|---|---|
| `text-violet-600` | `style={{ color: '#7c3aed' }}` |
| `bg-zinc-900` | `bg-[#18181b]` |
| `<Badge variant="destructive">` | `<span className="text-red-500">` |
| `gap-4` | `gap-[15px]` |
| `font-semibold` | `font-weight: 600` inline |
