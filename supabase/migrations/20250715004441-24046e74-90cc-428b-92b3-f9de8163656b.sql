-- Remover coluna avatar_format e ajustar avatar_size para usar pixels
ALTER TABLE public.link_tree 
DROP COLUMN IF EXISTS avatar_format,
ALTER COLUMN avatar_size SET DEFAULT '128';