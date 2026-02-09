

# Plano de Otimizacao de Performance e SEO

## Diagnostico: Por que o PageSpeed esta em 7%

Apos analise completa, identifiquei **9 problemas criticos** que destroem a performance:

---

## 1. CRITICO: NeuralBackground WebGL renderizado 10+ vezes simultaneamente

O componente `NeuralBackground` cria um **canvas WebGL com shader de fragmento complexo** (12 iteracoes de loop por pixel) e roda em **60fps no desktop / 30fps no mobile**. Ele e renderizado simultaneamente em:
- Hero, About, PracticeAreas, Partners, ClientArea, Contact, Blog, LinkTree, ServiceLandingLayout, PracticeAreaLayout, PageBanner

Na pagina inicial, **pelo menos 6 instancias** rodam ao mesmo tempo (uma por secao visivel). Cada uma cria um contexto WebGL separado, consumindo GPU e memoria massivamente.

**Solucao:** Renderizar apenas UMA instancia global no `Index.tsx` (ja existe o background fixo). Remover todas as instancias dentro das secoes. Para outras paginas (Blog, LinkTree, etc.), usar lazy loading com `React.lazy`.

---

## 2. CRITICO: Zero Code Splitting - Tudo carregado de uma vez

No `App.tsx`, todas as 12 paginas sao importadas estaticamente. O Admin (painel complexo), Blog, StepForm, etc., sao carregados mesmo quando o usuario so visita a home.

**Solucao:** Usar `React.lazy()` + `Suspense` para todas as rotas exceto Index:
```typescript
const Admin = React.lazy(() => import('./pages/Admin'));
const Blog = React.lazy(() => import('./pages/Blog'));
// etc.
```

---

## 3. CRITICO: Duas fontes Google carregadas de forma bloqueante

No `index.css`, duas fontes sao importadas com `@import url(...)` no topo do CSS -- isso e **render-blocking**:
- Inter (5 pesos)
- Space Grotesk (5 pesos)

Alem disso, no `index.html` ha uma terceira fonte (Satoshi via fontshare).

**Solucao:** 
- Mover as fontes para `<link rel="preload">` no `index.html` com `display=swap`
- Remover os `@import` do CSS
- Usar `font-display: swap` para evitar FOIT (Flash of Invisible Text)

---

## 4. CRITICO: CSS Destrutivo - Regras que quebram tudo

No `index.css` ha regras extremamente danosas:
- Linha 557: `* { cursor: auto !important; }` -- aplica a TODOS os elementos
- Linha 636: `* { background-image: none !important; }` -- **DESTROI todas as imagens de fundo de TODOS os componentes**
- Linha 111: `body { cursor: none; }` -- esconde o cursor (depois sobrescrito)
- Linhas 661-671: `#home *, #home *::before, #home *::after { background-color: transparent !important; backdrop-filter: none !important; background-image: none !important; box-shadow: none !important; }` -- nucleares, destroem estilos do Hero

**Solucao:** Remover todas essas regras destrutivas. Usar classes CSS especificas em vez de seletores universais.

---

## 5. IMPORTANTE: Imagens sem otimizacao

- Logo no Hero: sem `width`/`height` (causa CLS - Cumulative Layout Shift)
- Nenhuma imagem usa `loading="lazy"`
- Sem `srcset` para diferentes tamanhos de tela
- Imagens servidas sem dimensoes explicitas

**Solucao:** Adicionar `width`, `height`, `loading="lazy"`, e `decoding="async"` em todas as imagens. Para o LCP (Largest Contentful Paint -- a logo do Hero), usar `fetchpriority="high"`.

---

## 6. IMPORTANTE: Multiplas queries Supabase independentes no load

Cada secao faz sua propria query ao Supabase no mount:
- Hero: `site_settings`
- About: `site_settings`
- FloatingFooter: `footer_info` + `contact_info`
- WhatsAppButton: `contact_info`
- PracticeAreas: via `useSupabaseDataNew` + `useSupabaseLawCategories`
- Contact: `contact_info`

**Total: ~8-10 queries paralelas** ao Supabase no primeiro load.

**Solucao:** Consolidar num unico hook `useSiteData()` que faz UMA query e distribui os dados via React Context. As secoes consomem do context em vez de fazer queries individuais.

---

## 7. IMPORTANTE: GSAP importado globalmente

`gsap` + `ScrollTrigger` + `ScrollToPlugin` sao importados e registrados em multiplos arquivos (Index, Hero, About, PracticeAreas, SectionsContainer). GSAP e uma biblioteca pesada (~30KB gzipped).

**Solucao:** Import dinamico de GSAP apenas quando necessario. No mobile, onde as animacoes sao minimas, nao carregar GSAP.

---

## 8. SEO: Meta tags insuficientes e sem dados estruturados

O `index.html` tem meta tags basicas mas falta:
- Dados estruturados (JSON-LD) para escritorio de advocacia
- `<link rel="canonical">`
- Meta tags de idioma
- Sitemap referencia
- Performance hints (`dns-prefetch`, `preconnect`)

**Solucao:** Adicionar JSON-LD schema para `LegalService` / `Attorney`, preconnect para Supabase e fontes, canonical URL.

---

## 9. MODERADO: console.logs em producao (ainda restantes)

Apesar da refatoracao anterior, multiplos arquivos ainda tem `console.log` diretos (SectionsContainer, useSectionTransition, Hero, About, Navbar, etc.).

**Solucao:** Substituir todos por `logger` utility.

---

## Plano de Implementacao

### Fase 1: Impacto Maximo (Performance Core)

1. **Code splitting com React.lazy** em `App.tsx` -- todas as rotas exceto Index
2. **Remover NeuralBackground duplicado** -- manter apenas 1 instancia global no Index, lazy load em outras paginas
3. **Remover CSS destrutivo** -- eliminar `* { background-image: none !important }`, `* { cursor: auto !important }`, regras nucleares do `#home`
4. **Otimizar fontes** -- preload no HTML, remover @import do CSS, font-display: swap

### Fase 2: Otimizacao de Recursos

5. **Consolidar queries Supabase** -- criar `useSiteData` context com uma unica query para `site_settings` + `contact_info`
6. **Otimizar imagens** -- width/height, loading="lazy", fetchpriority="high" para LCP
7. **Lazy load GSAP** -- import dinamico, skip no mobile

### Fase 3: SEO

8. **Adicionar JSON-LD** schema para escritorio de advocacia
9. **Preconnect/DNS-prefetch** para Supabase e CDNs de fontes
10. **Canonical URL** e meta tags melhoradas
11. **Remover console.logs restantes**

---

## Detalhes Tecnicos

### Impacto Estimado por Mudanca

| Mudanca | Impacto no PageSpeed |
|---------|---------------------|
| Code splitting | +15-20 pontos |
| Remover NeuralBackground duplicado | +10-15 pontos |
| Otimizar fontes (preload + swap) | +5-10 pontos |
| Remover CSS destrutivo | +5 pontos |
| Otimizar imagens (CLS) | +5-10 pontos |
| Consolidar queries | +3-5 pontos |
| JSON-LD / SEO | +5-10 pontos (SEO score) |

### Riscos

- O NeuralBackground global pode ter aparencia ligeiramente diferente vs individual por secao -- mas sera melhor pois nao tera multiplos shaders competindo
- Code splitting adiciona um breve loading state nas rotas -- mitigado com Suspense fallback elegante
- Remover CSS destrutivo pode revelar estilos que estavam "escondidos" -- sera necessario verificar visualmente

### Arquivos Modificados

- `src/App.tsx` -- code splitting
- `src/index.css` -- remover regras destrutivas, remover @import de fontes
- `index.html` -- preload fontes, preconnect, JSON-LD, meta tags
- `src/pages/Index.tsx` -- NeuralBackground global unico
- `src/components/sections/Hero.tsx` -- remover NeuralBackground, otimizar imagem
- `src/components/sections/About.tsx` -- remover NeuralBackground
- `src/components/sections/PracticeAreas.tsx` -- remover NeuralBackground
- `src/components/sections/Partners.tsx` -- remover NeuralBackground
- `src/components/sections/ClientArea.tsx` -- remover NeuralBackground
- `src/components/sections/Contact.tsx` -- remover NeuralBackground
- `src/components/SectionsContainer.tsx` -- remover console.logs
- `src/hooks/useSectionTransition.tsx` -- remover console.logs
- `src/components/navbar/index.tsx` -- remover console.logs

