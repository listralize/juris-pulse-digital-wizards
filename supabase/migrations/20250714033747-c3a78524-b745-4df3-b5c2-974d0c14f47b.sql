-- Adicionar novos campos à tabela link_tree
ALTER TABLE public.link_tree 
ADD COLUMN theme TEXT DEFAULT 'modern',
ADD COLUMN background_type TEXT DEFAULT 'solid',
ADD COLUMN background_gradient TEXT,
ADD COLUMN background_image TEXT,
ADD COLUMN background_video TEXT,
ADD COLUMN custom_css TEXT,
ADD COLUMN animation_style TEXT DEFAULT 'none',
ADD COLUMN show_analytics BOOLEAN DEFAULT false;

-- Adicionar novos campos à tabela link_tree_items
ALTER TABLE public.link_tree_items
ADD COLUMN button_style TEXT DEFAULT 'inherit',
ADD COLUMN hover_effect TEXT DEFAULT 'scale',
ADD COLUMN click_count INTEGER DEFAULT 0,
ADD COLUMN is_featured BOOLEAN DEFAULT false;