-- Add background_opacity column to link_tree table
ALTER TABLE public.link_tree 
ADD COLUMN IF NOT EXISTS background_opacity DECIMAL(3,2) DEFAULT 0.8;

-- Update existing records to have a default opacity
UPDATE public.link_tree 
SET background_opacity = 0.8 
WHERE background_opacity IS NULL;