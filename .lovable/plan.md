
# Auditoria Landing Page Builder — Concluída

## Alterações Realizadas

### 1. ✅ Tracking GTM no LandingPageRenderer
- Adicionado `dataLayer.push` com `transaction_id`, `user_name`, `user_phone`, `user_email` e aliases no `handleFormSubmit`
- Landing pages agora disparam conversões no Google Ads igual aos StepForms

### 2. ✅ Grids Responsivos Corrigidos (6 componentes)
- `LandingBenefits`, `LandingProblemsGrid`, `LandingNumbers`, `LandingTestimonials`, `LandingFaq`, `LandingTrustBadges`
- Substituído `gridTemplateColumns` inline por classes Tailwind responsivas (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)

### 3. ✅ Código Duplicado Removido
- Deletado `LandingPageEditor.tsx` (175 linhas) e `LandingSectionEditor.tsx` (226 linhas)
- Extraído `landingSectionTypes.ts` (getDefaultSectionConfig compartilhado)
- Extraído `renderLandingSection.tsx` (renderizador compartilhado)
- `LandingVisualEditor` e `LandingPreview` agora importam dos utilitários

### 4. ✅ SEO Melhorado no LandingPageRenderer
- Adicionado canonical tag e JSON-LD (WebPage schema)

### 5. ✅ Bug de Undo/Redo Corrigido
- `historyIdx` agora calculado corretamente quando o array é truncado
