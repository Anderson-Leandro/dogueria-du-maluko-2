# Tasks

## 1. Menu Hambúrguer Móvel e Navegação

- [x] 1.1 Criar componente de gaveta móvel (`MobileNavDrawer`) com lista de links de navegação (`/`, `/cardapio`, `/sobre`), badge de delivery, atalho de perfil, fechamento automático na navegação e destaque para rota ativa, verificando renderização e transição suave.
- [x] 1.2 Integrar botão de menu hambúrguer no cabeçalho (`Header.tsx`) visível apenas em telas menores (`lg:hidden`), conectando ao controle de abertura e fechamento da gaveta móvel e verificando alternância visual entre desktop (menu horizontal) e mobile (botão hambúrguer).

## 2. Carrinho de Compras Responsivo

- [x] 2.1 Refatorar `CartDropdown.tsx` para exibição adaptativa: gaveta lateral / painel responsivo com largura segura (`w-full max-w-sm sm:max-w-md`) e backdrop em telas menores (< 640px), mantendo dropdown flutuante em viewports maiores, verificando ausência de transbordo horizontal (overflow) em telas de 320px a 400px.
- [x] 2.2 Reestruturar a rolagem interna do carrinho com flexbox (`flex flex-col h-full`), garantindo lista de itens rolável com alvos de toque confortáveis (+, -, lixeira) e rodapé fixo com total e botão "CONFIRMAR COMPRA" sempre visível no campo de visão, verificando acessibilidade em orientações retrato e paisagem.
- [x] 2.3 Garantir que ações de adicionar, alterar quantidade, esvaziar e fechar o carrinho funcionem fluidamente no modo móvel com bloqueio de rolagem do body quando aberto, verificando integridade reativa dos contadores e totais.

## 3. Ajustes de Responsividade Geral e Validação

- [x] 3.1 Otimizar espaçamentos e dimensionamento do logotipo (`h-9 sm:h-12`) e botões do cabeçalho para acomodar hambúrguer, usuário e carrinho em linha única em viewports ultraestreitos (320px–360px), verificando ausência de quebra de layout no navegador.
- [x] 3.2 Executar verificação de compilação com `npm run build` e validação visual responsiva nos breakpoints de 320px, 375px, 768px e 1280px, verificando ausência de erros de tipagem e perfeita experiência do usuário.
