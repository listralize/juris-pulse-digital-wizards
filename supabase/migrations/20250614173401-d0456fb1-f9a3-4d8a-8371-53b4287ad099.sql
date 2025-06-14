
-- Criar enum para roles de usuário
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Criar tabela de roles de usuário
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Habilitar RLS na tabela user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Função security definer para verificar roles (evita recursão RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Políticas RLS para user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Políticas RLS para tabelas administrativas
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only admins can access admin_settings"
  ON public.admin_settings
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage blog posts"
  ON public.blog_posts
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.law_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active categories"
  ON public.law_categories
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON public.law_categories
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.service_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active service pages"
  ON public.service_pages
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage service pages"
  ON public.service_pages
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.service_benefits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service benefits"
  ON public.service_benefits
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage service benefits"
  ON public.service_benefits
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.service_faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service FAQ"
  ON public.service_faq
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage service FAQ"
  ON public.service_faq
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.service_process_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service process steps"
  ON public.service_process_steps
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage service process steps"
  ON public.service_process_steps
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.service_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read service testimonials"
  ON public.service_testimonials
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage service testimonials"
  ON public.service_testimonials
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active team members"
  ON public.team_members
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage team members"
  ON public.team_members
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Tabelas públicas (sem restrições de admin)
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read contact info"
  ON public.contact_info
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage contact info"
  ON public.contact_info
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.footer_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read footer info"
  ON public.footer_info
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage footer info"
  ON public.footer_info
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON public.site_settings
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Inserir usuário admin inicial (substitua pelo email real do admin)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'admin@stadv.com.br'
ON CONFLICT (user_id, role) DO NOTHING;
