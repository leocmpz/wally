# Spec - Landing Page do Wally

## Visão Geral
A landing page é uma página estática em Next.js, focada em apresentação e SEO. Não inclui funcionalidades de backend, formulários ou captura de dados. É puramente informativa para posicionar a marca.

## Estrutura da Página
### Componentes Principais
- **Header**: Navegação com links para seções (Sobre, Benefícios, Contato). Usa componentes shadcn/ui como `Button` e `DropdownMenu`.
- **Hero**: Seção principal com título, descrição e imagem. Usa `Card` e `Badge` para destaques.
- **Sobre**: Texto explicativo com headings H1-H3. Usa `Separator` para dividir seções.
- **Benefícios**: Lista com ícones e textos. Usa `Table` ou lista customizada.
- **Como Funciona**: Passos ilustrados. Usa `Tabs` para organizar.
- **Depoimentos**: Cards com quotes. Usa `Card` e `Avatar`.
- **FAQ**: Acordeão com perguntas. Usa `Dialog` ou componente customizado.
- **Footer**: Links e informações. Usa `Separator` e `Button`.

## Design e Implementação
- **Framework**: Next.js 14 App Router, página estática (`/page.tsx`).
- **Estilização**: Tailwind CSS com paleta do design system (violet-600 primary, etc.).
- **Componentes**: Exclusivamente de `@/components/ui` (shadcn/ui).
- **Responsividade**: Mobile-first, usando classes Tailwind.
- **SEO**: Meta tags em `_document.tsx` ou via `next/head`, headings semânticos.

## Requisitos Técnicos
- **Performance**: Carregamento < 3s, otimização de imagens com Next.js Image.
- **Acessibilidade**: Alt texts em imagens, navegação por teclado.
- **Analytics**: Integração com Google Analytics via script em `_app.tsx`.
- **Sem Estado**: Não usa hooks de estado ou API calls.

## Critérios de Aceitação
- Página renderiza corretamente em desktop e mobile.
- Navegação suave entre seções.
- Conteúdo otimizado para SEO (headings, meta tags).
- Sem erros de console ou validação.

## Próximos Passos
- Implementar em `src/pages/index.tsx` (ou `app/page.tsx`).
- Revisar com equipe de design.
- Deploy em Vercel.