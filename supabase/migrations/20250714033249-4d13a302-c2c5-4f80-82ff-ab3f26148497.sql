-- Criar tabela para o Link Tree
CREATE TABLE public.link_tree (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Meu Link Tree',
  description TEXT,
  background_color TEXT DEFAULT '#000000',
  text_color TEXT DEFAULT '#ffffff',
  button_style TEXT DEFAULT 'rounded',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para os links do Link Tree
CREATE TABLE public.link_tree_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_tree_id UUID REFERENCES public.link_tree(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  background_color TEXT DEFAULT '#ffffff',
  text_color TEXT DEFAULT '#000000',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.link_tree ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_tree_items ENABLE ROW LEVEL SECURITY;

-- Políticas para link_tree
CREATE POLICY "Public can read active link tree"
ON public.link_tree
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage link tree"
ON public.link_tree
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Políticas para link_tree_items
CREATE POLICY "Public can read active link tree items"
ON public.link_tree_items
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage link tree items"
ON public.link_tree_items
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_link_tree_updated_at
BEFORE UPDATE ON public.link_tree
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_link_tree_items_updated_at
BEFORE UPDATE ON public.link_tree_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();