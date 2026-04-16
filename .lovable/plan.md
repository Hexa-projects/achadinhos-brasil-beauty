

# Plano: Header Inteligente (hide/show on scroll) + Melhorias de Conversão

## Resumo

O documento que você compartilhou reforça padrões que já estão implementados (sticky CTA, cart sheet, pulse no botão, accordion no PDP, Google OAuth) e adiciona **um padrão novo importante**: o **header inteligente que desaparece ao rolar para baixo e reaparece ao rolar para cima**. Vou focar nas mudanças concretas que faltam.

## O que já existe na loja

- Sticky CTA no mobile (StickyBuyBar)
- Cart slide-over (CartSheet com shadcn Sheet)
- Pulse animation no botão Comprar
- PDP com galeria swipeable, accordion, reviews, cross-sell, JSON-LD
- Auth page com suporte a Google OAuth
- Zustand cart store com persistência
- Bottom navigation mobile
- Checkout flow com simulação Stripe

## Mudanças a implementar

### 1. Header inteligente (hide on scroll down, show on scroll up)

Criar um hook `useScrollDirection` que detecta a direção do scroll. O Header receberá uma classe CSS que faz `translate-y: -100%` quando o usuário rola para baixo e `translate-y: 0` ao rolar para cima, com transição suave.

**Arquivos:** `src/hooks/useScrollDirection.ts` (novo), `src/components/layout/Header.tsx` (editar)

### 2. Suporte a vídeo/GIF na galeria do PDP

Atualizar `ProductGallery` para renderizar `<video>` quando a URL terminar em `.mp4`/`.webm`, permitindo conteúdo estilo TikTok no PDP. O tipo `NormalizedProduct` já suporta `images: string[]` — basta tratar URLs de vídeo no componente.

**Arquivo:** `src/components/product/ProductGallery.tsx` (editar)

### 3. Campo `droplinkify_id` no tipo Product

Adicionar `droplinkifyId?: string` e `inventoryQuantity?: number` ao tipo `NormalizedProduct` para compatibilidade com o schema Supabase descrito no documento.

**Arquivo:** `src/types/product.ts` (editar)

### 4. Campo `stripeCustomerId` no tipo Profile

Adicionar `stripeCustomerId?: string` ao tipo `Profile`.

**Arquivo:** `src/types/product.ts` (editar)

### 5. Campo `trackingCode` no tipo Order

Adicionar `trackingCode?: string` ao tipo `Order` e `priceAtTime` ao `OrderItem`.

**Arquivo:** `src/types/product.ts` (editar)

---

## Detalhes técnicos

### Hook useScrollDirection
```text
- Usa window scroll event (throttled)
- Compara scrollY atual vs anterior
- Retorna "up" | "down"
- Threshold de ~10px para evitar jitter
```

### Header CSS transition
```text
header {
  transition: transform 0.3s ease;
}
header.hidden-up {
  transform: translateY(-100%);
}
```

### Galeria com vídeo
```text
- Checa extensão da URL (.mp4, .webm, .gif)
- Renderiza <video autoPlay muted loop playsInline> para vídeos
- Renderiza <img> para imagens (comportamento atual)
```

Todas as demais funcionalidades descritas no documento (Stripe Checkout, Supabase Auth, cart Zustand, sticky CTA, slide-over cart, accordion PDP, reviews com fotos, pulse animation) **já estão implementadas**. Este plano cobre apenas o que falta.

