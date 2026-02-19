
-- 1. Delete admin_settings duplicates (keep most recent)
DELETE FROM admin_settings 
WHERE id != '68ad83e9-7172-48d5-a519-045e980df900';

-- 2. Run cleanup_old_analytics to summarize and delete old website_analytics
SELECT cleanup_old_analytics();

-- 3. Delete footer_info duplicates (keep most recent)
DELETE FROM footer_info 
WHERE id != (SELECT id FROM footer_info ORDER BY updated_at DESC NULLS LAST LIMIT 1);

-- 4. Delete contact_info duplicates (keep most recent)
DELETE FROM contact_info 
WHERE id != (SELECT id FROM contact_info ORDER BY updated_at DESC NULLS LAST LIMIT 1);

-- 5. Delete all expired edge_rate_limits
DELETE FROM edge_rate_limits;
