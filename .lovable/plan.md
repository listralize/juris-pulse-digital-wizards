

# Plano: Upgrade Profissional do Landing Page Builder

## Problemas Identificados

### Bugs Críticos
1. **Overlay não funciona**: No `SectionWrapper`, o overlay só aparece se `bgImage && overlayColor` — ambos precisam existir. Se você quer overlay sem imagem de fundo (ex: cor de fundo + overlay escuro), não funciona. Além disso, o `hasCustomStyle` retorna o children sem wrapper se só tiver overlay color sem bg image.

2. **Cor de fundo da seção ausente**: O painel "Estilo da Seção" não tem campo para cor de fundo sólida da seção (separado do bg image). Você só consegue usar imagem de fundo, não cor.

3. **Estilos não aplicados sem bg image**: O early-return `if (!hasCustomStyle)` ignora padding/altura/largura customizados se nenhum dos campos "visuais" estiver preenchido de forma diferente do default.

### Limitações de UX/Design
- Sem controle de **cor de fundo da seção** (sólida ou gradiente)
- Sem **espaçador/divisor** entre seções
- Sem controle de **alinhamento de texto** (esquerda/centro/direita)
- Sem **animação on/off** por seção
- Sem **bordas customizáveis** (cor, espessura)
- Sem nova seção tipo **Comparação** (antes/depois, com/sem advogado)
- Sem nova seção tipo **Divider/Spacer**
- Sem nova seção tipo **Marquee/Banner** rotativo

## Plano de Implementação

### 1. Corrigir SectionWrapper (overlay + estilos universais)
**Arquivo**: `src/components/landing/renderLandingSection.tsx`
- Remover o early-return `if (!hasCustomStyle)` — sempre aplicar o wrapper
- Permitir overlay sem bg image (overlay funciona com cor de fundo sólida também)
- Adicionar suporte a `section_bg_color` (cor sólida) e `section_bg_gradient` (gradiente CSS)
- Adicionar `section_text_align` (left/center/right)
- Adicionar `section_border_color` e `section_border_width`
- Adicionar `section_animate` toggle (framer-motion fade-in)

### 2. Expandir painel "Estilo da Seção" universal
**Arquivo**: `src/components/admin/SectionConfigPanel.tsx`
Novos campos no accordion universal:
- **Cor de fundo** (color picker) — `section_bg_color`
- **Gradiente** (dois color pickers + direção) — `section_bg_gradient`
- **Alinhamento de texto** (select: left/center/right) — `section_text_align`
- **Borda** (cor + espessura) — `section_border_color`, `section_border_width`
- **Animação** (switch on/off) — `section_animate`
- Mover overlay para fora do condicional de bg image (overlay funciona com qualquer fundo)

### 3. Adicionar 3 novos tipos de seção

#### a) `divider` — Divisor/Espaçador
- Linha horizontal, espaço em branco, ou decorativo (onda, diagonal)
- Config: `height`, `style` (line/space/wave/diagonal), `color`

#### b) `comparison` — Tabela de Comparação
- Duas colunas: "Sem Advogado" vs "Com Advogado" (ou customizável)
- Config: `title`, `left_title`, `right_title`, `items[]` com `left_text` e `right_text`
- Design: coluna esquerda vermelha/negativa, coluna direita verde/positiva

#### c) `banner_marquee` — Banner Rotativo
- Texto correndo horizontalmente (estilo ticker)
- Config: `texts[]`, `speed`, `background_color`, `text_color`

### 4. Atualizar tipos e defaults
**Arquivo**: `src/types/stepFormTypes.ts` — adicionar novos tipos ao union
**Arquivo**: `src/components/landing/landingSectionTypes.ts` — adicionar defaults + SECTION_TYPES para os 3 novos
**Arquivo**: `src/components/admin/LandingVisualEditor.tsx` — adicionar 3 novos ao SECTION_TYPES com ícones

### 5. Criar componentes das novas seções
- `src/components/landing/LandingDivider.tsx`
- `src/components/landing/LandingComparison.tsx`
- `src/components/landing/LandingBannerMarquee.tsx`

### 6. Registrar nos renderers
**Arquivo**: `src/components/landing/renderLandingSection.tsx` — adicionar cases
**Arquivo**: `src/components/admin/SectionConfigPanel.tsx` — adicionar editors para os 3 novos tipos

## Arquivos Alterados

| Arquivo | Ação |
|---------|------|
| `src/components/landing/renderLandingSection.tsx` | Fix wrapper + novos estilos + 3 novos cases |
| `src/components/admin/SectionConfigPanel.tsx` | Expandir painel universal + 3 novos editors |
| `src/components/landing/landingSectionTypes.ts` | Adicionar defaults + SECTION_TYPES dos 3 novos |
| `src/components/admin/LandingVisualEditor.tsx` | Adicionar 3 novos ao menu de seções |
| `src/types/stepFormTypes.ts` | Adicionar 3 novos tipos ao union type |
| `src/components/landing/LandingDivider.tsx` | **Novo** |
| `src/components/landing/LandingComparison.tsx` | **Novo** |
| `src/components/landing/LandingBannerMarquee.tsx` | **Novo** |

