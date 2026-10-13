# Spec Delta

## Purpose

Permite que usuários em dispositivos móveis e telas menores acessem os links de navegação e atalhos da Dogueria Du Maluko através de um menu hambúrguer com gaveta deslizante.

## ADDED Requirements

### Requirement: Mobile Hamburger Trigger Visibility
O sistema SHALL exibir um botão de menu hambúrguer no cabeçalho em viewports menores que 1024px (telas móveis e tablets) e ocultar os links da barra horizontal. Em viewports a partir de 1024px (desktop), o botão hambúrguer SHALL ser ocultado e a barra de links horizontal padrão SHALL ser exibida.

#### Scenario: Visualização em tela móvel
- **WHEN** a aplicação for carregada ou redimensionada para uma largura inferior a 1024px
- **THEN** o botão de acionamento do menu hambúrguer é exibido no cabeçalho e a barra de links horizontal fica oculta

#### Scenario: Visualização em desktop
- **WHEN** a aplicação for visualizada em tela com largura igual ou superior a 1024px
- **THEN** o menu horizontal é exibido normalmente e o botão de menu hambúrguer permanece oculto

### Requirement: Mobile Drawer Navigation Interaction
O sistema SHALL abrir um menu gaveta lateral (Drawer/Sheet) deslizante ao clicar no botão hambúrguer e permitir fechá-lo pelo botão de fechar, pelo clique no backdrop ou pela tecla Escape.

#### Scenario: Abertura do menu hambúrguer
- **WHEN** o usuário clicar no botão de menu hambúrguer
- **THEN** a gaveta de navegação desliza para visualização com animação suave e o foco/backdrop é ativado

#### Scenario: Fechamento por botão ou backdrop
- **WHEN** o usuário clicar no botão de fechar (X) da gaveta ou clicar na área externa escurecida (backdrop)
- **THEN** a gaveta de navegação é fechada imediatamente

#### Scenario: Fechamento por tecla Escape
- **WHEN** a gaveta de navegação estiver aberta e o usuário pressionar a tecla Escape
- **THEN** a gaveta é fechada e o controle retorna para o cabeçalho

### Requirement: Route Navigation and Auto-close
Ao clicar em qualquer link de navegação na gaveta móvel, o sistema SHALL navegar para a página de destino correspondente e fechar a gaveta automaticamente.

#### Scenario: Navegação para página a partir do menu móvel
- **WHEN** o usuário clicar no link "CARDÁPIO" ou "SOBRE NÓS" dentro da gaveta de navegação móvel
- **THEN** o aplicativo atualiza a rota exibindo a página selecionada e a gaveta de navegação móvel é fechada

### Requirement: Active Route Highlight in Mobile Menu
A gaveta de navegação móvel SHALL destacar visualmente o link correspondente à rota atualmente ativa.

#### Scenario: Destaque de link ativo
- **WHEN** o usuário estiver na rota "/cardapio" e abrir o menu móvel
- **THEN** o item "CARDÁPIO" é apresentado com a cor de destaque (accent) e os demais itens permanecem com estilo padrão
