-- Adicionar campos para avatar size e format na tabela link_tree
ALTER TABLE public.link_tree 
ADD COLUMN IF NOT EXISTS avatar_size text DEFAULT 'w-20 h-20',
ADD COLUMN IF NOT EXISTS avatar_format text DEFAULT 'rounded-full';