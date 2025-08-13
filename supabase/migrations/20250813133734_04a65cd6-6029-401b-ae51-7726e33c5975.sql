UPDATE step_forms 
SET tracking_config = jsonb_set(
  tracking_config, 
  '{facebook_pixel,event_type}', 
  '"CompleteRegistration"'
)
WHERE slug = 'juridico-completo';