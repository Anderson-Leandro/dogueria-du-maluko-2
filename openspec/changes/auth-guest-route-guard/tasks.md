# Tasks

## 1. Criar componente GuestRoute

- [x] 1.1 Criar o arquivo `src/components/routing/GuestRoute.tsx` com a lógica de redirecionamento: se `isAuthenticated === true`, renderiza `<Navigate to="/" replace />`; caso contrário, renderiza `{children}`. Verificar que o arquivo existe e não possui erros de TypeScript com `npx tsc --noEmit`.

## 2. Aplicar guarda nas rotas de convidado

- [x] 2.1 Em `src/App.tsx`, importar `GuestRoute` de `../components/routing/GuestRoute` e envolver os elementos das rotas `/login` e `/cadastro` com `<GuestRoute>`.

## 3. Verificação manual no browser

- [x] 3.1 Com o servidor rodando (`npm run dev`), fazer login e em seguida digitar `http://localhost:5173/login` na barra de endereços. Verificar que o browser redireciona imediatamente para `/` sem exibir o formulário de login.
- [x] 3.2 Repetir o teste para `http://localhost:5173/cadastro` enquanto autenticado. Verificar que o browser redireciona para `/`.
- [x] 3.3 Fazer logout e acessar `/login` e `/cadastro`. Verificar que os formulários são exibidos normalmente.

## Workflow follow-up

- Após revisão, arquivar a change com `/opsx-archive`.
