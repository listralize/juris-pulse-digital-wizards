-- Atualizar bucket para permitir arquivos maiores (50MB)
UPDATE storage.buckets 
SET file_size_limit = 52428800 
WHERE name = 'website-gallery';

-- Verificar se as políticas de storage existem
DO $$
BEGIN
  -- Política para upload de arquivos
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND policyname = 'Users can upload to website-gallery'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can upload to website-gallery" 
    ON storage.objects 
    FOR INSERT 
    WITH CHECK (bucket_id = ''website-gallery'')';
  END IF;

  -- Política para visualizar arquivos
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND policyname = 'Public can view website-gallery files'
  ) THEN
    EXECUTE 'CREATE POLICY "Public can view website-gallery files" 
    ON storage.objects 
    FOR SELECT 
    USING (bucket_id = ''website-gallery'')';
  END IF;

  -- Política para deletar arquivos (admin)
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND policyname = 'Admins can delete website-gallery files'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can delete website-gallery files" 
    ON storage.objects 
    FOR DELETE 
    USING (bucket_id = ''website-gallery'' AND auth.role() = ''authenticated'')';
  END IF;
END
$$;