-- Criar tabela para prova social/depoimentos
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  position TEXT,
  company TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas para testimonials (apenas admin pode gerenciar, todos podem ver ativos)
CREATE POLICY "Testimonials são visíveis publicamente se ativo"
ON public.testimonials
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins podem gerenciar testimonials"
ON public.testimonials
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir alguns depoimentos de exemplo
INSERT INTO public.testimonials (name, text, rating, position, company) VALUES
('Ana Silva', 'Excelente serviço! Muito profissional e atendimento nota 10.', 5, 'Empresária', 'Silva & Associados'),
('João Santos', 'Resolveram meu problema rapidamente. Recomendo a todos!', 5, 'Gerente', 'Tech Solutions'),
('Maria Oliveira', 'Atendimento excepcional, equipe muito competente.', 5, 'Diretora', 'Marketing Pro');