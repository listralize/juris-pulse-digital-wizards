-- Adicionar campos de CTA (Call to Action) à tabela email_templates
ALTER TABLE public.email_templates 
ADD COLUMN button_text text DEFAULT 'Falar no WhatsApp',
ADD COLUMN button_url text DEFAULT 'https://api.whatsapp.com/send?phone=5562994594496',
ADD COLUMN secondary_button_text text DEFAULT 'Seguir no Instagram',
ADD COLUMN secondary_button_url text DEFAULT 'https://instagram.com/seu_perfil',
ADD COLUMN show_secondary_button boolean DEFAULT true;