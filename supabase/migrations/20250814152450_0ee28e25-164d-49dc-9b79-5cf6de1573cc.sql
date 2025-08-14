-- Aumentar limite para 100MB para vídeos
UPDATE storage.buckets 
SET file_size_limit = 104857600
WHERE name = 'website-gallery';

-- Verificar tipos MIME permitidos para vídeos
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY['image/*', 'video/*', 'video/mp4', 'video/webm', 'video/avi', 'video/mov', 'video/quicktime']
WHERE name = 'website-gallery';