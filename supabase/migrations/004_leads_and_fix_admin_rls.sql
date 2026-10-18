-- Corrige a recursão RLS em admin_users, cria a tabela de leads
-- e o bucket público de imagens das mentorias.

-- 1. Corrige a política de leitura de admin_users.
-- A política anterior consultava a própria tabela admin_users dentro de uma
-- política de admin_users, o que gera recursão infinita no PostgreSQL.
-- A nova política compara a coluna diretamente com auth.uid(), sem subconsulta.
DROP POLICY IF EXISTS "admin_users_select_admin" ON public.admin_users;

CREATE POLICY "admin_users_select_own" ON public.admin_users
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 2. Tabela de interessados (cliques no WhatsApp).
-- Sem chave estrangeira: o histórico de leads deve sobreviver à exclusão
-- de uma mentoria.
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentoria_slug varchar(200),
  mentoria_title varchar(200) NOT NULL,
  origem varchar(50) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_mentoria_title ON public.leads (mentoria_title);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, DELETE ON public.leads TO authenticated;

-- Qualquer visitante pode registrar interesse, mas ninguém anônimo lê ou apaga.
DROP POLICY IF EXISTS "leads_insert_public" ON public.leads;
CREATE POLICY "leads_insert_public" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(mentoria_title) BETWEEN 1 AND 200);

DROP POLICY IF EXISTS "leads_select_admin" ON public.leads;
CREATE POLICY "leads_select_admin" ON public.leads
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "leads_delete_admin" ON public.leads;
CREATE POLICY "leads_delete_admin" ON public.leads
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

-- 3. Bucket público de imagens das mentorias.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'mentoria-images',
  'mentoria-images',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Leitura livre; escrita apenas para o administrador autorizado.
DROP POLICY IF EXISTS "mentoria_images_select" ON storage.objects;
CREATE POLICY "mentoria_images_select" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'mentoria-images');

DROP POLICY IF EXISTS "mentoria_images_insert" ON storage.objects;
CREATE POLICY "mentoria_images_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'mentoria-images'
    AND EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "mentoria_images_update" ON storage.objects;
CREATE POLICY "mentoria_images_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'mentoria-images'
    AND EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "mentoria_images_delete" ON storage.objects;
CREATE POLICY "mentoria_images_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'mentoria-images'
    AND EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE user_id = auth.uid()
    )
  );
