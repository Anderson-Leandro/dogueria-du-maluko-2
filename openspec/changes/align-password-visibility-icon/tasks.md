# Tasks

## 1. Ajustes no Componente Field

- [x] 1.1 Refatorar `Field.tsx` para assegurar alinhamento vertical rigoroso no container e encapsular `rightSlot` em container `flex items-center justify-center flex-shrink-0 self-center`, verificando alinhamento estático com o texto do input.

## 2. Padronização dos Botões de Visibilidade de Senha

- [x] 2.1 Atualizar o botão de alternância de senha em `LoginPage.tsx` com dimensões ergonômicas (`w-8 h-8 flex items-center justify-center`), feedback de hover e alinhamento centrado no input, verificando alternância funcional entre senha visível e oculta.
- [x] 2.2 Atualizar os botões de alternância de senha e confirmação de senha em `RegisterPage.tsx` com o mesmo padrão de dimensões, centralização flexbox e feedback visual, verificando paridade visual entre ambos os campos.

## 3. Validação e Compilação

- [x] 3.1 Executar compilação com `npm run build` e verificar integridade visual e funcional dos campos de senha nas rotas `/login` e `/cadastro`, confirmando ausência de erros de build.
