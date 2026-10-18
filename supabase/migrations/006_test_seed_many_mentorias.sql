-- Teste de carga (temporário): insere 24 mentorias publicadas para validar
-- que a vitrine exibe todos os treinamentos sem limite interno.
-- Removidas logo em seguida por 007_test_cleanup_mentorias.sql (saldo: zero).
INSERT INTO public.mentorias (slug, title, category, level, description, long, published, sort_order)
SELECT
  'teste-carga-' || lpad(g::text, 2, '0'),
  'Treinamento de teste ' || g,
  'Teste',
  'Iniciante',
  'Linha de teste criada para validar a exibição de múltiplos treinamentos.',
  'Descrição longa de teste para a vitrine.',
  true,
  5 + g
FROM generate_series(1, 24) AS g;
