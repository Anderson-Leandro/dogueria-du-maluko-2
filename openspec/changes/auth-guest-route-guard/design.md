# Design

## Context

O projeto usa **React Router v7** com `BrowserRouter` + `Routes`/`Route` em `src/App.tsx`. O estado de autenticação é gerenciado pelo `AuthProvider` (wrapper mais externo em `App`) e exposto via hook `useAuth()` que retorna `{ isAuthenticated, user, login, register, logout }`. Atualmente, as rotas `/login` e `/cadastro` são montadas diretamente sem qualquer verificação de sessão.

## Goals / Non-Goals

**Goals:**
- Proteger `/login` e `/cadastro` para que usuários autenticados sejam redirecionados para `/`.
- Manter código limpo, reutilizável e legível no arquivo de rotas.

**Non-Goals:**
- Proteger rotas que exigem autenticação (ex.: área do cliente, painel admin) — esse é um caso oposto (`PrivateRoute`), fora do escopo.
- Alterar a lógica de autenticação, sessão ou serviços existentes.
- Adicionar animações ou transições no redirecionamento.

## Decisions

### Decisão 1: Componente `GuestRoute` dedicado em vez de lógica inline

**Escolhido:** Criar `src/components/routing/GuestRoute.tsx` — um wrapper que lê `isAuthenticated` e renderiza `<Navigate to="/" replace />` ou `{children}`.

**Alternativa descartada:** Inline condicional diretamente em cada `<Route element={...}>` no `App.tsx`.

**Rationale:** Um componente nomeado deixa a intenção explícita no arquivo de rotas (`<GuestRoute>` comunica a semântica) e facilita adicionar novas rotas protegidas no futuro sem duplicar a lógica.

---

### Decisão 2: `replace` no `<Navigate>`

**Escolhido:** `<Navigate to="/" replace />` para não empilhar `/` no histórico do navegador quando o usuário autenticado é redirecionado.

**Rationale:** Se o usuário chegar em `/login` por digitação direta enquanto logado, pressionar "Voltar" no browser o levaria para fora da aplicação (como esperado), não para `/login` novamente — o que seria confuso.

---

### Decisão 3: Localização do componente

**Escolhido:** `src/components/routing/GuestRoute.tsx` — subpasta `routing/` dentro de `components/`.

**Alternativa descartada:** Diretório `src/guards/` ou arquivo inline em `App.tsx`.

**Rationale:** A pasta `components/routing/` sinaliza que o arquivo é um componente de roteamento (não lógica de negócio), mantendo consistência com a convenção de `src/components/`.

## Risks / Trade-offs

- **Estado transitório na inicialização:** O `AuthProvider` inicializa `user` a partir de `authService.getCurrentUser()` de forma síncrona (lê `localStorage`). Não há estado de "carregando" — o `isAuthenticated` já está correto no primeiro render. Portanto, **não há risco de flash** (piscar o formulário antes do redirect).
- **Sem testes automatizados presentes:** O projeto não possui uma suíte de testes; a verificação será manual via browser.
