

# Melhorar Customização das Seções da Landing Page

## Problema

Atualmente, as opções de estilo de cada seção são muito limitadas e inconsistentes:
- **Imagem de fundo**: só o Hero suporta (e precisa trocar o layout para "Imagem de fundo")
- **Altura da seção**: sem controle (padding fixo `py-12 md:py-16`)
- **Espaçamento**: sem controle de padding top/bottom
- **Bordas/arredondamento**: sem controle
- **Largura máxima**: sem controle (fixo `max-w-6xl`)

Cada seção tem seu próprio mini-editor de estilo com opções diferentes. Falta um painel universal.

## Solução

Adicionar um bloco **"Estilo da Seção"** universal no `SectionConfigPanel` que aparece para **todos** os tipos de seção. Esse bloco controla:

| Controle | Opções |
|----------|--------|
| Imagem de fundo | Upload via ImagePicker |
| Overlay (cor + opacidade) | Color picker + slider |
| Padding vertical | Selecão: Nenhum / Pequeno / Médio / Grande / Extra |
| Altura mínima | Input (ex: `60vh`, `400px`, vazio = auto) |
| Largura máxima | Select: Normal / Largo / Tela cheia |
| Borda arredondada | Switch on/off |

Cada componente de seção (`LandingBenefits`, `LandingCtaBanner`, etc.) será envolvido por um wrapper que aplica esses estilos universais via `renderLandingSection`.

## Arquivos alterados

| Arquivo | Mudança |
|---------|---------|
| `src/components/admin/SectionConfigPanel.tsx` | Adicionar accordion "Estilo da Seção" universal no topo |
| `src/components/landing/renderLandingSection.tsx` | Envolver cada seção num wrapper `<div>` que aplica bg image, padding, min-height, etc. |
| `src/types/stepFormTypes.ts` | Adicionar campos universais ao tipo `LandingSection.config` (`section_bg_image`, `section_padding`, `section_min_height`, `section_max_width`, `section_overlay_color`, `section_overlay_opacity`, `section_rounded`) |

## Detalhes técnicos

### Wrapper universal no `renderLandingSection`
```tsx
// Cada seção renderizada fica envolvida em:
<div style={{
  backgroundImage: config.section_bg_image ? `url(${config.section_bg_image})` : undefined,
  backgroundSize: 'cover', backgroundPosition: 'center',
  minHeight: config.section_min_height || undefined,
  paddingTop/Bottom baseado em section_padding,
  maxWidth / borderRadius baseado nos controles
}}>
  {overlay div se tiver section_overlay_color}
  {componente da seção}
</div>
```

### Accordion universal no SectionConfigPanel
Aparece **antes** do accordion de Conteúdo/Estilo específico de cada tipo. Campos:
- `section_bg_image` → ImagePicker
- `section_overlay_color` → ColorField
- `section_overlay_opacity` → Slider 0-1
- `section_padding` → Select (none/sm/md/lg/xl)
- `section_min_height` → Input texto livre
- `section_max_width` → Select (normal/wide/full)
- `section_rounded` → Switch

Isso mantém os editores específicos de cada seção (conteúdo, cores do componente) e adiciona controle visual poderoso sem quebrar nada existente.

