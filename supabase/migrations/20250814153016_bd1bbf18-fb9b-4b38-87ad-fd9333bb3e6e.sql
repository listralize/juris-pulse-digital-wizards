-- Remover TODAS as limitações e garantir acesso total
UPDATE storage.buckets 
SET 
  file_size_limit = NULL,  -- Remove limite de tamanho
  allowed_mime_types = NULL  -- Remove restrições de tipo
WHERE name = 'website-gallery';

-- Garantir políticas funcionais
DROP POLICY IF EXISTS "Users can upload to website-gallery" ON storage.objects;
DROP POLICY IF EXISTS "Public can view website-gallery files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete website-gallery files" ON storage.objects;

-- Criar políticas permissivas
CREATE POLICY "Allow all operations on website-gallery" 
ON storage.objects 
FOR ALL 
USING (bucket_id = 'website-gallery') 
WITH CHECK (bucket_id = 'website-gallery');

-- Garantir que o bucket é público
UPDATE storage.buckets 
SET public = true 
WHERE name = 'website-gallery';