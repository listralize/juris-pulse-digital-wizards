UPDATE public.step_forms
SET tracking_config = tracking_config - 'custom_head_html'
WHERE slug = 'divorcioform'
  AND tracking_config->>'custom_head_html' IS NOT NULL;