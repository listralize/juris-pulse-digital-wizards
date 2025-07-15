-- Adicionar coluna para Token da API de Conversão do Facebook
ALTER TABLE marketing_settings 
ADD COLUMN facebook_conversion_api_token TEXT;