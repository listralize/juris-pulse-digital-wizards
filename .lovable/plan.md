

# Corrigir Scroll Mobile e Otimizar Performance

## Problemas Identificados

Apos analise completa, ha **5 problemas criticos** que impedem o scroll no mobile e causam lentidao:

### 1. NeuralBackground WebGL roda no mobile
Em `Index.tsx` linha 113: `{isDark && <NeuralBackground />}` -- nao ha verificacao de mobile. O shader WebGL roda a 30fps no celular, consumindo toda a GPU e travando o scroll.

### 2. CSS com `!important` conflitantes bloqueiam scroll
No `index.css`:
- Linha 96: `html { overflow: auto !important; }` 
- Linha 108: `body { overflow: auto !important; }`
- Linha 128-129: `html, body { overflow: auto !important; height: auto !important; }`

Esses `!important` conflitam com os estilos inline que o `Index.tsx` tenta aplicar via JS (linhas 34-56). No desktop, o JS seta `overflow: hidden` mas o CSS sobrescreve com `overflow: auto !important`. No mobile, ambos tentam `auto` mas o conflito cria re-renders.

### 3. `* { scroll-behavior: smooth }` aplica a TODOS os elementos
Linha 166-168 do CSS aplica `scroll-behavior: smooth` em cada elemento do DOM. Isso forca o browser a calcular smooth scroll para todos os 500+ elementos da pagina, destruindo a performance do scroll nativo.

### 4. GSAP carregado e registrado no mobile sem necessidade
`Index.tsx` importa e registra `gsap`, `ScrollTrigger`, e `ScrollToPlugin` mesmo no mobile onde nao sao usados. O `useSectionTransition` tambem chama `gsap.set()` no mobile (linha 64).

### 5. `will-change: transform` em elementos demais
Multiplos componentes CSS (`premium-card`, `btn-primary`, `btn-secondary`) usam `will-change: transform`, criando compositor layers desnecessarios que consomem memoria no mobile.

---

## Solucoes

### 1. Nao renderizar NeuralBackground no mobile/tablet
Adicionar verificacao `!(isMobile || isTablet)` antes de renderizar o componente WebGL.

### 2. Limpar CSS conflitante
- Remover os `overflow: auto !important` e `height: auto !important` globais das linhas 92-138
- Manter apenas a configuracao basica sem `!important`
- Deixar o JS do Index.tsx controlar overflow conforme dispositivo

### 3. Corrigir scroll-behavior
- Remover `* { scroll-behavior: smooth }` (linha 166-168)
- Manter `scroll-behavior: smooth` apenas no `html` (ja existe na linha 97)

### 4. Lazy load GSAP no mobile
- No Index.tsx, nao importar nem registrar GSAP no top-level
- No useSectionTransition, pular `gsap.set()` no mobile

### 5. Remover will-change excessivo
- Remover `will-change: transform` dos componentes CSS que nao precisam
- Manter apenas em elementos que realmente animam (container de secoes no desktop)

---

## Arquivos Modificados

| Arquivo | Mudanca |
|---------|---------|
| `src/pages/Index.tsx` | Nao renderizar NeuralBackground no mobile; remover import estatico de GSAP |
| `src/index.css` | Remover `!important` conflitantes; remover `* { scroll-behavior }` ; remover `will-change` excessivo |
| `src/hooks/useSectionTransition.tsx` | Pular GSAP no mobile |
| `src/components/Section.tsx` | Simplificar estilos mobile; remover console.log |

## Impacto Esperado
- Scroll mobile fluido e responsivo
- Reducao de ~50% no uso de GPU no mobile (sem WebGL)
- Sem conflitos CSS que bloqueiam scroll
- Nenhuma mudanca visual ou funcional no desktop
