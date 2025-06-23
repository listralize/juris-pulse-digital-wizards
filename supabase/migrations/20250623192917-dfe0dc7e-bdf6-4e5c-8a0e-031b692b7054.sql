
-- Adicionar colunas para os botões do Hero na tabela site_settings
ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS hero_primary_button_text text DEFAULT 'Fale Conosco no WhatsApp',
ADD COLUMN IF NOT EXISTS hero_primary_button_link text DEFAULT 'https://api.whatsapp.com/send?phone=5562994594496',
ADD COLUMN IF NOT EXISTS hero_secondary_button_text text DEFAULT 'Conheça Nossas Áreas de Atuação', 
ADD COLUMN IF NOT EXISTS hero_secondary_button_link text DEFAULT '#areas';
