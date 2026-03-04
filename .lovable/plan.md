

# Redesign: Centralize per-form config + Move Google Ads to Marketing + Fix build error

## Build Error Fix

The `send-welcome-email` function imports `npm:resend@2.0.0` which fails in the Deno bundler. Fix: change the import to use `https://esm.sh/resend@2.0.0` (same pattern used by other edge functions).

## Database Migration

Add `centralize_config` JSONB column to `step_forms` table:

```sql
ALTER TABLE public.step_forms
ADD COLUMN IF NOT EXISTS centralize_config jsonb DEFAULT '{}'::jsonb;
```

This stores per-form configuration:
```json
{
  "flow_id_default": "123",
  "flow_id_urgente": "456",
  "flow_id_semanas": "",
  "flow_id_pesquisando": "",
  "tags": ["divorcio", "familia"],
  "enabled": true
}
```

## Centralize Panel Redesign (~400 lines, down from 974)

Replace `CentralizeManagement.tsx` with a single-screen layout (no tabs):

```text
┌─────────────────────────────────────────────────────┐
│  Centralize — CRM & Chatbot           [Ativo] [Salvar]│
├─────────────────────────────────────────────────────┤
│  CONEXÃO                                             │
│  [x] Integração ativa                                │
│  API Key (referência): [••••••••]  [Testar Conexão]  │
│  Canal padrão: [WhatsApp ▾]                          │
│  Smart Flow Padrão: [ID]                             │
│  Webhook callback (opcional): [URL]                  │
│  [x] Notificar por email: [email]                    │
├─────────────────────────────────────────────────────┤
│  CONFIGURAÇÃO POR FORMULÁRIO                         │
│                                                      │
│  ┌─ Divórcio Rápido (divorcioform) ───────────────┐ │
│  │ Flow padrão: [789]  Urgente: [123]              │ │
│  │ Semanas: [456]  Pesquisando: []                 │ │
│  │ Tags: [divorcio] [familia] [+ adicionar]        │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ┌─ Inventário (inventarioform) ──────────────────┐ │
│  │ Flow padrão: [654]  Urgente: [321]              │ │
│  │ Tags: [inventario] [+ adicionar]                │ │
│  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

Key changes:
- Remove all 5 tabs, single scrollable screen
- Remove tag prefix fields (servico_, urgencia_, form_) -- tags are now **manual only per form**
- Remove sync toggles (always sync all fields -- these toggles added complexity without real value)
- Remove Google Ads section entirely (moves to Marketing)
- Fetch `step_forms` list and render per-form config cards
- Each form card: 4 flow ID fields + manual tags input with add/remove chips
- Save writes `centralize_config` JSONB to each `step_forms` row + global settings to `marketing_settings`

## Marketing Panel: Add Google Ads Tab

In `MarketingManagement.tsx`:
- Change tabs from 4 to 5: add "Google Ads" tab
- Move the Google Ads content (Enhanced Conversions explanation, Upload button, GTM instructions) from the old Centralize component into a new tab here
- The Google Ads section is self-contained (~200 lines), just needs the upload state/handlers moved along with it

## Edge Function Update (`reply-agent-sync`)

Update the tag generation logic (lines 287-292):
- **Remove** automatic `servico_*`, `urgencia_*`, `form_*` tags
- **Add**: read `centralize_config.tags` from the `step_forms` row matching `form_slug`
- Query: `SELECT centralize_config FROM step_forms WHERE slug = payload.form_slug`
- Apply only the manual tags from that config + traffic tag (`TRAFEGO_PAGO` / `organico`)
- Read flow IDs from `centralize_config` per form instead of global `marketing_settings`

## `useStepForm.ts` Update

Update `fetchAutomationId` to read from `step_forms.centralize_config` first, falling back to global `marketing_settings`:

```typescript
const fetchAutomationId = async () => {
  // 1. Try per-form config
  const { data: formData } = await supabase
    .from('step_forms')
    .select('centralize_config')
    .eq('slug', form.slug || slug)
    .maybeSingle();
  
  const fc = formData?.centralize_config as any;
  if (fc?.enabled) {
    if (urgencyValue === 'urgente') return fc.flow_id_urgente || fc.flow_id_default;
    if (urgencyValue === 'semanas') return fc.flow_id_semanas || fc.flow_id_default;
    if (urgencyValue === 'pesquisando') return fc.flow_id_pesquisando || fc.flow_id_default;
    return fc.flow_id_default;
  }
  
  // 2. Fallback to global settings
  // (existing logic)
};
```

Also pass `form_slug` to edge function so it can look up per-form tags.

## Summary of Files Changed

| File | Change |
|------|--------|
| `supabase/functions/send-welcome-email/index.ts` | Fix Resend import (build error) |
| `step_forms` table | Add `centralize_config` JSONB column |
| `src/components/admin/CentralizeManagement.tsx` | Full rewrite: single screen, per-form config |
| `src/components/admin/MarketingManagement.tsx` | Add Google Ads tab (moved from Centralize) |
| `supabase/functions/reply-agent-sync/index.ts` | Read per-form tags + flows, remove auto tags |
| `src/hooks/useStepForm.ts` | Read `centralize_config` for automation ID |

