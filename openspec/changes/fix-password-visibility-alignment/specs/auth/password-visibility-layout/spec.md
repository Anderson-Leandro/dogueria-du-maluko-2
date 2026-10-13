# Spec Delta

## Purpose

Define as regras de dimensionamento geométrico padronizado, contenção de largura e alinhamento em grids responsivos para o controle de visibilidade de senha nos formulários de autenticação.

## ADDED Requirements

### Requirement: Standardized Input Container Height and Alignment
O componente de campo de formulário SHALL utilizar uma altura fixa padronizada de 48px (h-12) em seu container de entrada, garantindo que o eixo vertical central seja idêntico para campos com ou sem botão de visualização de senha.

#### Scenario: Consistência de altura entre campos adjacentes
- **WHEN** campos com botão de visibilidade (Senha) e campos comuns (Nome, E-mail) forem renderizados na mesma tela
- **THEN** a altura visual do container de entrada de todos os campos é exatamente igual a 48px e os ícones estão alinhados no mesmo centro geométrico

### Requirement: Narrow Column and Multi-Grid Responsiveness
O elemento `<input>` dentro do componente de campo SHALL conter restrição de largura mínima (`min-w-0`), permitindo sua redução fluida em colunas estreitas sem empurrar, comprimir ou deslocar o botão de alternância de senha contra a borda do container.

#### Scenario: Renderização em grid de duas colunas no desktop
- **WHEN** o formulário de cadastro for visualizado em tela desktop com os campos de Senha e Confirmar Senha lado a lado
- **THEN** o botão de visibilidade de senha permanece visível, com espaçamento simétrico em relação à borda direita e sem transbordamento do input

### Requirement: Grid Alignment Resilience with Errors
Grids com múltiplos campos em formulários SHALL manter o alinhamento superior dos itens (`items-start`), assegurando que a exibição de mensagem de erro em um dos campos não distorça a altura ou o posicionamento vertical do campo vizinho.

#### Scenario: Erro de validação em apenas um dos campos de senha
- **WHEN** o campo de Senha exibir mensagem de erro e o campo de Confirmar Senha estiver válido
- **THEN** o container do campo de Confirmar Senha preserva sua altura padronizada e o botão de visibilidade não sofre deslocamento vertical
