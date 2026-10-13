# Design

## Context

No design atual do componente `Field.tsx`, o container de entrada utiliza `py-3` para determinar sua altura pelo conteúdo em vez de possuir uma altura fixa predefinida. Isso resulta em variações de altura entre campos que possuem botões auxiliares (`rightSlot` de 32px) e campos simples (apenas texto), criando inconsistências visuais perceptíveis quando dispostos lado a lado.

Adicionalmente, na visualização desktop da tela de cadastro (`RegisterPage.tsx`), os campos de Senha e Confirmar Senha são posicionados em um grid de duas colunas (`sm:grid-cols-2`). Em resoluções médias e desktop, cada coluna possui aproximadamente 240px de largura. Sem a classe `min-w-0` no elemento `<input>`, o navegador atribui uma largura intrínseca mínima padrão ao input, gerando compressão ou empurrando o botão de visibilidade contra a borda direita. O uso anterior de margem negativa (`-mr-1`) agravava essa assimetria.

## Goals / Non-Goals

**Goals:**
- Estabelecer uma altura fixa padronizada de 48px (`h-12`) no container de entrada do `Field.tsx`, unificando a linha média de todos os campos com ou sem ícones auxiliares.
- Garantir que o `<input>` se ajuste com fluidez (`flex-1 min-w-0`) sem provocar overflow ou desalinhamento do botão em colunas estreitas.
- Manter o espaçamento simétrico e elegante entre o ícone esquerdo e o botão direito em relação às bordas do container, eliminando margens negativas.
- Assegurar que grids com múltiplos campos utilizem `items-start` para que mensagens de erro de validação em um campo não deformem a altura do campo adjacente.

**Non-Goals:**
- Não alterar as regras de validação de formulários, regex de senhas ou serviços de autenticação.
- Não modificar outros formulários que não utilizem o componente `Field`.

## Decisions

### 1. Altura Fixa Universal (`h-12`) em `Field.tsx`
- **Decisão**: Definir o container do input com `h-12` (48px), `flex items-center gap-2.5 px-3.5`, removendo o padding vertical variável (`py-3`).
- **Justificativa**: Garante que o centro geométrico vertical do campo seja exatamente 24px do topo em todos os inputs, eliminando diferenças de altura entre inputs com e sem botão de visibilidade e independentemente de variações de fonte/bullets de senha.

### 2. Flex-Shrink e Min-Width Control no `<input>`
- **Decisão**: Utilizar `className="flex-1 min-w-0 bg-transparent text-white placeholder-white/30 text-sm outline-none font-body leading-none h-full"` no input.
- **Justificativa**: A propriedade `min-w-0` é fundamental em flexbox para permitir que elementos de formulário encolham abaixo do tamanho intrínseco padrão do browser (`size=20`), garantindo que o botão direito sempre tenha seu espaço preservado e centralizado sem transbordo.

### 3. Grid Resiliente com `items-start` no Cadastro
- **Decisão**: Aplicar `items-start` no container `<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">` de `RegisterPage.tsx`.
- **Justificativa**: Evita que o alinhamento padrão de estiramento (`align-items: stretch`) do CSS Grid cause saltos ou desalinhamentos verticais entre os campos de Senha e Confirmar Senha quando mensagens de erro forem exibidas.

## Risks / Trade-offs

- **[Risco] Inputs com textos longos em colunas estreitas**
  - *Mitigação*: Com `min-w-0` e `overflow-hidden` implícito no input nativo, o texto rola horizontalmente de forma padrão e o botão de visibilidade permanece perfeitamente visível e fixo à direita.
