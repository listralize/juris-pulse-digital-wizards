

# Apply 3 Corrections: Phone Field, Custom Fields, Edge Function

## Changes

### 1. `src/components/stepform/PhoneFieldWithDDD.tsx` — Emit onChange on every keystroke

The current code only calls `onChange` in `handleBlur`. If the user clicks "Enviar" without blurring the phone field, `formData` has an empty phone value.

Fix: In `handleChange`, extract digits and call `onChange(digits.length > 0 ? '55${digits}' : '')` on every keystroke, keeping the blur handler for formatting only.

### 2. `src/hooks/useStepForm.ts` (lines 558-574) — Add `custom_fields` to reply-agent-sync payload

Add a `custom_fields` object containing UTM parameters, gclid, page origin, referrer, lead_id, and form name to the `reply-agent-sync` invocation body.

### 3. `supabase/functions/reply-agent-sync/index.ts` — Full replacement

Key changes from the user's provided code:
- `createContact`: always sends **both** `primary_phone_number` AND `primary_whatsapp_number` with the same normalized number (reverting the previous "only whatsapp" approach)
- If `whatsapp` differs from `phone`, override only `primary_whatsapp_number`
- Tags endpoint confirmed as `POST /v1/contacts/{id}/tags` with JSON body
- SmartFlow uses `FormData` as before
- Detailed logging preserved

### 4. `supabase/config.toml` — Restore verify_jwt settings

The last diff removed the `verify_jwt = false` entries for edge functions. These need to be restored so the functions remain callable without JWT.

