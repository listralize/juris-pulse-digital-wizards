UPDATE step_forms 
SET tracking_config = jsonb_set(
  tracking_config::jsonb, 
  '{google_ads_conversion_id}', 
  '"AW-16884173585"'
)
WHERE slug = 'divorcioform';