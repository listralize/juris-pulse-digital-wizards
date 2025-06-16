
-- Primeiro, remover a constraint de foreign key existente
ALTER TABLE public.service_pages 
DROP CONSTRAINT IF EXISTS service_pages_category_id_fkey;

-- Agora alterar a coluna category_id para text
ALTER TABLE public.service_pages 
ALTER COLUMN category_id TYPE text;
