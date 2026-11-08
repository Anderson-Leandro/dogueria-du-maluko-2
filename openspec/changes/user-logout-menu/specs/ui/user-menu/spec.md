# Spec Delta

## Purpose

Provê ao usuário acesso rápido às ações de conta (logout para autenticados, login/cadastro para visitantes) a partir da header desktop e do drawer de navegação mobile, sem necessidade de telas intermediárias.

## ADDED Requirements

### Requirement: Dropdown de usuário na header abre ao clique

O sistema SHALL exibir um menu dropdown ao clicar no botão de usuário na header quando o drawer mobile não estiver aberto.

#### Scenario: Usuário clica no botão de usuário com drawer fechado

- **WHEN** o drawer mobile está fechado e o usuário clica no botão de usuário da header
- **THEN** o sistema exibe um dropdown com as opções de conta correspondentes ao estado de autenticação

#### Scenario: Botão de usuário não responde quando drawer está aberto

- **WHEN** o drawer mobile está aberto
- **THEN** o botão de usuário não está visível na header e nenhum dropdown pode ser acionado por ele

### Requirement: Dropdown oferece logout para usuário autenticado

O sistema SHALL exibir no dropdown a opção "Sair" quando o usuário estiver autenticado.

#### Scenario: Usuário autenticado aciona logout pelo dropdown da header

- **WHEN** o usuário está autenticado e clica em "Sair" no dropdown da header
- **THEN** o sistema chama `logout()`, fecha o dropdown e o usuário perde a sessão

#### Scenario: Dropdown exibe nome/email do usuário autenticado

- **WHEN** o usuário está autenticado e o dropdown está aberto
- **THEN** o sistema exibe o nome ou e-mail do usuário no topo do dropdown como identificação

### Requirement: Dropdown oferece acesso ao login para visitante

O sistema SHALL exibir no dropdown os links "Entrar" e "Cadastrar" quando o usuário não estiver autenticado.

#### Scenario: Visitante clica em Entrar no dropdown

- **WHEN** o usuário não está autenticado e clica em "Entrar" no dropdown
- **THEN** o sistema fecha o dropdown e navega para `/login`

#### Scenario: Visitante clica em Cadastrar no dropdown

- **WHEN** o usuário não está autenticado e clica em "Cadastrar" no dropdown
- **THEN** o sistema fecha o dropdown e navega para `/cadastro`

### Requirement: Botão de usuário da header oculto quando drawer mobile está aberto

O sistema SHALL ocultar o botão de usuário da header enquanto o drawer mobile estiver aberto.

#### Scenario: Drawer abre e botão de usuário some

- **WHEN** o usuário abre o drawer mobile (menu hamburguer)
- **THEN** o botão de usuário não está mais visível na header

#### Scenario: Drawer fecha e botão de usuário reaparece

- **WHEN** o usuário fecha o drawer mobile
- **THEN** o botão de usuário volta a ser visível na header

### Requirement: Logout disponível no drawer mobile

O sistema SHALL exibir uma ação de logout diretamente no rodapé do drawer mobile quando o usuário estiver autenticado.

#### Scenario: Usuário autenticado faz logout pelo drawer mobile

- **WHEN** o usuário está autenticado e clica em "Sair" no rodapé do drawer mobile
- **THEN** o sistema chama `logout()`, fecha o drawer e o usuário perde a sessão

#### Scenario: Visitante vê opção de login no drawer mobile

- **WHEN** o usuário não está autenticado e o drawer mobile está aberto
- **THEN** o sistema exibe "Entrar ou Cadastrar" como ação no rodapé do drawer, navegando para `/login` ao clicar
