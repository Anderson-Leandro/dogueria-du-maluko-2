# Proposal

## Why

Em disposições específicas de tela e layout — especialmente no formulário de cadastro no modo desktop, onde os campos de Senha e Confirmar Senha dividem a linha em duas colunas (`sm:grid-cols-2`) —, o botão de alternar visualização de senha sofre desalinhamentos visuais, assimetria em relação à borda e risco de compressão. Isso ocorre porque o elemento `<input>` no flexbox não possui contenção de largura mínima (`min-w-0`), o container depende de paddings variáveis em vez de altura geométrica padronizada e o botão utiliza margem negativa que quebra em colunas estreitas.

Corrigir a estrutura do componente `Field` e das telas de autenticação com um padrão de posicionamento robusto e imune a larguras de coluna garante que o botão de visibilidade de senha permaneça perfeitamente centralizado e proporcional em qualquer resolução.

## What Changes

- **Padronização Geométrica do Componente Field**:
  - Adoção de altura padronizada (`h-12` / 48px) no container de input do componente `Field.tsx`, garantindo que campos com e sem `rightSlot` possuam exatamente a mesma altura e centro vertical.
  - Inclusão mandatória de `min-w-0` e `w-full` no input para impedir que o tamanho intrínseco nativo do navegador (`size="20"`) empurre o botão contra a borda ou quebre o alinhamento em colunas estreitas.
  - Posicionamento simétrico e confiável do prefixo e do `rightSlot` (alinhamento centralizado sem margens negativas artificiais).
- **Ajuste no Grid Multi-Coluna do Cadastro**:
  - Aplicação de alinhamento vertical no topo (`items-start`) no grid de Senha / Confirmar Senha em `RegisterPage.tsx` para evitar distorções de altura quando um dos campos apresentar mensagem de validação.
- **Uniformidade entre Login e Cadastro**:
  - Remoção de margens negativas pontuais nos botões de `LoginPage.tsx` e `RegisterPage.tsx`, alinhando os alvos de clique (`w-8 h-8` ou `w-9 h-9`) de maneira simétrica à margem interna direita.

## Capabilities

### New Capabilities
- `auth/password-visibility-layout`: Posicionamento responsivo, centralização vertical matemática e prevenção de overflow do controle de visibilidade de senha em qualquer resolução e disposição de grid.

### Modified Capabilities
*(Nenhuma especificação anterior existente)*

## Impact

- **Componentes Afetados**:
  - `src/components/auth/Field.tsx`: atualização para altura padronizada (`h-12`), `min-w-0` no input e suporte a slots simétricos.
  - `src/pages/LoginPage.tsx`: harmonização do botão de senha com o novo container padronizado.
  - `src/pages/RegisterPage.tsx`: harmonização dos botões de senha e confirmação com o grid responsivo (`items-start`).
- **Compatibilidade**: Nenhuma alteração em regras de negócio, dados de formulário ou validações.
