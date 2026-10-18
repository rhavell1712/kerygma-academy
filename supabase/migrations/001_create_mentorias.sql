CREATE TABLE IF NOT EXISTS public.mentorias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug varchar(200) NOT NULL,
  title varchar(200) NOT NULL,
  category varchar(100) NOT NULL DEFAULT 'Mentoria',
  level varchar(50) NOT NULL DEFAULT 'Iniciante',
  description text NOT NULL,
  long text NOT NULL,
  topics text[] NOT NULL DEFAULT '{}',
  encontros varchar(100) NOT NULL DEFAULT 'A combinar',
  duracao varchar(100) NOT NULL DEFAULT 'A combinar',
  formato varchar(150) NOT NULL DEFAULT 'Ao vivo',
  para_quem varchar(200) NOT NULL DEFAULT 'Todos',
  image_url text,
  image_alt varchar(255),
  accent char(7) NOT NULL DEFAULT '#b91c2b',
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.mentorias ADD CONSTRAINT mentorias_slug_key UNIQUE (slug);

ALTER TABLE public.mentorias ADD CONSTRAINT mentorias_slug_check
  CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

ALTER TABLE public.mentorias ADD CONSTRAINT mentorias_accent_check
  CHECK (accent ~ '^#[0-9a-fA-F]{6}$');

CREATE INDEX idx_mentorias_published ON public.mentorias (published);
CREATE INDEX idx_mentorias_published_sort ON public.mentorias (published, sort_order);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER mentorias_updated_at
  BEFORE UPDATE ON public.mentorias
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

GRANT SELECT ON public.mentorias TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.mentorias TO authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
