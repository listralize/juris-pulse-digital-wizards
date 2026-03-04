

# Enhanced Conversions Migration + Marketing Scripts Fix

## Current State

The code in `useStepForm.ts` (lines 441-444) already sends `gclid`, `transaction_id`, `utm_term`, `utm_content` to `form_leads`, but **these columns don't exist in the database**. This causes the INSERT to fail silently, resulting in `savedLead = null` and empty `lead_id` in the dataLayer.

Similarly, `conversion_events` lacks `gclid` and `transaction_id` columns.

## Changes Required

### 1. Database Migration — Enhanced Conversions
Add columns to `form_leads` and `conversion_events`, create `offline_conversions` table, and add performance indexes. This is the SQL provided by the user.

### 2. `src/hooks/useStepFormMarketingScripts.ts` (lines 230-241)
Add `extractedData` as first priority source for email/name/phone in the GTM handler. Currently the code reads `userData`, `formData`, `answers` but misses `extractedData` which is the properly processed data from `useStepForm`.

**Change**: Add `const extracted = event.detail?.extractedData || {};` and prioritize `extracted.email`, `extracted.name`, `extracted.phone` in the fallback chain.

### 3. Add email field to divorcioform
Run an UPDATE on `step_forms` to append an optional email field to the form step of `divorcioform`. Field will be `required: false` so it doesn't block submissions.

### No other files are modified — all existing UI and functionality remains intact.

