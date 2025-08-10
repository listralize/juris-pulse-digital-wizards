-- Create table for global social proof configuration
CREATE TABLE public.global_social_proof (
  id INTEGER PRIMARY KEY DEFAULT 1,
  config JSONB NOT NULL DEFAULT '{
    "enabled": false,
    "testimonials": [],
    "stats": [],
    "primaryColor": "#D4A574"
  }'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default configuration
INSERT INTO public.global_social_proof (id, config) VALUES (
  1, 
  '{
    "enabled": false,
    "testimonials": [
      {
        "name": "João Silva",
        "rating": 5,
        "text": "Excelente atendimento e resultados incríveis!"
      },
      {
        "name": "Maria Santos", 
        "rating": 5,
        "text": "Profissionais muito competentes, recomendo!"
      }
    ],
    "stats": [
      {
        "number": "500+",
        "label": "Clientes Atendidos"
      },
      {
        "number": "95%",
        "label": "Taxa de Sucesso"
      }
    ],
    "primaryColor": "#D4A574"
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.global_social_proof ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing (public access)
CREATE POLICY "Global social proof is viewable by everyone" 
ON public.global_social_proof 
FOR SELECT 
USING (true);

-- Create policy for admins to modify
CREATE POLICY "Only admins can modify global social proof" 
ON public.global_social_proof 
FOR ALL 
USING (auth.uid() IS NOT NULL);