-- Adicionar campo Instagram na tabela contact_info
ALTER TABLE public.contact_info 
ADD COLUMN instagram text DEFAULT NULL;