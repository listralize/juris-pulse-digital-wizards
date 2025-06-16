
-- Add form_config column to admin_settings table
ALTER TABLE public.admin_settings 
ADD COLUMN form_config jsonb;
