# Proposal

## Why

Atualmente, em telas menores e dispositivos móveis, os links de navegação principal da Dogueria Du Maluko são totalmente ocultados sem disponibilizar um menu alternativo, impedindo que o usuário navegue entre Início, Cardápio e Sobre Nós a partir do cabeçalho. Além disso, o carrinho de compras utiliza um painel flutuante com largura fixa e alinhamento absoluto que transborda a largura da tela em celulares pequenos, dificultando a visualização e interação com os itens do pedido e o botão de finalização.

Adequar a interface com um menu hambúrguer e um carrinho perfeitamente ajustado ao viewport móvel resolve esses problemas de usabilidade, tornando a experiência fluida, acessível e sem barras de rolagem horizontais indesejadas em qualquer smartphone ou tablet.

## What Changes

- **Menu Hambúrguer Responsivo**:
  - Inclusão do botão de acionamento do menu hambúrguer no cabeçalho em viewports móveis (`< lg`).
  - Implementação de um painel/gaveta deslizante (Mobile Drawer/Sheet) contendo os links de navegação (`INÍCIO`, `CARDÁPIO`, `SOBRE NÓS`), badge informativo de entrega e link de acesso à conta/perfil.
  - Animação suave de entrada/saída, backdrop escurecido, fechamento por clique externo, tecla ESC e clique em rotas.
  - Destaque visual para a rota ativa correspondente.

- **Carrinho de Compras Adaptativo para Telas Menores**:
  - Em telas móveis, o carrinho deixa de usar um dropdown flutuante com risco de overflow horizontal e passa a se abrir como uma gaveta lateral (Sheet/Drawer) ou painel responsivo com largura adaptada (`w-full max-w-sm` ou `fixed inset-y-0 right-0`), encaixando-se com margens seguras.
  - Ajuste ergonômico das áreas de toque (touch targets) dos botões de incremento/decremento de quantidade e remoção de itens.
  - Área de rolagem vertical interna (`overflow-y-auto`) dimensionada de forma a sempre manter o rodapé com total do pedido e botão de confirmar compra visível e acessível na tela.
  - Em telas maiores (desktop), preservação do comportamento elegante de dropdown flutuante ou drawer lateral condizente.

- **Ajustes de Responsividade Geral do Layout**:
  - Ajuste de espaçamentos e dimensionamento do logotipo e botões de ação no cabeçalho em telas estreitas (320px–390px) para evitar quebras de linha ou sobreposições.
  - Garantia de que a barra fixa e os modais respeitem áreas seguras de visualização (safe-areas) e alturas dinâmicas em dispositivos móveis (`100dvh`).

## Capabilities

### New Capabilities
- `navigation/mobile-nav`: Navegação responsiva com menu hambúrguer e painel deslizante para telas menores, garantindo acesso completo aos links da plataforma em dispositivos móveis.
- `cart/responsive-cart`: Exibição responsiva do carrinho de compras adaptada para telas menores e desktop, eliminando transbordamento horizontal e garantindo ergonomia de uso.

### Modified Capabilities
*(Nenhuma especificação anterior existente)*

## Impact

- **Componentes de Layout e Interface**:
  - `src/components/layout/Header.tsx`: integração do botão hamburguer, estado do menu móvel e renderização do drawer de navegação.
  - `src/components/cart/CartDropdown.tsx` (ou novo componente responsivo integrado): adaptação para drawer lateral/responsivo em mobile ou suporte a modal adaptável.
  - `src/components/ui/sheet.tsx`: utilização para drawers laterais acessíveis (aproveitando Radix UI já configurado no projeto).
- **Dependências & Estado**:
  - Utilização dos hooks e contextos já existentes (`useCart`, `useAuth`, `useIsMobile`, `react-router`).
  - Sem quebra de compatibilidade com as páginas existentes ou regras de negócio.
