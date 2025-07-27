-- Adicionar coluna lead_webhook_config na tabela admin_settings
ALTER TABLE admin_settings ADD COLUMN IF NOT EXISTS lead_webhook_config TEXT;