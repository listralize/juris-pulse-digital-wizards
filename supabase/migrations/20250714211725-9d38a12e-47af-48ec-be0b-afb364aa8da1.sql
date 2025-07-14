-- Add missing columns to link_tree_items table
ALTER TABLE public.link_tree_items 
ADD COLUMN IF NOT EXISTS icon_size text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS icon_color text DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS card_size text DEFAULT 'medium', 
ADD COLUMN IF NOT EXISTS card_format text DEFAULT 'standard';