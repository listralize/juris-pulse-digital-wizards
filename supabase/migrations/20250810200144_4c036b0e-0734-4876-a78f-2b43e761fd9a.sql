
-- Criar tabela para depoimentos/testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image TEXT,
  position TEXT,
  company TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo
INSERT INTO public.testimonials (name, text, rating, image, position, company, display_order) VALUES
  ('Maria Silva', 'Excelente atendimento! Resolveram meu caso rapidamente e com muita competência.', 5, null, 'Empresária', 'Silva & Cia', 1),
  ('João Santos', 'Equipe muito profissional. Recomendo para quem precisa de assessoria jurídica de qualidade.', 5, null, 'Diretor', 'Santos Ltda', 2),
  ('Ana Costa', 'Fiquei impressionada com a dedicação e conhecimento técnico dos advogados.', 5, null, 'Consultora', 'Costa Consulting', 3),
  ('Pedro Oliveira', 'Serviço impecável! Conseguiram resolver uma questão complexa de forma eficiente.', 5, null, 'CEO', 'Oliveira Tech', 4);

-- Adicionar campo testimonials_config no step_forms se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'step_forms' AND column_name = 'testimonials_config'
  ) THEN
    ALTER TABLE public.step_forms 
    ADD COLUMN testimonials_config JSONB DEFAULT '{"enabled": false, "autoplay": true, "showDots": true, "interval": 5000}'::jsonb;
  END IF;
END $$;
