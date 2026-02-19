
-- Schedule weekly cleanup every Sunday at 3am UTC
SELECT cron.schedule(
  'weekly-analytics-cleanup',
  '0 3 * * 0',
  $$SELECT cleanup_old_analytics();$$
);
