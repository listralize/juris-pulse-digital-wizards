-- Adicionar campos para configuração do rodapé no Link Tree
ALTER TABLE public.link_tree ADD COLUMN IF NOT EXISTS footer_enabled boolean DEFAULT true;
ALTER TABLE public.link_tree ADD COLUMN IF NOT EXISTS footer_text text DEFAULT NULL;
ALTER TABLE public.link_tree ADD COLUMN IF NOT EXISTS footer_social_links jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.link_tree ADD COLUMN IF NOT EXISTS footer_background_color text DEFAULT '#1a1a1a';
ALTER TABLE public.link_tree ADD COLUMN IF NOT EXISTS footer_text_color text DEFAULT '#ffffff';
ALTER TABLE public.link_tree ADD COLUMN IF NOT EXISTS footer_style text DEFAULT 'minimal';

-- Comentários para documentar os campos
COMMENT ON COLUMN public.link_tree.footer_enabled IS 'Habilita ou desabilita o rodapé';
COMMENT ON COLUMN public.link_tree.footer_text IS 'Texto personalizado do rodapé';
COMMENT ON COLUMN public.link_tree.footer_social_links IS 'Array JSON com links das redes sociais: [{"platform": "instagram", "url": "https://...", "icon": "instagram"}]';
COMMENT ON COLUMN public.link_tree.footer_background_color IS 'Cor de fundo do rodapé';
COMMENT ON COLUMN public.link_tree.footer_text_color IS 'Cor do texto do rodapé';
COMMENT ON COLUMN public.link_tree.footer_style IS 'Estilo do rodapé: minimal, modern, complete';