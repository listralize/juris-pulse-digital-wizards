-- Adicionar campo logo_url à tabela email_templates se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='logo_url') THEN
        ALTER TABLE public.email_templates ADD COLUMN logo_url TEXT;
    END IF;
END $$;

-- Adicionar campos de personalização visual se não existirem
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='background_color') THEN
        ALTER TABLE public.email_templates ADD COLUMN background_color TEXT DEFAULT '#ffffff';
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='text_color') THEN
        ALTER TABLE public.email_templates ADD COLUMN text_color TEXT DEFAULT '#000000';
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='button_color') THEN
        ALTER TABLE public.email_templates ADD COLUMN button_color TEXT DEFAULT '#4CAF50';
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='custom_html') THEN
        ALTER TABLE public.email_templates ADD COLUMN custom_html TEXT;
    END IF;
END $$;