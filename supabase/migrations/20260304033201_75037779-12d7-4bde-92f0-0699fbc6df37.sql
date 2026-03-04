
UPDATE public.step_forms
SET steps = (
  SELECT jsonb_agg(
    CASE
      WHEN step->>'type' = 'form' AND (step->'formFields') IS NOT NULL
      THEN jsonb_set(
        step,
        '{formFields}',
        (step->'formFields') || '[{"name":"Email","type":"email","label":"Seu melhor e-mail","placeholder":"seuemail@exemplo.com","required":false}]'::jsonb
      )
      ELSE step
    END
  )
  FROM jsonb_array_elements(steps) AS step
)
WHERE slug = 'divorcioform';
