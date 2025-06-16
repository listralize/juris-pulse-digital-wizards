
-- Adicionar novos campos na tabela law_categories
ALTER TABLE public.law_categories 
ADD COLUMN IF NOT EXISTS banner_title text,
ADD COLUMN IF NOT EXISTS banner_subtitle text,
ADD COLUMN IF NOT EXISTS full_content text;
