

# Plano: Editor Visual de Landing Page estilo Shopify

## Problema Atual
O editor atual e uma lista de cards com formularios separados. O usuario nao ve o resultado em tempo real, nao pode clicar nas secoes para editar, e a experiencia e confusa (lista + formulario abaixo).

## Nova Arquitetura: Split-pane Visual Editor

### Layout do Editor

```text
+---------------------------------------------+
| Toolbar: [+ Secao] [Salvar] [Preview]       |
+----------------+----------------------------+
| Panel Esquerdo | Preview (iframe-like)       |
| (320px)        |                             |
|                | +--------------------------+|
| [Section list] | | HERO - clicavel         ||
| - Hero    [x]  | |                          ||
| - Badges  [x]  | | TRUST BADGES            ||
| - Form    [x]  | |                          ||
|                | | FORM - selecionado       ||
| -------------- | |  (borda azul)            ||
| Config panel   | |                          ||
| (quando        | | FAQ                      ||
| selecionado)   | |                          ||
|                | +--------------------------+|
+----------------+----------------------------+
```

### Componentes Novos/Reescritos

**1. `LandingVisualEditor.tsx`** (~600 linhas) — Substitui `LandingPageEditor.tsx`
- Layout split-pane: sidebar esquerda (320px) + preview direita
- Sidebar tem: lista de secoes (drag reorder) + painel de config da secao selecionada
- Preview renderiza os componentes reais de landing com overlay de selecao
- Clicar em uma secao no preview seleciona no sidebar
- Botao "+ Adicionar Secao" abre dialog com grid de blocos disponiveis
- Cada secao no preview tem hover overlay com: nome, botoes mover/deletar

**2. `LandingPreview.tsx`** (~150 linhas)
- Renderiza todas as secoes reais (mesmos componentes do frontend)
- Cada secao envolvida em wrapper clicavel com:
  - Hover: borda tracejada azul + label do tipo
  - Selecionada: borda solida azul + highlight
  - Botoes de acao (mover up/down, duplicar, deletar)
- Escala 0.6x para caber no painel (transform scale com container scrollavel)

**3. `SectionConfigPanel.tsx`** (~400 linhas) — Substitui `LandingSectionEditor.tsx`
- Painel mais rico por tipo de secao
- Campos organizados em accordions (Conteudo, Estilo, Avancado)
- Color pickers integrados
- Upload de imagem via galeria existente
- Toggle de visibilidade por secao
- Opcoes novas por tipo (detalhadas abaixo)

### Novos Tipos de Secao

| Tipo | Descricao |
|------|-----------|
| `countdown` | Timer regressivo com data-alvo e mensagem de urgencia |
| `video` | Secao de video (YouTube/Vimeo embed ou URL direta) |
| `numbers` | Estatisticas em destaque (ex: "500+ Clientes", "10 Anos") |
| `whatsapp_cta` | Botao flutuante/secao de WhatsApp com mensagem pre-definida |
| `logo_carousel` | Carrossel de logos de parceiros/midia |

### Melhorias nas Secoes Existentes

**Hero**: adicionar `layout` (centered/split), `overlay_color`, `overlay_opacity`, `video_background_url`, `badge_text` (ex: "Consulta Gratuita")
**CTA Banner**: adicionar `icon`, `countdown_enabled`, `whatsapp_url`
**Embedded Form**: adicionar `layout` (card/inline/floating), `success_message`, `phone_mask`
**Trust Badges**: adicionar `style` (pill/card/minimal), mais icones
**Testimonials**: adicionar `layout` (grid/carousel), `show_stars`, `verified_badge`
**Benefits**: adicionar `layout` (grid/list/alternating), `columns` (2/3/4)
**Team**: adicionar `layout` (grid/carousel), `show_social_links`
**FAQ**: adicionar `style` (accordion/cards), `columns` (1/2)

### Funcionalidades do Editor

1. **Click-to-select**: Clicar na secao no preview seleciona e abre config no sidebar
2. **Drag-and-drop**: Reordenar secoes na lista lateral
3. **Duplicar secao**: Botao de copiar secao com todas as configs
4. **Visibilidade**: Toggle para ocultar secao sem deletar
5. **Adicionar secao**: Dialog com grid categorizado (Conteudo, Conversao, Social Proof)
6. **Desfazer**: State history basico (undo/redo com array de snapshots)
7. **Responsivo**: Toggle desktop/mobile no preview

### Alteracoes em Arquivos Existentes

| Arquivo | Mudanca |
|---------|---------|
| `StepFormBuilder.tsx` | Tab "Editor Visual" renderiza `LandingVisualEditor` em vez de `LandingPageEditor` |
| `stepFormTypes.ts` | Adicionar novos tipos de secao (`countdown`, `video`, `numbers`, `whatsapp_cta`, `logo_carousel`), campo `hidden` em `LandingSection` |
| `LandingPageRenderer.tsx` | Adicionar renderizacao dos 5 novos tipos de secao, respeitar `hidden` |
| Cada componente de secao existente | Adicionar suporte aos novos campos de config (layout, style, etc.) |

### Novos Componentes de Secao (Frontend)

- `LandingCountdown.tsx` (~80 linhas)
- `LandingVideo.tsx` (~60 linhas)
- `LandingNumbers.tsx` (~70 linhas)
- `LandingWhatsappCta.tsx` (~50 linhas)
- `LandingLogoCarousel.tsx` (~70 linhas)

### Nao Muda

- Banco de dados (mesmas colunas `sections` JSONB e `page_type`)
- Rota publica `/formulario/:slug`
- Logica de submit/webhook/tracking
- Editor de Quiz (nenhuma alteracao)
- Demais abas do StepFormBuilder (Codigo, Personalizacao, Tracking, Analytics)

