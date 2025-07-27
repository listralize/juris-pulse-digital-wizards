-- Configure webhook-receiver function as public (no JWT verification required)
UPDATE pg_catalog.pg_proc 
SET prosecdef = false 
WHERE proname = 'webhook_receiver';