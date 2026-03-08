

# Plano: Landing Page Builder integrado ao StepForm

## Contexto

O sistema atual de StepForm funciona como um quiz multi-etapas. O objetivo e adicionar uma segunda modalidade -- **Landing Page** -- no mesmo sistema, usando a mesma tabela `step_forms`, o mesmo builder no admin, e a mesma rota `/formulario/:slug`. A escolha entre quiz ou landing page sera feita ao criar/editar o formulario.

A referencia (rezendetorres.com.br) usa um padrao classico de landing page de conversao juridica:
- Hero com headline forte + imagem + CTA
- Badges de confianca (confidencial, resposta rapida)
- Secao de problemas/dores em grid
- Mini-formulario embutido (nome + opcoes)
- Secao emocional (impacto)
- Equipe/sobre
- FAQ accordion
- CTAs de WhatsApp distribuidos

## Arquitetura

### 1. Banco de dados

Adicionar campo `page_type` na tabela `step_forms`:

```sql
ALTER TABLE public.step_forms 
ADD COLUMN page_type text NOT NULL DEFAULT 'quiz';
```

Adicionar campo `sections` (JSONB) para armazenar blocos da landing page:

```sql
ALTER TABLE public.step_forms 
ADD COLUMN sections jsonb DEFAULT '[]'::jsonb;
```

Nenhuma tabela nova. Reutiliza toda a infraestrutura existente (tracking, analytics, webhook, leads).

### 2. Tipos TypeScript

Estender `StepFormData` em `stepFormTypes.ts`:

```typescript
export interface StepFormData {
  // ... campos existentes mantidos
  page_type: 'quiz' | 'landing_page';
  sections?: LandingSection[];
}

export interface LandingSection {
  id: string;
  type: 'hero' | 'trust_badges' | 'problems_grid' | 'cta_banner' 
      | 'embedded_form' | 'benefits' | 'team' | 'faq' | 'testimonials' 
      | 'text_image' | 'custom_html';
  config: Record<string, any>; // Cada tipo tem seu schema
  display_order: number;
}
```

Schemas por tipo de secao (todos editaveis no builder):

| Tipo | Campos |
|------|--------|
| `hero` | headline, subheadline, body_text, image_url, cta_text, cta_url, background_color |
| `trust_badges` | items[]{icon, text} |
| `problems_grid` | title, subtitle, items[]{title, description, icon} |
| `cta_banner` | title, subtitle, button_text, button_url, background_color |
| `embedded_form` | title, subtitle, form_fields[]{name, type, placeholder, required}, cta_text |
| `benefits` | title, items[]{title, description, icon} |
| `team` | title, description, members[]{name, role, image, credentials} |
| `faq` | title, items[]{question, answer} |
| `testimonials` | title, items[]{name, text, rating, image} |
| `text_image` | title, text, image_url, image_position (left/right), background_color |
| `custom_html` | html_content |

### 3. Admin - StepFormBuilder

Alteracoes no `StepFormBuilder.tsx`:

- **Ao criar novo formulario**: Dialog pergunta "Quiz interativo" ou "Landing Page de conversao"
- **Se landing page**: Mostra um editor de secoes (drag-and-drop com lista de blocos) em vez do VisualFlowEditor
- O editor de secoes tera:
  - Barra lateral com blocos disponiveis (hero, badges, grid, form, etc.)
  - Area central com preview das secoes adicionadas
  - Clique em uma secao abre editor de campos especificos
  - Reordenacao por drag (usando react-beautiful-dnd ja instalado)
- As abas existentes (Personalizacao, Tracking, Analytics) continuam funcionando para ambos os modos

Novo componente: `LandingPageEditor.tsx` (~400 linhas)
Novo componente: `LandingSectionEditor.tsx` (~300 linhas) - editor de cada tipo de secao

### 4. Frontend - Renderizador

Alteracoes no `StepForm.tsx`:

```tsx
if (form.page_type === 'landing_page') {
  return <LandingPageRenderer form={form} />;
}
// ... quiz existente continua igual
```

Novo componente: `LandingPageRenderer.tsx` (~500 linhas)
- Renderiza cada secao em sequencia (scroll longo)
- Usa as mesmas cores/estilos do `form.styles`
- O bloco `embedded_form` reutiliza a logica de submit do `useStepForm` (webhook, deduplicacao, tracking)
- Animacoes de entrada com framer-motion (scroll-triggered)
- Responsivo mobile-first

Novos componentes de secao (cada ~50-100 linhas):
- `LandingHero.tsx`
- `LandingTrustBadges.tsx`
- `LandingProblemsGrid.tsx`
- `LandingCtaBanner.tsx`
- `LandingEmbeddedForm.tsx`
- `LandingBenefits.tsx`
- `LandingTeam.tsx`
- `LandingFaq.tsx`
- `LandingTestimonials.tsx`
- `LandingTextImage.tsx`

### 5. Fluxo de conversao

O `embedded_form` da landing page usara o mesmo fluxo de envio:
- Salva em `form_leads` e `conversion_events`
- Dispara webhook configurado
- Tracking (Pixel, GA, GTM)
- Redirect para pagina de obrigado
- Deduplicacao existente

### 6. O que NAO muda

- Toda a UI existente do admin
- Quiz/StepForm existente (nenhuma alteracao)
- Rotas (`/formulario/:slug` serve ambos)
- Tabelas de leads, analytics, tracking
- Edge functions

### Estimativa de componentes

| Arquivo | Acao | Linhas aprox |
|---------|------|-------------|
| Migration SQL | novo | 5 |
| `stepFormTypes.ts` | editar | +30 |
| `StepFormBuilder.tsx` | editar | +50 (toggle quiz/landing) |
| `LandingPageEditor.tsx` | novo | 400 |
| `LandingSectionEditor.tsx` | novo | 350 |
| `LandingPageRenderer.tsx` | novo | 500 |
| 10 componentes de secao | novos | ~800 total |
| `StepForm.tsx` | editar | +5 (condicional) |
| `useStepForm.ts` | editar | +20 (suporte landing) |

