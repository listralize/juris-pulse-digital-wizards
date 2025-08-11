-- Corrigir configuração de tracking do step form para habilitar Facebook Pixel
UPDATE step_forms 
SET tracking_config = jsonb_set(
  tracking_config,
  '{facebook_pixel}',
  jsonb_build_object(
    'enabled', true,
    'pixel_id', '1024100955860841'
  )
)
WHERE slug = 'juridico-completo';