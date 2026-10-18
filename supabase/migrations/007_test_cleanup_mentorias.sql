-- Remove as linhas de teste inseridas por 006_test_seed_many_mentorias.sql.
DELETE FROM public.mentorias WHERE slug LIKE 'teste-carga-%';
