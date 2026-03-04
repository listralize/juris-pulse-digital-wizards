

# Fix Reply Agent: WhatsApp Not Saved When Same as Phone

## Root Cause (Confirmed by Logs)

The Reply Agent API response shows `primary_whatsapp: null` even though we send `primary_whatsapp_number`. This happens because the API silently discards `primary_whatsapp_number` when it has the same value as `primary_phone_number`.

Current code (line 102-107) sends **both** fields with the same number — the API keeps only `primary_phone_number` and drops the WhatsApp.

## Fix

**`supabase/functions/reply-agent-sync/index.ts`** — In `createContact`, replace the phone/whatsapp mapping (lines 102-107) with logic that sends the number **only as `primary_whatsapp_number`** when both are the same:

```typescript
const phoneNum = payload.phone ? normalizePhone(payload.phone) : null
const whatsappNum = (payload.whatsapp || payload.phone) ? normalizePhone(payload.whatsapp || payload.phone) : null

if (phoneNum && whatsappNum && phoneNum === whatsappNum) {
  // Same number: send only as WhatsApp (API ignores whatsapp if phone has same value)
  body.primary_whatsapp_number = whatsappNum
} else {
  if (phoneNum) body.primary_phone_number = phoneNum
  if (whatsappNum) body.primary_whatsapp_number = whatsappNum
}
```

This ensures the SmartFlow can reach the contact via WhatsApp. No email field will be added to the form — only the edge function mapping changes.

## No other changes
- No form field changes (no email field added)
- No changes to `useStepForm.ts`
- Tags logic already correct from previous fix

