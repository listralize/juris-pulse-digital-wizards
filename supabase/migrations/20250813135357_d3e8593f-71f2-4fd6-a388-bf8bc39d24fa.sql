UPDATE step_forms 
SET tracking_config = jsonb_set(
  tracking_config,
  '{facebook_pixel,event_type}',
  '"Contact"'
)
WHERE slug = 'juridico-completo';