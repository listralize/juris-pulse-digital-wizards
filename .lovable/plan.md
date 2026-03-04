

# Fix GTM Double-Firing: Clear custom_head_html from divorcioform

## Problem
The GTM container is loaded twice on the StepForm page:
1. Globally via `useMarketingLoader` (correct)
2. Via `custom_head_html` in the divorcioform's `tracking_config` (duplicate)

This causes 2-3 conversion hits per form submission.

## What I Can Do (Step 1)

Run a SQL migration to clear the `custom_head_html` field from the divorcioform's `tracking_config`:

```sql
UPDATE public.step_forms
SET tracking_config = tracking_config - 'custom_head_html'
WHERE slug = 'divorcioform'
  AND tracking_config->>'custom_head_html' IS NOT NULL;
```

This removes only the `custom_head_html` key from the JSON, leaving all other tracking config intact.

## What You Need to Do (Step 2 — GTM Console)

This is outside Lovable's scope — done in the GTM web interface:

1. Go to GTM → Variables → create/rename Data Layer Variables:
   - `customer_full_name` (replaces `user_name`)
   - `customer_email` (replaces `user_email`)  
   - `customer_phone` (replaces `user_phone`)
2. Update tag **01 - GADS - Envio de formulário de Lead** to use the new variables
3. Publish the GTM container

## No code files are modified — only a database field is cleared.

