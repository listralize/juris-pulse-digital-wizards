
# Deep Analysis: Landing Page Builder — Complete Overhaul Plan

## Critical Issues Found

### 1. Image Upload (Biggest UX Flaw)
Every image field uses a raw `<Input>` for URL typing. Affects:
- Hero: `image_url`, `video_background_url`
- TextImage: `image_url`
- Team: `members[].image`
- Testimonials: `items[].image`
- LogoCarousel: `logos[].image_url`
- Emblems/Logos anywhere

Fix: Create a reusable `ImagePickerField` component that shows a thumbnail preview + "Upload / Galeria" button (opens existing `ImageGallery`).

### 2. Icon Picker is Plain Text (UX Flaw)
Users must type `shield`, `clock`, `star` etc. blindly. Need a visual icon picker grid.

### 3. SectionConfigPanel UX Problems
- `text-xs` font throughout makes it hard to read
- Form fields editor for `embedded_form` uses free-text for `type` and `name` — no visual cues
- No real-time visual feedback linking sidebar edits to preview
- No section preview thumbnail
- Layout collapses abruptly when section selected (jarring jump from `h-[200px]` to smaller)

### 4. Preview Issues
- `pointer-events-none` on section content means embedded forms in preview can't scroll properly, but this is needed for selection. OK.
- No empty state guidance for what sections to add first (suggested templates/starters)
- Scale not applied — very tall sections force lots of scrolling in preview
- Mobile view just restricts max-width but the preview components aren't fully responsive tested

### 5. Missing Section Types
- **Pricing Table** — huge conversion section, competitors have it
- **Process Steps** — "How it works" numbered steps, very common
- **Before/After** — Two columns comparing client situation before/after
- **Guarantee** — Risk reversal section (money-back guarantee visual)
- **Rich Text / Article** — WYSIWYG rich text block for longer content
- **Spacer/Divider** — Simple spacing tool

### 6. LandingVisualEditor Layout Bug
- `h-[200px]` fixed height for section list when editing collapses list too much
- History `pushHistory` called on every keystroke in text fields = huge array growth
- No debounce on config updates

### 7. SEO & Performance Issues
- `framer-motion` `whileInView` animations on every element = heavy JS
- Images missing `loading="lazy"` and proper `width`/`height` hints
- `LandingHero` uses `whileInView` which never triggers for above-the-fold content
- `LandingPageRenderer` missing `<Helmet>` SEO meta injection from `seo_config`

---

## Architecture of Changes

### New Files to Create

**`src/components/admin/landing/ImagePickerField.tsx`** (~80 lines)
- Thumbnail preview of current image
- "Galeria" button → opens `ImageGallery` inline dialog
- "Upload" button → triggers file upload directly
- "Remover" X button to clear
- Used in all image fields in SectionConfigPanel

**`src/components/admin/landing/IconPickerField.tsx`** (~60 lines)
- Visual 4×4 grid of 16 common icons (Shield, Clock, Award, Check, Lock, Star, Heart, Zap, AlertCircle, Users, Phone, ThumbsUp, TrendingUp, Sparkles, Target, Rocket)
- Shows selected icon highlighted
- Replaces all "Ícone (shield/clock/...)" text inputs

**`src/components/landing/LandingPriceTable.tsx`** (~120 lines)
- Plan comparison cards with features list
- Highlight "popular" plan
- CTA button per plan
- Config: `title`, `plans[]` with `{name, price, period, features[], cta_text, cta_url, highlighted}`

**`src/components/landing/LandingProcessSteps.tsx`** (~100 lines)
- Numbered steps with icon/number circle, title, description
- Layouts: `vertical` (stacked), `horizontal` (side-by-side), `alternating`
- Connecting line between steps in vertical layout
- Config: `title`, `steps[]`, `layout`

**`src/components/landing/LandingGuarantee.tsx`** (~70 lines)
- Risk-reversal section with large shield/guarantee badge
- "X-day money back guarantee" style
- Config: `title`, `subtitle`, `days`, `icon_type`, `background_color`

---

### Files to Heavily Rewrite

**`src/components/admin/SectionConfigPanel.tsx`** — Complete rewrite
- Import and use `ImagePickerField` for ALL image fields
- Import and use `IconPickerField` for ALL icon fields
- Form fields editor for `embedded_form`: proper Select for field `type`, proper input for `label`/`placeholder`, required toggle
- Better font size (not `text-xs` for important fields)
- Debounced updates (use `useCallback` + 300ms debounce on text fields)
- Add config for new section types (price_table, process_steps, guarantee)

**`src/components/admin/LandingVisualEditor.tsx`** — Partial rewrite
- Fix section list height: use `flex-1` properly with `overflow-hidden`, not hardcoded `h-[200px]`
- Add "Starter Templates" button next to "+ Seção" that inserts pre-configured section combos
- History: debounce pushHistory — don't push on every keystroke, only on blur/significant change
- Add section search/filter in the add dialog
- Better empty state: "Comece com um template" → 3 template combos (Landing Simples, Landing Completa, Página de Vendas)

**`src/components/admin/LandingPreview.tsx`** — Minor improvements
- Add "Open full preview" button that opens new tab with `/formulario/:slug`
- Better empty state with illustrated guidance
- Add new section type renderers

**`src/components/landing/LandingHero.tsx`** — Fix animations
- Replace `whileInView` with `animate` (hero is above fold, whileInView never fires properly in many cases)
- Add `loading="eager"` to hero image, `fetchpriority="high"`
- Add `aria-label` to CTA buttons

**`src/components/landing/LandingNumbers.tsx`** — Add animated counter
- Use `useEffect` + `requestAnimationFrame` to animate number counting from 0 to target
- Trigger animation when element enters viewport using `IntersectionObserver`

**`src/components/landing/LandingPageRenderer.tsx`** — Add SEO + new sections
- Add `<Helmet>` or `useEffect` for meta title/description injection from `seo_config`
- Add OG tags for social sharing
- Import and render new section types

**`src/types/stepFormTypes.ts`** — Add new types
- Add `'price_table' | 'process_steps' | 'guarantee'` to `LandingSection['type']` union

---

## New Section Defaults

```
price_table: {
  title: 'Nossos Planos',
  plans: [
    { name: 'Básico', price: 'R$ 997', period: 'único', features: ['Consulta inicial', 'Análise do caso'], cta_text: 'Começar', highlighted: false },
    { name: 'Completo', price: 'R$ 1.997', period: 'único', features: ['Tudo do Básico', 'Acompanhamento completo', 'Suporte prioritário'], cta_text: 'Escolher', highlighted: true }
  ]
}

process_steps: {
  title: 'Como Funciona',
  layout: 'vertical',
  steps: [
    { number: '01', title: 'Contato Inicial', description: 'Entre em contato conosco' },
    { number: '02', title: 'Análise do Caso', description: 'Avaliamos sua situação' },
    { number: '03', title: 'Resolução', description: 'Resolvemos seu problema' }
  ]
}

guarantee: {
  title: 'Garantia Total',
  subtitle: 'Trabalhamos com total comprometimento',
  days: 30,
  description: 'Se não ficar satisfeito, trabalhamos até resolver'
}
```

---

## Execution Order

1. Create `ImagePickerField.tsx` and `IconPickerField.tsx`
2. Create `LandingPriceTable.tsx`, `LandingProcessSteps.tsx`, `LandingGuarantee.tsx`  
3. Update `stepFormTypes.ts` — add new section types
4. Rewrite `SectionConfigPanel.tsx` — integrate image pickers, icon pickers, new sections
5. Update `LandingVisualEditor.tsx` — fix layout bugs, add new section types to catalog, starter templates
6. Update `LandingPreview.tsx` — add new sections
7. Update `LandingPageRenderer.tsx` — add SEO meta + new sections
8. Fix `LandingHero.tsx` — animation fix, performance improvements
9. Improve `LandingNumbers.tsx` — animated counter
10. Fix `LandingLogoCarousel.tsx` — real auto-scrolling animation

**No changes** to Quiz editor, other admin tabs, database, routes, or any existing non-landing-page functionality.
