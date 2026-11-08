# Design

## Context

Nos formulários de autenticação (`LoginPage.tsx` e `RegisterPage.tsx`), o componente `Field` (`src/components/auth/Field.tsx`) gerencia o layout de cada campo com um container `flex items-center gap-3 ... px-4 py-3`.
O botão de visualização de senha é passado via propriedade `rightSlot` como um elemento `<button>` com classes utilitárias mínimas (`text-white/30 hover:text-white/70 transition-colors flex-shrink-0 cursor-pointer`).

Sem estilização flexbox explícita (`flex items-center justify-center`) e dimensões fixas no botão, o elemento de botão nativo herda características de baseline e alinhamento de texto que deixam o ícone SVG visualmente descentralizado em relação à caixa de texto e ao ícone prefixo à esquerda. Além disso, a área de clique fica restrita apenas aos 16x16px do ícone SVG, tornando o clique difícil em dispositivos móveis.

## Goals / Non-Goals

**Goals:**
- Alinhar perfeitamente o botão e o ícone de visibilidade de senha no centro vertical exato do campo de input em todas as resoluções.
- Prover um touch target ergonômico e feedback tátil/visual (área de clique de 32x32px, cantos arredondados, hover suave).
- Garantir comportamento idêntico e consistente tanto no Login quanto no Cadastro (senha e confirmação de senha).

**Non-Goals:**
- Não alterar as regras de validação, envio ou hooks de autenticação.
- Não alterar a tipagem ou estrutura pública de props do componente `Field`.

## Decisions

### 1. Encapsulamento e Alinhamento em `Field.tsx`
- **Decisão**: Garantir que o container do `Field` mantenha centralização vertical com `flex items-center`, e que o `rightSlot` seja renderizado em um container dedicado com `flex items-center justify-center flex-shrink-0 self-center`.
- **Justificativa**: Evita que elementos injetados via `rightSlot` sofram com heranças indesejadas de baseline ou colapso de altura.

### 2. Estilização do Botão de Alternância de Visibilidade
- **Decisão**: Padronizar os botões de alternância de senha em `LoginPage.tsx` e `RegisterPage.tsx` com:
  `className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 active:scale-95 transition-all -mr-1 cursor-pointer flex-shrink-0"`
  mantendo o ícone `Eye` / `EyeOff` com `w-4 h-4` centralizado.
- **Justificativa**: Garante alinhamento milimétrico, amplia a área de interação para evitar cliques perdidos e fornece feedback visual refinado condizente com o design system do projeto.

## Risks / Trade-offs

- **[Risco] Espaço interno do input em telas estreitas**
  - *Mitigação*: O botão `w-8 h-8` com compensação `-mr-1` consome menos de 4px adicionais em relação ao estado anterior, mantendo amplo espaço para texto mesmo em telas de 320px.
