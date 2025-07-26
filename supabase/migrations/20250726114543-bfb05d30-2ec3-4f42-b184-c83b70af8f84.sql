-- Criar bucket para vídeos
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);

-- Criar políticas para o bucket de vídeos
CREATE POLICY "Public can view videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Admins can upload videos" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'videos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update videos" ON storage.objects FOR UPDATE 
USING (bucket_id = 'videos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete videos" ON storage.objects FOR DELETE 
USING (bucket_id = 'videos' AND auth.uid() IS NOT NULL);

-- Adicionar campo para URL do vídeo no storage
ALTER TABLE site_settings ADD COLUMN about_video_storage_url TEXT;