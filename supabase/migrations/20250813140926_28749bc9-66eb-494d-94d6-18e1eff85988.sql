UPDATE marketing_settings 
SET form_tracking_config = jsonb_set(
  form_tracking_config,
  '{systemForms,0,facebookPixel,eventType}',
  '"Lead"'
);