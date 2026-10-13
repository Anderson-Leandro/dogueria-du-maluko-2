# Spec Delta

## Purpose

Garante que rotas destinadas exclusivamente a usuários não autenticados (como login e cadastro) redirecionem automaticamente para a tela inicial quando o usuário já possui uma sessão ativa, evitando estados inconsistentes na interface.

## ADDED Requirements

### Requirement: Redirecionamento de usuário autenticado em rotas de convidado

O sistema SHALL redirecionar um usuário autenticado para `/` (sem adicionar entrada no histórico do navegador) quando ele tentar acessar qualquer rota protegida como rota de convidado (`/login` ou `/cadastro`).

#### Scenario: Usuário logado tenta acessar /login

- **WHEN** o usuário possui sessão ativa (`isAuthenticated === true`) e navega para `/login`
- **THEN** o sistema exibe a tela inicial (`/`) sem renderizar o formulário de login

#### Scenario: Usuário logado tenta acessar /cadastro

- **WHEN** o usuário possui sessão ativa (`isAuthenticated === true`) e navega para `/cadastro`
- **THEN** o sistema exibe a tela inicial (`/`) sem renderizar o formulário de cadastro

#### Scenario: Usuário não autenticado acessa /login

- **WHEN** o usuário não possui sessão ativa (`isAuthenticated === false`) e navega para `/login`
- **THEN** o sistema exibe o formulário de login normalmente

#### Scenario: Usuário não autenticado acessa /cadastro

- **WHEN** o usuário não possui sessão ativa (`isAuthenticated === false`) e navega para `/cadastro`
- **THEN** o sistema exibe o formulário de cadastro normalmente

### Requirement: Rotas não protegidas permanecem inalteradas

O sistema SHALL manter o comportamento atual de todas as rotas que não são designadas como rotas de convidado (`/`, `/cardapio`, `/sobre`), independentemente do estado de autenticação.

#### Scenario: Usuário autenticado acessa o cardápio

- **WHEN** o usuário possui sessão ativa e navega para `/cardapio`
- **THEN** o sistema exibe a página do cardápio normalmente
