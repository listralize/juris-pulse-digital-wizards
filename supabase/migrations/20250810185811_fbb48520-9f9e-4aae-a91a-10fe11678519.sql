-- Add global_social_proof column to admin_settings table
ALTER TABLE public.admin_settings
ADD COLUMN global_social_proof JSONB DEFAULT '{
  "enabled": false,
  "testimonials": [],
  "stats": [],
  "primaryColor": "#D4A574"
}'::jsonb;