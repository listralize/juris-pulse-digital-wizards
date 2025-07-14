-- Adicionar campos para cards estilo Netflix/Hotmart
ALTER TABLE public.link_tree_items
ADD COLUMN card_image TEXT,
ADD COLUMN card_price TEXT,
ADD COLUMN card_button_text TEXT DEFAULT 'Saiba Mais',
ADD COLUMN form_id TEXT; -- Para referenciar formulários existentes

-- Remover form_action já que vamos usar formulários existentes
ALTER TABLE public.link_tree_items DROP COLUMN IF EXISTS form_action;