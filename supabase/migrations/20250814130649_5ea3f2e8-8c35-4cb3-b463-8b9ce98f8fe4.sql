-- Verificar e ajustar RLS policies para form_leads
-- Permitir inserções anônimas para StepForms

-- Política para permitir inserção anônima em form_leads
DROP POLICY IF EXISTS "Allow anonymous form submissions" ON public.form_leads;

CREATE POLICY "Allow anonymous form submissions" 
ON public.form_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Política para leitura autenticada
DROP POLICY IF EXISTS "Users can view own leads" ON public.form_leads;

CREATE POLICY "Users can view own leads" 
ON public.form_leads 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'manager')
  )
);