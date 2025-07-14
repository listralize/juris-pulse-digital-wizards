-- Adicionar colunas faltantes para link_tree_items
ALTER TABLE public.link_tree_items 
ADD COLUMN IF NOT EXISTS icon_size text DEFAULT 'w-5 h-5',
ADD COLUMN IF NOT EXISTS icon_color text DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS card_size text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS card_format text DEFAULT 'rounded';

-- Atualizar dados existentes se necessário
UPDATE public.link_tree_items 
SET 
  icon_size = COALESCE(icon_size, 'w-5 h-5'),
  icon_color = COALESCE(icon_color, '#000000'),
  card_size = COALESCE(card_size, 'medium'),
  card_format = COALESCE(card_format, 'rounded')
WHERE icon_size IS NULL OR icon_color IS NULL OR card_size IS NULL OR card_format IS NULL;