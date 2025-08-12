-- Criar bucket para galeria universal do site
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-gallery', 'website-gallery', true);

-- Criar política para permitir leitura pública
CREATE POLICY "Arquivos da galeria são publicamente visíveis" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'website-gallery');

-- Criar política para permitir upload apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem fazer upload na galeria" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'website-gallery' AND auth.uid() IS NOT NULL);

-- Criar política para permitir usuários autenticados deletarem arquivos
CREATE POLICY "Usuários autenticados podem deletar da galeria" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'website-gallery' AND auth.uid() IS NOT NULL);