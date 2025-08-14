-- Atualizar marketing_settings para configuração flexível de eventos
UPDATE marketing_settings 
SET 
  google_tag_manager_enabled = true,
  google_tag_manager_id = 'GTM-PL22PJ6V',
  form_tracking_config = '{
    "systemForms": [{
      "formId": "default",
      "formName": "Formulário Principal", 
      "submitButtonId": "PRINCIPAL",
      "webhookUrl": "https://hook.us1.make.com/30b2rz3ot9c417lv8rlwbusolkuv3a5x",
      "enabled": true,
      "campaign": "HOME",
      "campaignName": "bora",
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
      },
      "customHeadScripts": "<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({''gtm.start'':\nnew Date().getTime(),event:''gtm.js''});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!=''dataLayer''?''&l=''+l:'''';j.async=true;j.src=\n''https://www.googletagmanager.com/gtm.js?id=''+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,''script'',''dataLayer'',''GTM-PL22PJ6V'');</script>\n<!-- End Google Tag Manager -->",
      "customBodyScripts": "<!-- Google Tag Manager (noscript) -->\n<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-PL22PJ6V\"\nheight=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n<!-- End Google Tag Manager (noscript) -->"
    }],
    "linkTreeForms": ["form_1752531473929"],
    "customForms": [],
    "events": {
      "formSubmission": true,
      "buttonClick": false,
      "linkClick": false
    },
    "stepForms": []
  }'::jsonb,
  updated_at = now()
WHERE id IS NOT NULL;