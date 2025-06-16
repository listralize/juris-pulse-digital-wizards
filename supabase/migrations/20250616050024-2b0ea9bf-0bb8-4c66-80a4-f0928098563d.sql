
-- Adicionar a coluna about_media_type que está faltando
ALTER TABLE site_settings ADD COLUMN about_media_type text DEFAULT 'image';

-- Adicionar campos que podem estar faltando para sincronização completa
ALTER TABLE contact_info ADD COLUMN IF NOT EXISTS map_embed_url text;
