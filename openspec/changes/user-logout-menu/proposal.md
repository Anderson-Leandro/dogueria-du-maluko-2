# Proposal

## Why

Atualmente, o usuário autenticado não tem como realizar logout pela interface — o botão de usuário na header navega para `/perfil` (inexistente) e o botão no menu mobile também. A ausência de logout obriga o usuário a limpar o `localStorage` manualmente, comprometendo a experiência.

## What Changes

- O **botão de usuário na header desktop** passa a abrir um **dropdown** contextual ao clique, com opção de **Sair** (logout) quando o usuário estiver autenticado, ou link para **Entrar / Cadastrar** quando não estiver.
- O **botão de usuário na header desktop** fica **oculto** enquanto o menu hamburguer mobile estiver ativo (drawer aberto), evitando duplicidade visual.
- O **botão de usuário no rodapé do `MobileNavDrawer`** exibe uma opção de **Sair** diretamente (sem dropdown), substituindo a navegação para `/perfil` quando autenticado.
- Ao clicar em **Sair**, é chamado `logout()` do `AuthContext`; o usuário permanece na página atual (o `GuestRoute` redireciona automaticamente se necessário).
- Ao clicar em **Entrar / Cadastrar** (usuário não autenticado), o comportamento atual de navegação para `/login` é preservado.

## Capabilities

### New Capabilities

- `ui/user-menu`: Menu de conta do usuário acessível pela header e pelo drawer mobile, oferecendo logout para usuários autenticados e acesso ao login/cadastro para visitantes.

### Modified Capabilities

<!-- Nenhuma capability existente tem requisitos alterados -->

## Impact

- **`src/components/layout/Header.tsx`**: Adicionar estado para controlar dropdown do usuário; ocultar botão de usuário quando `mobileMenuOpen === true`; implementar dropdown com opção de logout/login.
- **`src/components/layout/MobileNavDrawer.tsx`**: Substituir navegação para `/perfil` por chamada direta a `logout()` quando autenticado.
- Sem novas dependências externas; usa `lucide-react` (já presente) e `useAuth()` (já importado em ambos os componentes).
