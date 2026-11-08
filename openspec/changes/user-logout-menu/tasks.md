# Tasks

## 1. Dropdown de usuário e ocultação do botão na header desktop

- [x] 1.1 Em `src/components/layout/Header.tsx`, adicionar estado `userMenuOpen` (boolean, inicialmente `false`) e um `ref` para o container do dropdown. Implementar `useEffect` com listener `mousedown` no `document` para fechar o dropdown ao clicar fora do container. Verificar que o estado e o ref estão criados sem erros de TypeScript.

- [x] 1.2 Substituir o `onClick` do botão de usuário por um toggle de `userMenuOpen` (quando `!mobileMenuOpen`). Certificar que o botão ainda exibe o ícone `<User />` e mantém todos os estilos visuais existentes. Verificar visualmente no browser que o clique abre/fecha o dropdown.

- [x] 1.3 Implementar o dropdown abaixo do botão de usuário: quando `userMenuOpen === true` e `isAuthenticated === true`, exibir o nome/e-mail do usuário e um botão "Sair" que chama `logout()` e fecha o dropdown. Quando `userMenuOpen === true` e `isAuthenticated === false`, exibir links "Entrar" (→ `/login`) e "Cadastrar" (→ `/cadastro`) que fecham o dropdown e navegam. Verificar os dois fluxos no browser.

- [x] 1.4 Envolver o botão de usuário (e seu dropdown) em `{!mobileMenuOpen && (...)}` para que ambos sumam quando o drawer mobile estiver aberto. Verificar no browser em viewport < 1024px: ao abrir o hamburger o botão de usuário desaparece; ao fechar o drawer ele reaparece.

## 2. Logout no drawer mobile

- [x] 2.1 Em `src/components/layout/MobileNavDrawer.tsx`, importar `LogOut` de `lucide-react`. No botão do rodapé, quando `isAuthenticated === true`, substituir o `onClick` atual (que navega para `/perfil`) por uma chamada a `logout()` seguida de `onClose()`. Atualizar o ícone do botão de `<ChevronRight />` para `<LogOut />` e o label secundário de "Ver perfil" para "Sair da conta". Verificar no browser que clicar em "Sair" desloga o usuário e fecha o drawer.

## 3. Verificação integrada

- [x] 3.1 Testar fluxo completo no browser em desktop (≥ 1024px): (1) fazer login → botão de usuário mostra ícone com borda colorida → clicar → dropdown abre com nome e "Sair" → clicar "Sair" → usuário deslogado. (2) sem login → clicar botão → dropdown com "Entrar" e "Cadastrar" → clicar "Entrar" → navega para `/login`.

- [x] 3.2 Testar fluxo completo no browser em mobile (< 1024px): (1) abrir drawer → botão de usuário some da header → rodapé do drawer exibe nome/email com ícone "Sair" → clicar "Sair" → usuário deslogado e drawer fecha. (2) sem login → rodapé exibe "Entrar ou Cadastrar" → clicar → navega para `/login`.

- [x] 3.3 Verificar que clicar fora do dropdown (em qualquer área da página) fecha o dropdown sem efeito colateral.

## Workflow follow-up

- Após revisão, arquivar a change com `/opsx-archive`.
