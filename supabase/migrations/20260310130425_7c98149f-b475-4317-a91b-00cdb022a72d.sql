UPDATE step_forms 
SET tracking_config = jsonb_set(
  jsonb_set(
    tracking_config::jsonb, 
    '{google_ads_conversion_id}', 
    '"16884173585"'
  ),
  '{google_ads_conversion_label}', 
  '"kuptCP-t3q8aEJGWgPM-"'
)
WHERE slug = 'divorcioform';