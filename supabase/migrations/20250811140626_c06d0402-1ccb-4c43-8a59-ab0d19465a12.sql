-- Adicionar campo redirect_url à tabela step_forms para permitir URLs de redirecionamento personalizadas
ALTER TABLE public.step_forms 
ADD COLUMN redirect_url TEXT DEFAULT '/obrigado';