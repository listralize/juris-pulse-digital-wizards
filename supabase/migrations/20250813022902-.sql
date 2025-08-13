-- Add redirect fields to service_pages table
ALTER TABLE IF EXISTS public.service_pages
ADD COLUMN IF NOT EXISTS redirect_enabled boolean DEFAULT false;

ALTER TABLE IF EXISTS public.service_pages
ADD COLUMN IF NOT EXISTS redirect_url text;

-- Ensure RLS remains as before (no changes here).