
ALTER TABLE public.step_forms 
ADD COLUMN page_type text NOT NULL DEFAULT 'quiz';

ALTER TABLE public.step_forms 
ADD COLUMN sections jsonb DEFAULT '[]'::jsonb;
