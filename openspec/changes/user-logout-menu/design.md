# Design

## Context

Ver `proposal.md - Why` para motivação.

**Estado atual relevante:**
- `Header.tsx` já possui estado `mobileMenuOpen` (boolean) que controla a abertura do drawer. O botão de usuário está na linha 108–118, **fora** do bloco `!isAuthPath`.
- O botão de usuário no estado atual navega para `/perfil` (quando autenticado) ou `/login` (quando não autenticado). Não há dropdown.
- `MobileNavDrawer.tsx` já importa `useAuth` e exibe dados do usuário no rodapé, mas também navega para `/perfil` quando autenticado.
- `useAuth()` expõe `{ isAuthenticated, user, logout }`.
- O projeto usa `lucide-react` (já instalado): ícones disponíveis incluem `LogOut`, `LogIn`, `User`, `ChevronRight`.

## Goals / Non-Goals

**Goals:**
- Dropdown de usuário na header desktop com logout/login.
- Botão de usuário oculto na header quando o drawer mobile estiver aberto.
- Logout direto no rodapé do drawer mobile.
- Fechar dropdown ao clicar fora (overlay / click-outside).

**Non-Goals:**
- Criar página de perfil (`/perfil`).
- Animações complexas no dropdown.
- Dropdown no drawer mobile (a ação de logout é direta, sem submenu).

## Decisions

### Decisão 1: Dropdown inline em `Header.tsx` via estado local

**Escolhido:** Adicionar estado `userMenuOpen` (boolean) em `Header.tsx`. O dropdown é renderizado como `div` posicionado absolutamente abaixo do botão. Um overlay invisível (ou listener `onBlur`/`useEffect` com `mousedown`) fecha o menu ao clicar fora.

**Alternativa descartada:** Criar um componente `UserDropdown.tsx` separado.

**Rationale:** A lógica é simples (2 estados, ≤ 3 opções). Manter inline em `Header.tsx` evita prop-drilling e mantém o contexto coeso. Se crescer (ex.: link para perfil, pedidos), extrair para componente próprio é uma refatoração trivial.

---

### Decisão 2: Ocultar botão de usuário via `mobileMenuOpen`

**Escolhido:** Envolver o botão de usuário numa condicional `{!mobileMenuOpen && (...)}`.

**Alternativa descartada:** Usar CSS `hidden`/`opacity-0` quando o drawer está aberto.

**Rationale:** A ocultação via condicional é semântica — o elemento não existe no DOM quando o drawer está aberto, eliminando foco ou interação acidental. O `mobileMenuOpen` já é um estado existente em `Header.tsx`, portanto sem custo adicional.

---

### Decisão 3: Logout direto no drawer mobile (sem dropdown)

**Escolhido:** Substituir o `onClick` do botão de usuário no rodapé do `MobileNavDrawer` por uma chamada `logout()` + `onClose()` quando `isAuthenticated === true`.

**Alternativa descartada:** Adicionar um submenu ou modal de confirmação.

**Rationale:** O espaço do drawer já é constrangido. A ação de logout é destrutiva mas reversível (o usuário pode logar novamente); confirmação seria atrito excessivo para um app de pedidos.

---

### Decisão 4: Fechar dropdown ao clicar fora

**Escolhido:** `useEffect` com listener `mousedown` no `document`; se o clique não for dentro do ref do dropdown, fecha.

**Rationale:** Padrão estabelecido em React para click-outside sem bibliotecas externas. Mantém o bundle enxuto.

## Risks / Trade-offs

- **Dropdown no mobile:** O dropdown da header **não** aparece no mobile (o botão de usuário some quando o drawer está aberto), então não há conflito com o espaço reduzido de tela. Se o drawer estiver fechado e a tela for pequena, o dropdown pode sair da área visível — mitigado usando `right-0` no posicionamento.
- **Sem confirmação de logout:** Por decisão, logout é imediato. Caso o usuário clique acidentalmente, terá que logar novamente. Aceitável para o contexto do produto.
