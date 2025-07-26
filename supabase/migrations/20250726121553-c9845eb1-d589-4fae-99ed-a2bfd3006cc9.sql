-- Adicionar campo para vídeo de fundo na seção Nossa Equipe
ALTER TABLE site_settings 
ADD COLUMN team_background_video text,
ADD COLUMN team_video_enabled boolean DEFAULT false;

-- Adicionar campo para Instagram nas informações de contato
ALTER TABLE contact_info 
ADD COLUMN instagram_url text DEFAULT '';

-- Criar índice para melhorar performance das consultas
CREATE INDEX IF NOT EXISTS idx_form_leads_form_id ON form_leads(form_id);
CREATE INDEX IF NOT EXISTS idx_form_leads_created_at ON form_leads(created_at DESC);