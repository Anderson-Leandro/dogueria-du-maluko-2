# Proposal

## Why

Nos formulários de autenticação (telas de Login e Cadastro), o botão/ícone de alternar visibilidade de senha (`Eye` / `EyeOff`) apresenta desalinhamento vertical em relação à linha do input e ao ícone lateral esquerdo, além de possuir uma área de clique muito reduzida. Isso prejudica a experiência visual do usuário e a usabilidade ao tentar conferir a senha digitada, especialmente em dispositivos de toque ou telas menores.

## What Changes

- **Alinhamento Centralizado Preciso**:
  - Correção do alinhamento vertical do botão/ícone de alternância de visibilidade de senha em relação ao campo de input e ao container em `Field.tsx`.
  - Ajuste de centralização flexbox (`flex items-center justify-center`) no wrapper e no botão de ação da senha, eliminando variações de baseline e margens nativas de botões HTML.
- **Melhoria da Área de Toque e Feedback**:
  - Aumento da área de clique/toque do botão de alternância de senha para um alvo ergonômico (mínimo de 32x32px / 36x36px), com transição suave, efeito hover discreto e alinhamento equilibrado à direita.
  - Aplicação padronizada no campo de senha da tela de Login (`LoginPage.tsx`) e nos campos de senha e confirmação de senha da tela de Cadastro (`RegisterPage.tsx`).

## Capabilities

### New Capabilities
- `auth/password-input-control`: Controle de entrada de senha com botão de alternância de visibilidade perfeitamente alinhado verticalmente e área de toque ergonomicamente acessível.

### Modified Capabilities
*(Nenhuma especificação anterior existente)*

## Impact

- **Componentes Afetados**:
  - `src/components/auth/Field.tsx`: refinamento do container flexbox e do suporte ao `rightSlot` para garantir alinhamento vertical consistente.
  - `src/pages/LoginPage.tsx`: estilização do botão de alternar senha com área de toque e centralização aprimorada.
  - `src/pages/RegisterPage.tsx`: estilização dos botões de alternar senha e confirmação de senha com área de toque e centralização aprimorada.
- **Compatibilidade**: Sem impacto em regras de negócio, validações ou fluxos de submissão de formulário.
