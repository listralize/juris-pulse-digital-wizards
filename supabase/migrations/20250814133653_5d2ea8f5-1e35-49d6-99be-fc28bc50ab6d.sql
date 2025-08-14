-- Atualizar marketing_settings para configuração flexível de eventos
UPDATE marketing_settings 
SET 
  google_tag_manager_enabled = true,
  google_tag_manager_id = 'GTM-PL22PJ6V',
  form_tracking_config = jsonb_set(
    COALESCE(form_tracking_config, '{"systemForms": []}'::jsonb),
    '{systemForms}',
    CASE 
      WHEN jsonb_array_length(COALESCE(form_tracking_config->'systemForms', '[]'::jsonb)) = 0 THEN
        '[{
          "formId": "default",
          "enabled": true,
          "facebookPixel": {
            "enabled": true,
            "pixelId": "1024100955860841",
            "eventType": "Custom",
            "customEventName": "Lead"
          },
          "googleTagManager": {
            "enabled": true,
            "eventName": "submit",
            "containerId": "GTM-PL22PJ6V"
          }
        }]'::jsonb
      ELSE
        (
          SELECT jsonb_agg(
            CASE 
              WHEN form_obj->>'formId' = 'default' THEN
                jsonb_set(
                  jsonb_set(
                    jsonb_set(
                      form_obj,
                      '{facebookPixel,customEventName}',
                      '"Lead"'::jsonb
                    ),
                    '{facebookPixel,eventType}',
                    '"Custom"'::jsonb
                  ),
                  '{googleTagManager}',
                  '{"enabled": true, "eventName": "submit", "containerId": "GTM-PL22PJ6V"}'::jsonb
                )
              ELSE 
                form_obj
            END
          )
          FROM jsonb_array_elements(form_tracking_config->'systemForms') AS form_obj
        )
    END
  ),
  updated_at = now()
WHERE id IS NOT NULL;