

# Fix Reply Agent: Email, Phone, WhatsApp Not Arriving

## Root Cause Analysis

Looking at the data, I found two issues:

### Issue 1: Latest form submission has empty phone
The most recent divorcioform submission (id `b741f9dc`) has `phone: ""` (empty) — the "Telefone" field is `required: false` and was left blank. This explains why phone/whatsapp are null in Reply Agent.

### Issue 2: No diagnostic logging
The edge function doesn't log the exact payload being sent to Reply Agent's API, making it impossible to verify what's actually being transmitted. We can see from logs that email IS reaching the function (`Processing lead: Derick Fernandes Godoi | onfleekmidiacriativa@gmail.com`), but we can't confirm what the API receives.

### Possible Issue 3: Reply Agent API field names
The code sends `primary_email`, `primary_phone_number`, `primary_whatsapp_number` — but if the Reply Agent API expects different field names (e.g., `email`, `phone_number`, `whatsapp_number`), the fields would be silently ignored and the contact created without them.

## Changes

### 1. `supabase/functions/reply-agent-sync/index.ts` — Add diagnostic logging

In `createContact`, log the exact body being sent AND the full response from Reply Agent:

```typescript
console.log('[reply-agent-sync] → createContact body:', JSON.stringify(body))
// ... fetch ...
console.log('[reply-agent-sync] ← createContact response:', JSON.stringify(data))
```

This will show in the Edge Function logs exactly what's being sent and what Reply Agent returns, so we can confirm the field mapping.

### 2. `supabase/functions/reply-agent-sync/index.ts` — Also log the incoming payload

At the top of the handler, log the full payload to confirm what the client is sending:

```typescript
console.log('[reply-agent-sync] Payload received:', JSON.stringify(payload))
```

### 3. No other changes

The edge function code and `useStepForm.ts` logic look correct. The field extraction (`formData.Telefone`, `formData.email`, etc.) matches the form field names. The issue is likely that:
- The phone was genuinely empty in the last test submission
- OR the Reply Agent API field names need adjustment (we'll know from the logs)

After deploying with logging, one test submission will reveal the exact problem.

