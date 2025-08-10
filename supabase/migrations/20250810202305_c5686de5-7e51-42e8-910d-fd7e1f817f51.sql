-- Add tracking_config column to step_forms table
ALTER TABLE public.step_forms 
ADD COLUMN tracking_config jsonb DEFAULT '{"facebook_pixel": {"enabled": false, "pixel_id": ""}, "google_analytics": {"enabled": false, "tracking_id": ""}, "google_tag_manager": {"enabled": false, "container_id": ""}}'::jsonb;