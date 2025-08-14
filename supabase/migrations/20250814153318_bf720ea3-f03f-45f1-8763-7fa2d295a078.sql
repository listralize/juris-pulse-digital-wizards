-- Definir um limite muito alto compatível com planos pagos (5GB)
UPDATE storage.buckets 
SET file_size_limit = 5368709120  -- 5GB em bytes
WHERE name = 'website-gallery';

-- Verificar se não há limitações de projeto
SELECT current_setting('supabase.file_size_limit', true) as project_limit;