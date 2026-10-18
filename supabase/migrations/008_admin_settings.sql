-- Configurações do administrador: listagem/gerência de administradores,
-- sincronização de e-mail e inclusão por e-mail com segurança.
-- Todas as funções usam SECURITY DEFINER para consultar auth.users e a
-- própria admin_users sem recursão RLS (mesmo padrão da migração 004).

-- 1. Função auxiliar: verifica se o usuário autenticado é administrador.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

-- 2. Mantém o e-mail da admin_users alinhado ao e-mail confirmado no Auth.
CREATE OR REPLACE FUNCTION public.sync_admin_email()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  UPDATE public.admin_users
  SET email = lower((SELECT email FROM auth.users WHERE id = auth.uid()))
  WHERE user_id = auth.uid()
    AND email IS DISTINCT FROM lower((SELECT email FROM auth.users WHERE id = auth.uid()));
END;
$$;

-- 3. Inclui um administrador a partir de um e-mail já cadastrado no Auth.
-- O e-mail precisa existir e estar confirmado: informar apenas um endereço
-- não concede acesso — a pessoa precisa ter uma conta verificada.
CREATE OR REPLACE FUNCTION public.add_admin_by_email(p_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_email text := lower(trim(p_email));
  v_uid uuid;
  v_confirmed timestamptz;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()) THEN
    RAISE EXCEPTION 'sem_permissao';
  END IF;

  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RETURN 'invalid_email';
  END IF;

  SELECT id, email_confirmed_at INTO v_uid, v_confirmed
  FROM auth.users
  WHERE lower(email) = v_email
  LIMIT 1;

  IF v_uid IS NULL THEN
    RETURN 'no_account';
  END IF;

  IF v_confirmed IS NULL THEN
    RETURN 'unconfirmed';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = v_uid OR email = v_email
  ) THEN
    RETURN 'already';
  END IF;

  INSERT INTO public.admin_users (user_id, email)
  VALUES (v_uid, v_email);

  RETURN 'added';
END;
$$;

-- 4. Políticas RLS: administradores podem listar, incluir e revogar;
-- ninguém remove a própria linha (evita perda acidental de acesso).
DROP POLICY IF EXISTS "admin_users_select_admins" ON public.admin_users;
CREATE POLICY "admin_users_select_admins" ON public.admin_users
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "admin_users_insert_admins" ON public.admin_users;
CREATE POLICY "admin_users_insert_admins" ON public.admin_users
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_users_delete_admins" ON public.admin_users;
CREATE POLICY "admin_users_delete_admins" ON public.admin_users
  FOR DELETE TO authenticated
  USING (public.is_admin() AND user_id <> auth.uid());

GRANT SELECT, INSERT, DELETE ON public.admin_users TO authenticated;

-- 5. Permissões de execução das funções apenas para usuários autenticados.
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.sync_admin_email() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.add_admin_by_email(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.sync_admin_email() TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_admin_by_email(text) TO authenticated;
