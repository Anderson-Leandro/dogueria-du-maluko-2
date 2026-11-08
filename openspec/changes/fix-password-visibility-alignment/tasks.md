# Tasks

## 1. Reestruturação do Componente Field

- [x] 1.1 Atualizar `Field.tsx` com altura fixa padronizada `h-12` (48px), padding horizontal equilibrado (`px-3.5`), `flex-1 min-w-0 h-full` no `<input>`, eliminando dependência de padding vertical variável e garantindo que todos os campos possuam altura e eixo central idênticos.

## 2. Ajuste nos Formulários e Grids de Autenticação

- [x] 2.1 Atualizar o grid de Senha e Confirmar Senha em `RegisterPage.tsx` com `items-start` e remover a margem negativa (`-mr-1`) dos botões de alternância de senha, verificando encaixe perfeito sem overflow em modo desktop (2 colunas) e mobile.
- [x] 2.2 Harmonizar o botão de alternar visibilidade de senha em `LoginPage.tsx` removendo a margem negativa (`-mr-1`) para simetria exata com o container padronizado de `Field.tsx`, verificando alinhamento com o input.

## 3. Validação e Compilação

- [x] 3.1 Executar compilação com `npm run build` e verificar integridade visual e funcional dos campos de senha nas rotas `/login` e `/cadastro` em resoluções mobile (320px–375px), tablet e desktop, confirmando ausência de erros.
