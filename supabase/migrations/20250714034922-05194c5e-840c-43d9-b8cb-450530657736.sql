-- Adicionar novos campos para suportar cards e forms na tabela link_tree_items
ALTER TABLE public.link_tree_items
ADD COLUMN item_type TEXT DEFAULT 'link' CHECK (item_type IN ('link', 'card', 'form')),
ADD COLUMN card_content TEXT,
ADD COLUMN form_fields JSONB,
ADD COLUMN form_action TEXT;

-- Tornar URL opcional pois cards e forms podem não ter URL
ALTER TABLE public.link_tree_items 
ALTER COLUMN url DROP NOT NULL;