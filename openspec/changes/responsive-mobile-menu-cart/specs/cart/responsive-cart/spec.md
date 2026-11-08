# Spec Delta

## Purpose

Garante uma experiência de visualização e manipulação do carrinho de compras perfeitamente ajustada tanto para telas menores quanto para computadores de mesa, prevenindo transbordamento lateral e preservando a ergonomia de uso.

## ADDED Requirements

### Requirement: Responsive Viewport Cart Presentation
O sistema SHALL adaptar a apresentação do carrinho de compras conforme a largura da tela: em viewports móveis (largura inferior a 640px), o carrinho SHALL ser renderizado como uma gaveta lateral (Sheet/Drawer) ou painel com largura adaptada que não ultrapasse a largura da tela e sem provocar rolagem horizontal; em viewports maiores, o carrinho SHALL se abrir alinhado ao botão do carrinho.

#### Scenario: Abertura do carrinho em dispositivo móvel
- **WHEN** o usuário clicar no botão do carrinho em uma tela com largura menor que 640px
- **THEN** o carrinho é exibido ocupando uma gaveta lateral ajustada à tela sem transbordar horizontalmente nem cortar botões

#### Scenario: Abertura do carrinho em desktop
- **WHEN** o usuário clicar no botão do carrinho em uma tela desktop (largura igual ou superior a 640px)
- **THEN** o carrinho é exibido como um painel flutuante elegante ancorado próximo ao botão do carrinho

### Requirement: Safe Scrolling and Persistent Checkout Footer
O carrinho de compras SHALL manter o cabeçalho e o rodapé de checkout (com valor total e botão "CONFIRMAR COMPRA") sempre visíveis e fixos na área de exibição, enquanto a listagem de produtos permanece rolável verticalmente entre ambos.

#### Scenario: Carrinho com múltiplos itens em tela pequena
- **WHEN** o usuário tiver vários itens no carrinho e abrir a visualização em uma tela pequena
- **THEN** a lista de itens rola verticalmente e o botão "CONFIRMAR COMPRA" permanece visível e fixo no rodapé

### Requirement: Touch-friendly Cart Controls
Os controles de alteração de quantidade (+ / -) e remoção de item (ícone de lixeira) no carrinho SHALL possuir áreas de toque ergonomicamente acessíveis em dispositivos de toque, atualizando imediatamente o subtotal e o contador do cabeçalho.

#### Scenario: Alteração de quantidade de produto no carrinho
- **WHEN** o usuário tocar no botão de incremento (+) ou decremento (-) de um item
- **THEN** a quantidade do produto e o subtotal são recalculados instantaneamente sem fechar o carrinho

#### Scenario: Remoção de item do carrinho
- **WHEN** o usuário tocar no botão de remoção de um item
- **THEN** o item é removido do carrinho e o total do pedido é recalculado imediatamente

### Requirement: Empty Cart State
Quando o carrinho não contiver nenhum produto, o sistema SHALL exibir uma mensagem ilustrativa de carrinho vazio e manter o botão de confirmação de compra desabilitado.

#### Scenario: Carrinho sem itens
- **WHEN** o usuário abrir o carrinho sem nenhum produto adicionado
- **THEN** é exibida a mensagem informativa "Seu carrinho está vazio" e o botão "CONFIRMAR COMPRA" permanece desabilitado
