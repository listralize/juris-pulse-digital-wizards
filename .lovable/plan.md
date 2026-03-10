

# Auditoria Completa — Landing Page Builder

## Arquitetura Atual

O builder é composto por ~25 arquivos: 1 editor visual (`LandingVisualEditor`), 1 editor legado (`LandingPageEditor`), 1 painel de config (`SectionConfigPanel`), 1 preview (`LandingPreview`), 1 renderer (`LandingPageRenderer`), e 19 componentes de seção individuais. A estrutura é sólida — cada seção é isolada com props tipadas, o editor visual tem undo/redo, preview desktop/mobile, e templates prontos.

---

## Problemas Encontrados

### 1. Código Duplicado: `LandingPageEditor` vs `LandingVisualEditor`

Existem **dois editores completos** fazendo a mesma coisa:
- `LandingPageEditor.tsx` (175 linhas) — editor antigo, lista simples, com `getDefaultConfig` duplicado
- `LandingVisualEditor.tsx` (419 linhas) — editor visual novo, split-pane, com `getDefaultConfig` duplicado

Ambos têm seus próprios `SECTION_TYPES` e `getDefaultConfig`. O editor antigo lista apenas 11 tipos de seção, enquanto o novo tem 19. Isso causa inconsistência: se alguém usa o editor antigo, não consegue adicionar `countdown`, `video`, `numbers`, etc.

**Fix**: Remover `LandingPageEditor.tsx` e unificar tudo no `LandingVisualEditor`. Extrair `SECTION_TYPES` e `getDefaultConfig` para um arquivo compartilhado.

### 2. Código Duplicado: `LandingSectionEditor` vs `SectionConfigPanel`

Mesma situação:
- `LandingSectionEditor.tsx` (226 linhas) — editor antigo, inputs básicos, sem ImagePicker/IconPicker
- `SectionConfigPanel.tsx` (621 linhas) — editor novo, com Accordion, ImagePicker, IconPicker, switches

O `LandingSectionEditor` só suporta 11 tipos e usa URLs em texto puro para imagens. O `SectionConfigPanel` suporta 19 tipos com upload visual.

**Fix**: Remover `LandingSectionEditor.tsx`. O `SectionConfigPanel` já cobre tudo.

### 3. SEO Duplicado: `StepForm.tsx` vs `LandingPageRenderer.tsx`

Ambos injetam meta tags de SEO manualmente com `document.querySelector`. O `StepForm.tsx` tem um hook `useStepFormSEO` mais completo (com JSON-LD). O `LandingPageRenderer.tsx` tem uma versão mais simples sem JSON-LD e sem canonical.

**Fix**: Reusar o `useStepFormSEO` no `LandingPageRenderer`, ou extrair para um hook compartilhado.

### 4. Grid Responsivo Quebrado

Vários componentes usam `gridTemplateColumns: repeat(${cols}, minmax(0, 1fr))` inline sem breakpoints. Em mobile, um grid de 3 ou 4 colunas fica ilegível. Afetados:
- `LandingBenefits` (grid)
- `LandingProblemsGrid`
- `LandingNumbers`
- `LandingTestimonials`
- `LandingFaq` (cards mode)
- `LandingTrustBadges` (card mode)

**Fix**: Usar classes Tailwind responsivas (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) ou aplicar `@media` via style. O grid inline com `cols` deveria ser limitado a `md:` breakpoints.

### 5. `renderSection` Duplicado em 3 Lugares

O switch/case que mapeia `section.type` para componentes existe em:
- `LandingPageRenderer.tsx` (linhas 150-181)
- `LandingPreview.tsx` (linhas 50-73)
- Ambos com a mesma lógica, mas pequenas diferenças (preview passa `onSubmit` fake)

**Fix**: Extrair um `renderLandingSection(section, props)` utilitário compartilhado.

### 6. Formulário Embutido Sem Tracking

O `LandingPageRenderer.handleFormSubmit` salva no Supabase e dispara webhook, mas **não dispara nenhum evento de dataLayer/GTM**. O tracking de conversão (que acabamos de consertar) só funciona para StepForms do tipo quiz, não para landing pages.

**Fix**: Importar e chamar `useStepFormMarketingScripts` ou ao menos fazer `dataLayer.push({ event: 'submit', ... })` no `handleFormSubmit` do renderer.

### 7. Undo/Redo com Bug de Índice

No `LandingVisualEditor`, o `pushHistory` usa `setHistoryIdx(prev => Math.min(prev + 1, 30))` mas o array pode ter menos de 30 itens. O `historyIdx` pode ficar dessincronizado se o array foi "shifted" (quando ultrapassa 30 itens, o `sliced.shift()` remove o primeiro item, mas o índice não é ajustado).

**Fix**: Calcular o índice baseado no tamanho real do array: `setHistoryIdx(sliced.length - 1)`.

### 8. Carousel sem Auto-scroll

Os carousels em `LandingTestimonials` e `LandingTeam` (layout "carousel") são apenas scroll horizontal nativo sem auto-play, sem indicadores de paginação, e sem botões prev/next. Em mobile ficam pouco intuitivos.

**Fix**: Adicionar botões de navegação e auto-scroll opcional (já existe `carouselAutoplay` no step form, pode ser replicado).

### 9. `custom_html` com XSS Potencial (baixo risco)

O `LandingCustomHtml` usa `sanitizeHtml` corretamente, mas o `LandingPageRenderer` não sanitiza — depende do componente filho. Se alguém adicionar um tipo customizado que renderize HTML sem sanitização, há risco. O sistema atual está seguro, mas é frágil.

---

## Melhorias Sugeridas (Novas Features)

### 10. Drag & Drop para Reordenar Seções
Atualmente a reordenação é feita com botões Up/Down. Implementar drag-and-drop na lista de seções do sidebar melhoraria a UX significativamente. O projeto já tem `react-beautiful-dnd` instalado.

### 11. Duplicar Landing Page Inteira
Não existe forma de duplicar uma landing page completa (com todas as seções). Útil para criar variações A/B.

### 12. Seção "Comparação Antes/Depois"
Tipo de seção muito eficaz para conversão jurídica que não existe: tabela de comparação "Sem advogado" vs "Com advogado".

---

## Plano de Implementação (Priorizado)

| # | Tarefa | Impacto | Esforço |
|---|--------|---------|---------|
| 1 | Adicionar tracking GTM/dataLayer ao `LandingPageRenderer.handleFormSubmit` | **Crítico** — conversões de landing pages não são rastreadas | Baixo |
| 2 | Corrigir grid responsivo em 6 componentes de seção | **Alto** — mobile quebrado | Médio |
| 3 | Remover `LandingPageEditor.tsx` e `LandingSectionEditor.tsx` (código morto) | Médio — reduz confusão e manutenção | Baixo |
| 4 | Extrair `SECTION_TYPES`, `getDefaultConfig`, e `renderSection` para arquivos utilitários | Médio — elimina duplicação em 3 arquivos | Médio |
| 5 | Unificar hook de SEO entre StepForm e LandingPageRenderer | Médio — landing pages sem JSON-LD e canonical | Baixo |
| 6 | Fix do bug de undo/redo no `pushHistory` | Baixo — bug edge case | Baixo |
| 7 | Melhorar carousels com navegação e auto-play | Baixo — UX improvement | Médio |

### Arquivos Alterados

| Arquivo | Ação |
|---------|------|
| `src/components/landing/LandingPageRenderer.tsx` | Adicionar dataLayer.push no submit + reusar hook SEO |
| `src/components/landing/landingSectionTypes.ts` | **Novo** — extrair SECTION_TYPES + getDefaultConfig |
| `src/components/landing/renderLandingSection.tsx` | **Novo** — extrair renderSection utilitário |
| `src/components/admin/LandingVisualEditor.tsx` | Importar de utilitários + fix undo/redo |
| `src/components/admin/LandingPreview.tsx` | Importar renderSection compartilhado |
| `src/components/admin/LandingPageEditor.tsx` | **Deletar** |
| `src/components/admin/LandingSectionEditor.tsx` | **Deletar** |
| `src/components/landing/LandingBenefits.tsx` | Fix grid responsivo |
| `src/components/landing/LandingProblemsGrid.tsx` | Fix grid responsivo |
| `src/components/landing/LandingNumbers.tsx` | Fix grid responsivo |
| `src/components/landing/LandingTestimonials.tsx` | Fix grid responsivo |
| `src/components/landing/LandingFaq.tsx` | Fix grid responsivo |
| `src/components/landing/LandingTrustBadges.tsx` | Fix grid responsivo |

