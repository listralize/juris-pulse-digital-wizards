-- Atualizar configuração para enviar "Lead" para o formulário principal
UPDATE marketing_settings 
SET form_tracking_config = jsonb_set(
  form_tracking_config,
  '{systemForms,0,facebookPixel,eventType}',
  '"Lead"'::jsonb
)
WHERE id = 'ad9cb41e-bc7a-4648-8e46-2758ef5af913';

-- Forçar cache refresh das configurações de marketing
UPDATE marketing_settings 
SET updated_at = NOW()
WHERE id = 'ad9cb41e-bc7a-4648-8e46-2758ef5af913';