-- Verificar e corrigir política RLS para form_leads
-- Remover política existente e criar nova mais específica

DROP POLICY IF EXISTS "Public can insert form leads" ON public.form_leads;
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.form_leads;

-- Política para inserção sem verificação de usuário
CREATE POLICY "Enable insert for anonymous users" 
ON public.form_leads 
FOR INSERT 
WITH CHECK (true);