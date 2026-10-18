-- Torna a leitura de admin_users à prova de falhas para o login.
-- O Dashboard consulta como postgres (ignora RLS); o site consulta como o
-- usuário autenticado (passa pela RLS). Se qualquer política antiga ou
-- permissão faltar, o login é recusado mesmo com a linha existindo.

-- Remove TODAS as políticas de SELECT existentes (inclusive a antiga
-- recursiva "admin_users_select_admin", se por algum motivo sobreviveu).
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'admin_users'
      AND cmd = 'SELECT'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.admin_users', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY "admin_users_select_own" ON public.admin_users
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Garante que o papel authenticated consegue ler a tabela mesmo que os
-- default privileges do projeto estejam fora do padrão.
GRANT SELECT ON public.admin_users TO authenticated;
