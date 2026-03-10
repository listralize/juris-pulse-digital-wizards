

# Redesign Completo — Landing Page Divórcio

## Problemas Atuais

1. **Marquee com lag** — usa CSS `translateX(-33.333%)` com duplicação de texto em spans, causa jank. Precisa usar `will-change: transform` e GPU acceleration
2. **Copy genérica** — textos parecem gerados por IA ("Não prolongue o sofrimento", "Diferenciais que fazem toda a diferença"). Precisa de copy mais direta, curta e humana
3. **UX de cores monótona** — tudo é `#0f0f1a` + `#15152a` alternando, com dourado `#c9a44a` em tudo. Sem contraste visual entre seções
4. **Design genérico** — todos os cards são `rounded-2xl` com `opacity-70`, sem hierarquia visual clara. Parece template, não landing page profissional

## Plano

### 1. Fix Marquee — performance (LandingBannerMarquee.tsx)
- Adicionar `will-change: transform` e `transform: translateZ(0)` para GPU compositing
- Usar `translate3d` no keyframe ao invés de `translateX`
- Reduzir duplicações desnecessárias

### 2. Redesign visual dos componentes de seção
Atualizar os seguintes componentes com design mais limpo e moderno:

**LandingHero.tsx** — layout split mais elegante:
- Badge com bordas finas ao invés de fundo colorido
- Headline com `leading-[1.1]` mais apertado
- Subheadline menor e mais sutil (max 2 linhas)
- CTAs com hover sutil, sem `shadow-lg` excessivo

**LandingTrustBadges.tsx** — mais discreto:
- Estilo minimalista com separadores `|` entre items
- Sem backgrounds coloridos nos pills

**LandingProblemsGrid.tsx** — cards com borda sutil:
- Remover fundo colorido dos cards, usar apenas borda fina
- Ícones menores e mais discretos

**LandingComparison.tsx** — design mais limpo:
- Cards sem backgrounds vermelhos/verdes fortes
- Usar ícones X e Check com cores sutis
- Borda fina, tipografia mais clean

**LandingNumbers.tsx** — números maiores, labels menores:
- Sem cards/shadows, layout clean horizontal
- Números extragrandes com weight 800

**LandingTestimonials.tsx** — aspas tipográficas:
- Usar `"` grande decorativa ao invés de aspas no texto
- Cards com borda sutil, sem fundos coloridos

**LandingCtaBanner.tsx** — mais impactante:
- Gradiente mais suave
- Tipografia maior, menos elementos

**LandingGuarantee.tsx** — mais elegante:
- Badge com borda ao invés de círculo com fundo
- Layout horizontal ao invés de empilhado

**LandingEmbeddedForm.tsx** — form mais profissional:
- Inputs com borda sutil, sem shadows pesados
- Labels mais discretos

### 3. Reescrever copy do template (divorcioLandingTemplate.ts)
Copy mais curta, direta e humana:
- Hero: "Resolva seu divórcio. Sem burocracia." (ao invés do texto longo atual)
- Subheadline: 1 frase apenas
- Títulos de seção: 3-5 palavras max
- Descrições: 1 frase curta por item
- Remover exclamações e tom dramático ("Não Sofra Mais")

### 4. Paleta de cores refinada no template
- Manter escuro mas com mais variação: `#0c0c14` / `#12121f` / `#1a1a2e`
- Primary mais sofisticado: `#b8963e` (dourado menos saturado)
- Seção de números com fundo sólido escuro ao invés de dourado gritante
- CTA Banner com gradiente sutil de dourado para âmbar

## Arquivos Alterados

| Arquivo | Mudança |
|---------|---------|
| `src/components/landing/LandingBannerMarquee.tsx` | Fix performance GPU + design mais limpo |
| `src/components/landing/LandingHero.tsx` | Tipografia mais apertada, design mais clean |
| `src/components/landing/LandingTrustBadges.tsx` | Estilo minimalista |
| `src/components/landing/LandingProblemsGrid.tsx` | Cards com borda sutil |
| `src/components/landing/LandingComparison.tsx` | Design mais limpo sem cores fortes |
| `src/components/landing/LandingNumbers.tsx` | Layout clean, números grandes |
| `src/components/landing/LandingTestimonials.tsx` | Aspas decorativas, cards limpos |
| `src/components/landing/LandingCtaBanner.tsx` | Gradiente suave |
| `src/components/landing/LandingGuarantee.tsx` | Layout horizontal elegante |
| `src/components/landing/LandingEmbeddedForm.tsx` | Form profissional |
| `src/data/divorcioLandingTemplate.ts` | Copy reescrita + paleta refinada |

