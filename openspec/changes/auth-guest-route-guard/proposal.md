# Proposal

## Why

Atualmente, um usuário autenticado consegue acessar diretamente `/login` e `/cadastro` sem ser redirecionado, o que gera uma experiência inconsistente: o formulário de login ou cadastro é exibido para alguém que já possui sessão ativa. A correção protege essas rotas de "convidado" e garante que usuários logados sejam sempre enviados à tela inicial.

## What Changes

- Introdução de um componente **`GuestRoute`** (ou equivalente inline em `App.tsx`) que verifica `isAuthenticated` via `useAuth()`.
- As rotas `/login` e `/cadastro` em `src/App.tsx` passam a ser envolvidas por esse guarda.
- Quando `isAuthenticated === true`, qualquer tentativa de acessar `/login` ou `/cadastro` resulta em redirecionamento imediato para `/` (sem adicionar entrada no histórico).
- Usuários não autenticados continuam acessando `/login` e `/cadastro` normalmente.

## Capabilities

### New Capabilities

- `auth/guest-route-guard`: Proteção de rotas destinadas apenas a usuários não autenticados; redireciona automaticamente para a tela inicial quando o usuário já possui sessão ativa.

### Modified Capabilities

<!-- Nenhuma capability existente tem seus requisitos alterados -->

## Impact

- **`src/App.tsx`**: Adicionar import de `GuestRoute` e envolver as rotas `/login` e `/cadastro`.
- **`src/components/routing/GuestRoute.tsx`** (novo): Componente de guarda que lê `isAuthenticated` e renderiza `<Navigate to="/" replace />` ou os filhos conforme o estado.
- Sem impacto em rotas existentes, sem alteração de API ou dependências externas.
