# Mispá Treinamentos (kerygma-academy)

Site institucional da Mispá Treinamentos com vitrine de mentorias ao vivo e painel administrativo para gerenciar o catálogo e acompanhar interessados (cliques no WhatsApp).

## Tecnologias

- **[Next.js 16](https://nextjs.org)** (App Router, React Server Components) — React 19
- **[Tailwind CSS 4](https://tailwindcss.com)** (via `@tailwindcss/postcss`)
- **[Supabase](https://supabase.com)** — banco de dados PostgreSQL, autenticação e storage de imagens (`@supabase/ssr` + `supabase-js`)
- **[lucide-react](https://lucide.dev)** — ícones

## Estrutura do projeto

```
├── public/img/                  # Imagens locais (logo, professor, capas)
├── src/
│   ├── proxy.ts                 # Middleware (Next 16): protege /admin, força login
│   ├── app/
│   │   ├── layout.tsx           # Layout raiz, fontes e script de tema/paleta
│   │   ├── globals.css          # Temas (dark/light), 4 paletas, animações
│   │   ├── (landing)/           # Página pública (rota /)
│   │   │   ├── page.tsx         # Busca mentorias publicadas e monta a vitrine
│   │   │   ├── header/          # Navbar + toggle de tema + menu de paletas
│   │   │   ├── hero/            # Hero decorativo
│   │   │   ├── cursos/          # Cards de mentorias + modal de detalhe
│   │   │   ├── mentoria/        # Seção "Como funciona"
│   │   │   ├── professor/       # Seção "Quem ensina"
│   │   │   ├── footer/          # Rodapé
│   │   │   ├── whatsapp/        # Botão flutuante de WhatsApp
│   │   │   └── admin-entry/     # Acesso ao painel (flutuante + navbar, só admins)
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       ├── page.tsx     # Painel: orquestra abas, formulário e diálogos
│   │   │       ├── _components/ # Form de mentoria, header e seções do painel
│   │   │       ├── settings/    # Configurações: perfil, administradores, senha
│   │   │       └── login/       # Login do administrador
│   │   └── actions/
│   │       ├── mentorias.ts     # Server actions: login, logout, CRUD de mentorias
│   │       ├── leads.ts         # Server actions: registrar/limpar/ listar leads
│   │       └── settings.ts      # Server actions: perfil, senha e administradores
│   ├── components/
│   │   ├── animations/          # Reveal, TextReveal, Stagger (scroll animations)
│   │   └── shared/              # cover, confirm-dialog, select-menu, whatsapp-icon
│   ├── hooks/
│   │   ├── use-admin-access.ts  # Verifica se a sessão é de administrador
│   │   ├── use-appearance.ts    # Estado de tema e paleta (data-theme/data-palette)
│   │   └── use-in-view.ts       # IntersectionObserver para animações
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Cliente Supabase (browser)
│   │   │   └── server.ts        # Cliente Supabase (server, com cookies)
│   │   ├── mentorias.ts         # Tipo Mentoria (view da UI, camelCase)
│   │   ├── site.ts              # Número do WhatsApp e helper waLink()
│   │   └── track-lead.ts        # Wrapper client para registrar cliques
│   └── services/
│       └── mentorias.ts         # Acesso ao Supabase (list/create/update/delete)
└── supabase/
    ├── config.toml              # Configuração da CLI do Supabase
    └── migrations/              # Migrations do banco (ver ordem abaixo)
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz:

```bash
NEXT_PUBLIC_SUPABASE_URL=<url-do-projeto-supabase>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<chave-publica-anon>
```

Ambas as variáveis ficam no painel do Supabase em **Project Settings → API**. O `.env.local` está no `.gitignore` e nunca deve ser commitado.

Opcional (apenas servidor): `SUPABASE_SECRET_KEY` — habilita o envio de convites de administrador pelo painel de configurações. Nunca use o prefixo `NEXT_PUBLIC_` em chaves secretas.

## Configuração do Supabase

### 1. Estrutura do banco (migrations)

As migrations em `supabase/migrations/` devem ser aplicadas **em ordem numérica**:

| Arquivo | O que faz |
|---|---|
| `001_create_mentorias.sql` | Cria a tabela `mentorias`, constraints, índices e trigger de `updated_at` |
| `002_create_admin_users_and_rls.sql` | Cria `admin_users` (lista branca de admins) e habilita RLS em `mentorias` |
| `003_seed_mentorias.sql` | Insere as 6 mentorias iniciais publicadas |
| `004_leads_and_fix_admin_rls.sql` | Corrige recursão RLS em `admin_users`, cria tabela `leads` e o bucket `mentoria-images` |
| `005_harden_admin_users_rls.sql` | Recria a política de leitura de `admin_users` de forma idempotente |
| `006_test_seed_many_mentorias.sql` | **Teste:** insere 24 mentorias temporárias de carga |
| `007_test_cleanup_mentorias.sql` | **Teste:** remove as linhas inseridas por 006 (saldo líquido zero) |
| `008_admin_settings.sql` | Configurações do admin: funções `is_admin`/`sync_admin_email`/`add_admin_by_email` e RLS de listagem/inclusão/revogação de administradores |

O bucket de storage `mentoria-images` é criado pela migration 004 (público, 2 MB máx., formatos jpeg/png/webp/avif).

### 2. Aplicar migrations no banco remoto

> **Atenção:** `supabase db push` aplica migrations **pendentes** do diretório local ao banco remoto do projeto vinculado. Antes de executar:
>
> 1. Confirme o vínculo do projeto: `supabase projects list` e `supabase status` (o projeto esperado é `mispa-treinamentos`, ref `wtziftmsttlnrdspsmuh`).
> 2. Confira o histórico de migrations já aplicadas no remoto: `supabase migration list` (mostra quais arquivos locais ainda estão pendentes).
> 3. Revise o conteúdo das migrations pendentes para saber exatamente o que será alterado.
> 4. Só então execute `supabase db push`.

Não execute `db push` sem essas verificações — ele altera o banco de produção.

## Cadastrar o primeiro administrador

O login do painel exige **duas** coisas: um usuário autenticado no Supabase Auth **e** uma linha correspondente na tabela `public.admin_users` (lista branca). Sem a linha em `admin_users`, o login é recusado mesmo com credenciais válidas.

1. **Crie o usuário** no painel do Supabase em **Authentication → Users → Add user** (informe e-mail e senha, marque *Auto Confirm User*).
   - Alternativa: habilitar o signup público em **Authentication → Providers → Email** e registrar-se pela URL `/admin/login` (o formulário de signup aparece se o fluxo estiver ativo) — em seguida faça o passo 2.
2. **Adicione a linha de administrador** no **SQL Editor** do Supabase (substitua pelos valores reais):

   ```sql
   INSERT INTO public.admin_users (user_id, email)
   VALUES ('<uuid-do-usuario>', 'email@exemplo.com');
   ```

   O `user_id` é o ID exibido na lista de usuários de Authentication.
3. Acesse `/admin/login` no site e entre com o e-mail e a senha criados.

Para revogar o acesso, basta excluir a linha de `public.admin_users` (o usuário continua existindo no Auth, mas perde acesso ao painel e aos dados protegidos por RLS). Também é possível revogar pela área **Configurações → Administradores** do painel (`/admin/settings`).

Na mesma área, um administrador pode adicionar outro administrador informando o e-mail: a pessoa precisa ter uma conta **confirmada** no Supabase Auth (informar apenas um e-mail não concede acesso). Se a variável `SUPABASE_SECRET_KEY` (chave secreta do projeto, em Project Settings → API) estiver configurada no servidor, o painel envia um convite por e-mail pelo próprio Supabase Auth; sem ela, a conta deve ser criada antes em **Authentication → Users**.

> **Recomendação de segurança:** como os administradores são criados manualmente, desabilite o cadastro público em **Authentication → Providers → Email → Enable sign ups** no painel do Supabase. Contas criadas por signup continuam sem acesso ao painel (a RLS bloqueia), mas poluem a lista de usuários. Essa configuração é feita no painel do Supabase em nuvem — o `supabase/config.toml` deste repositório só afeta o ambiente local.

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (http://localhost:3000)
npm run build    # build de produção
npm run lint     # ESLint
npm start        # rodar o build de produção
```

## Rotas principais

| Rota | Descrição |
|---|---|
| `/` | Landing pública com vitrine de mentorias |
| `/admin` | Painel administrativo (exige login; protegido por `src/proxy.ts` + RLS) |
| `/admin/settings` | Configurações: perfil, administradores e senha (exige login + `admin_users`) |
| `/admin/login` | Login do administrador |
