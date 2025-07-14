-- Verificar constraint atual dos tipos de item
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'link_tree_items_item_type_check';

-- Remover constraint existente e criar nova com tipos corretos
ALTER TABLE public.link_tree_items DROP CONSTRAINT IF EXISTS link_tree_items_item_type_check;

-- Adicionar nova constraint com os tipos permitidos (removendo social, contact, product)
ALTER TABLE public.link_tree_items 
ADD CONSTRAINT link_tree_items_item_type_check 
CHECK (item_type IN ('link', 'card', 'form', 'service', 'video', 'text', 'info'));