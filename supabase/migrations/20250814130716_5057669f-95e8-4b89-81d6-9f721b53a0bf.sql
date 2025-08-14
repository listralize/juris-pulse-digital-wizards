-- Corrigir políticas para form_leads - permitir inserções anônimas para StepForms
-- O tipo app_role só permite 'admin', não 'manager'

-- Política para permitir inserção anônima em form_leads
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.form_leads;

CREATE POLICY "Allow anonymous form submissions" 
ON public.form_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);