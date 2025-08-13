UPDATE marketing_settings 
SET facebook_pixel_enabled = false, facebook_pixel_id = null 
WHERE id = (SELECT id FROM marketing_settings LIMIT 1);