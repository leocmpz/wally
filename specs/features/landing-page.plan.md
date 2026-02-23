# Plan - Implementação da Landing Page do Wally

## Visão Geral
Este plano detalha a implementação da landing page estática do Wally, baseada na spec validada. A página será desenvolvida em Next.js 14 App Router, focando em SEO, design responsivo e uso de componentes shadcn/ui. Não inclui backend ou funcionalidades interativas.

## Arquivos a Serem Criados ou Editados

### 1. Layout e Configuração Global
- **Arquivo:** `src/app/layout.tsx` (editar se existir, ou criar)
  - Adicionar meta tags globais, Google Analytics script, e layout base.
- **Arquivo:** `src/app/_document.tsx` (criar se não existir)
  - Configurar `<Head>` para SEO global (charset, viewport).

### 2. Página Principal
- **Arquivo:** `src/app/page.tsx` (criar)
  - Implementar a estrutura completa da landing page com todas as seções (Header, Hero, Sobre, Benefícios, Como Funciona, Depoimentos, FAQ, Footer).
  - Usar componentes shadcn/ui: `Button`, `Card`, `Badge`, `Table`, `Dialog`, `Input`, `Textarea`, `Select`, `Tabs`, `Avatar`, `Skeleton`, `Separator`, `DropdownMenu`, `Toast`.

### 3. Componentes Customizados (se necessário)
- **Arquivo:** `src/components/landing/HeroSection.tsx` (criar)
  - Componente para a seção Hero.
- **Arquivo:** `src/components/landing/BenefitsSection.tsx` (criar)
  - Componente para benefícios.
- **Arquivo:** `src/components/landing/HowItWorksSection.tsx` (criar)
  - Componente para "Como Funciona".
- **Arquivo:** `src/components/landing/TestimonialsSection.tsx` (criar)
  - Componente para depoimentos.
- **Arquivo:** `src/components/landing/FAQSection.tsx` (criar)
  - Componente para FAQ.
- **Arquivo:** `src/components/landing/Header.tsx` (criar)
  - Componente para cabeçalho.
- **Arquivo:** `src/components/landing/Footer.tsx` (criar)
  - Componente para rodapé.

### 4. Estilos e Assets
- **Arquivo:** `public/images/` (criar diretório e adicionar imagens)
  - Adicionar imagens para hero, ícones de benefícios, etc.
- **Arquivo:** `src/styles/globals.css` (editar se existir)
  - Adicionar estilos customizados se necessário, mas priorizar Tailwind.

### 5. Configuração de Build e Deploy
- **Arquivo:** `next.config.js` (editar se existir)
  - Configurar otimizações de imagem e SEO.
- **Arquivo:** `package.json` (editar)
  - Garantir dependências: next, react, tailwindcss, shadcn/ui.

## Ordem Lógica de Execução

1. **Setup Inicial:**
   - Verificar se o projeto Next.js está configurado com App Router.
   - Instalar dependências necessárias (shadcn/ui, tailwindcss) via pnpm.

2. **Configuração Global:**
   - Editar/criar `layout.tsx` para incluir layout base e analytics.
   - Criar `_document.tsx` para meta tags.

3. **Criar Componentes Individuais:**
   - Desenvolver componentes customizados (Header, Hero, etc.) um por um, testando responsividade.

4. **Montar Página Principal:**
   - Criar `page.tsx` e integrar todos os componentes.
   - Adicionar conteúdo estático (textos, imagens).

5. **Otimização e Testes:**
   - Verificar performance (< 3s), SEO (headings, meta tags), acessibilidade.
   - Testar em desktop e mobile.

6. **Deploy:**
   - Deploy em Vercel, verificar carregamento e analytics.

## Critérios de Conclusão
- Página carrega corretamente sem erros.
- Todas as seções da spec implementadas.
- Design responsivo e alinhado ao design system.
- SEO otimizado para palavras-chave alvo.</content>
<parameter name="filePath">c:\workspace\wally\specs\features\landing-page.plan.md