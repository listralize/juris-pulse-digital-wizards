

# Fix 2 Build Errors + Apply Migrations

## Build Error Fixes

### 1. `src/hooks/useStepForm.ts` (line 681)
- Remove `extractedData.service ||` — property doesn't exist on the type `{ name, email, phone }`
- The fallback `formData.servico || formData.service || serviceName` already covers it

### 2. `supabase/functions/send-smtp-email/index.ts` (line 2)
- Change `import { Resend } from "npm:resend@2.0.0"` to `import { Resend } from "https://esm.sh/resend@2.0.0"`
- The `npm:` specifier requires a deno.json config; `esm.sh` works directly

## Supabase Migrations

### Migration 1 — Centralize / Reply Agent columns + lead_profiles table
- Add ~25 columns to `marketing_settings` for Reply Agent/Centralize integration
- Create `lead_profiles` table with RLS policy and index
- Execute the SQL provided by the user verbatim

### Migration 2
The user only provided Migration 1 in their message. Will apply what was given.

## File Changes Summary

| File | Change |
|---|---|
| `src/hooks/useStepForm.ts:681` | Remove `extractedData.service \|\|` |
| `supabase/functions/send-smtp-email/index.ts:2` | `npm:resend` → `https://esm.sh/resend` |
| Supabase DB | Run migration SQL for marketing_settings + lead_profiles |

