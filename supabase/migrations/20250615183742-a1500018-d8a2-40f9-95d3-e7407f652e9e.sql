
-- Remove registros sem conteúdo essencial: sem título, sem descrição, sem categoria_id ou sem href
DELETE FROM service_pages
WHERE 
  (title IS NULL OR TRIM(title) = '')
  OR (description IS NULL OR TRIM(description) = '')
  OR (category_id IS NULL)
  OR (href IS NULL OR TRIM(href) = '');

-- Remove duplicatas por 'href', mantendo apenas o mais recente (maior created_at)
DELETE FROM service_pages
WHERE id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY href ORDER BY created_at DESC) as rn
    FROM service_pages
    WHERE href IS NOT NULL AND TRIM(href) <> ''
  ) sub
  WHERE sub.rn = 1
);
