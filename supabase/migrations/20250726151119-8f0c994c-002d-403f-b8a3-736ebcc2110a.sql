-- Upload da logo para o bucket storage
INSERT INTO storage.objects (bucket_id, name, public) 
VALUES ('videos', 'logo-email.png', true)
ON CONFLICT (bucket_id, name) DO NOTHING;