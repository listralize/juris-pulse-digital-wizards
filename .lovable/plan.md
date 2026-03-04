

# Fix Reply Agent SmartFlow + Tags + WhatsApp Mapping

## Problems Identified

1. **SmartFlow not triggered**: `useStepForm.ts` calls `reply-agent-sync` without `automation_id`. The edge function only triggers the flow if it receives `automation_id` or the `REPLY_AGENT_FLOW_ID` secret is set. Neither is configured.

2. **WhatsApp field missing**: The code sends `phone` but not `whatsapp`. Reply Agent needs `primary_whatsapp_number` for WhatsApp SmartFlows. Brazilian phone = WhatsApp in most cases.

3. **Tags incomplete**: Urgency tag skipped when `urgency === 'default'`. Form slug tag and traffic source tag (`TRAFEGO_PAGO` / `organico`) not applied.

## Changes

### 1. `src/hooks/useStepForm.ts` — Reply Agent sync block (lines 521-552)

- Add `whatsapp: extractedData.phone` to the payload (Brazilian phone = WhatsApp)
- Before invoking, fetch `marketing_settings` to get the correct `automation_id` based on urgency level
- Add `extractedData.whatsapp = extractedData.phone` fallback after the extractedData block (line 382)

### 2. `supabase/functions/reply-agent-sync/index.ts` — Three fixes

**a) WhatsApp mapping (line 103-104)**: If `whatsapp` is not provided, auto-map `phone` to `primary_whatsapp_number`:
```typescript
const whatsappNumber = payload.whatsapp || payload.phone;
if (whatsappNumber) body.primary_whatsapp_number = normalizePhone(whatsappNumber);
```

**b) Tags block (lines 219-228)**: Always apply urgency tag (including `default`), add `TRAFEGO_PAGO` / `organico` tag based on gclid presence.

**c) No other changes** — the SmartFlow trigger logic at line 273 already works correctly once `automation_id` is passed from the client.

## What is NOT changed

- No UI changes
- No database migrations needed
- No changes to other hooks, components, or edge functions
- The admin sidebar refactor mentioned by the user is a separate task and will not be included here

