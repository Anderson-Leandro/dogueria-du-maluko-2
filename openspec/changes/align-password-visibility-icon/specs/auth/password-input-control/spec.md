# Spec Delta

## Purpose

Garante o alinhamento visual vertical preciso e ergonomia de clique/toque para o botão de alternância de visibilidade de senha nos formulários de autenticação da aplicação.

## ADDED Requirements

### Requirement: Vertical Alignment of Password Visibility Toggle
O componente de campo de senha SHALL posicionar o botão de alternância de visibilidade de senha (ícones Eye / EyeOff) perfeitamente centralizado verticalmente no eixo do input, alinhado com o ícone prefixo do campo.

#### Scenario: Alinhamento vertical na renderização
- **WHEN** o formulário de login ou cadastro com campo de senha for exibido
- **THEN** o botão de visibilidade de senha é renderizado centralizado verticalmente sem desvio em relação ao texto e ao ícone lateral

### Requirement: Touch and Click Ergonomics
O botão de alternância de visibilidade de senha SHALL fornecer uma área de toque/clique ergonômica mínima de 32x32px com centralização flexbox e feedback de interação ao passar o cursor ou tocar.

#### Scenario: Feedback e área de clique
- **WHEN** o usuário posicionar o cursor ou clicar na área do botão de visibilidade
- **THEN** o botão responde com feedback visual suave e ativa a alternância sem exigir clique com precisão milimétrica

### Requirement: Password Visibility Toggle State
O sistema SHALL alternar o tipo do campo entre senha oculta ("password") e texto visível ("text"), alternando correspondentemente o ícone entre Eye e EyeOff com atributos de acessibilidade atualizados.

#### Scenario: Revelar senha oculta
- **WHEN** a senha estiver mascarada e o usuário clicar no botão de visibilidade
- **THEN** o conteúdo do campo passa a ser exibido em texto plano e o ícone se transforma em EyeOff

#### Scenario: Ocultar senha visível
- **WHEN** a senha estiver visível em texto plano e o usuário clicar no botão de visibilidade
- **THEN** o conteúdo do campo passa a ser mascarado e o ícone se transforma em Eye
