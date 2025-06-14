
-- Inserir role de admin para o usuário específico
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'onfleekmidiacriativa@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verificar se o usuário existe e confirmar a inserção
SELECT 
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'onfleekmidiacriativa@gmail.com';
