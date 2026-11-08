# Design

## Context

A Dogueria Du Maluko utiliza uma pilha moderna composta por React 18, Vite, Tailwind CSS v4, Radix UI e Lucide Icons. Atualmente:
- O componente `Header` (`src/components/layout/Header.tsx`) oculta a barra de navegação em telas com largura inferior a 1024px (`hidden lg:flex`), sem prover nenhum botão ou gatilho alternativo de acesso aos links de página.
- O componente `CartDropdown` (`src/components/cart/CartDropdown.tsx`) é renderizado como um painel flutuante `absolute top-full right-0 mt-3 w-80 sm:w-96`, o que em celulares pequenos (320px–390px) excede a largura da tela ou é cortado na lateral direita.
- O projeto já possui componentes base baseados em Radix UI em `src/components/ui/sheet.tsx` e o hook `useIsMobile` em `src/components/ui/use-mobile.ts`, além de utilitários de estilo.

## Goals / Non-Goals

**Goals:**
- Prover um menu hambúrguer fluido e acessível no `Header` para telas `< lg` (mobile e tablets), com gaveta lateral (Drawer/Sheet) contendo links, indicador de rota ativa e informações da loja.
- Adaptar o carrinho de compras para se comportar como uma gaveta lateral elegante ou modal ajustado com largura segura em telas móveis (`< 640px`), garantindo que o cabeçalho, a lista de itens com scroll e o rodapé com botão de checkout fiquem 100% visíveis e operáveis com uma só mão.
- Manter o comportamento refinado de dropdown flutuante no desktop (`>= 640px` / `>= lg`).
- Otimizar o cabeçalho para acomodar logotipo, botão hambúrguer, botão de perfil e botão do carrinho em telas estreitas (320px–400px) sem quebras de linha ou sobreposições visuais.

**Non-Goals:**
- Não alterar as regras de negócio de cálculo de frete, carrinho, autenticação ou endpoints de API.
- Não alterar as rotas da aplicação ou o design dos cards de produto.

## Decisions

### 1. Menu Hambúrguer com Gaveta Lateral Deslizante (Sheet)
- **Decisão**: Utilizar um botão com ícone hambúrguer (`Menu` / `X` da `lucide-react`) visível em `lg:hidden`. Ao ser acionado, abre uma gaveta deslizante lateral estilizada com a identidade visual da Dogueria (`bg-[#1a1a2e]`, bordas sutis e tipografia da marca).
- **Justificativa**: Drawers laterais oferecem a melhor experiência em dispositivos móveis (padrão de apps nativos), fornecem espaço adequado para links grandes com alvos de toque confortáveis (mínimo 44px de altura) e integram facilmente informações adicionais (badge de entrega, perfil).
- **Alternativas consideradas**: Menu colapsável tipo sanfona abaixo do header (empurraria o conteúdo da página para baixo e causaria saltos de layout).

### 2. Carrinho Responsivo com Modo Gaveta no Mobile
- **Decisão**: Condicionar o container do carrinho: em telas móveis (`sm:hidden` ou `< 640px`), abrir como gaveta lateral direita (ou painel com `fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md`), com backdrop escuro e scroll dedicado na lista de itens (`flex-1 overflow-y-auto`). Em viewports desktop (`sm:block`), manter a ancoragem elegante abaixo do botão de carrinho.
- **Justificativa**: Elimina completamente transbordo horizontal (overflow-x) e cortes em telas de 320px–414px, enquanto mantém o rodapé de checkout fixo no campo de visão e de alcance do polegar.
- **Alternativas consideradas**: Apenas reduzir a largura fixa para `w-64` (tornaria a foto, os textos e botões de quantidade muito apertados e difíceis de tocar).

### 3. Compactação e Hierarquia do Header em Telas Estreitas
- **Decisão**: Em telas `< 400px`:
  - Altura do logotipo ajustada proporcionalmente (`h-9 sm:h-12`) com flex-shrink-0.
  - Botão do carrinho exibindo ícone e contador em destaque, ocultando o texto "CARRINHO" (`hidden sm:inline`).
  - Gaps reduzidos entre ações (`gap-2 sm:gap-4`) para garantir respiro visual sem overflow lateral.

## Risks / Trade-offs

- **[Risco] Conflito de z-index entre múltiplos menus e o header fixo**
  - *Mitigação*: Definir camadas claras: Header em `z-40`, backdrop e gavetas em `z-50`, preservando a sobreposição correta sobre qualquer outro elemento da página.

- **[Risco] Bloqueio de rolagem do body quando o menu ou carrinho estiver aberto**
  - *Mitigação*: Usar bloqueio de scroll padrão do body durante a abertura de drawers móveis para evitar rolagem dupla indesejada no fundo da página.

- **[Risco] Telas com altura curta (landscape em celulares)**
  - *Mitigação*: Usar `max-h-[100dvh]` ou flexbox com `flex-1 min-h-0 overflow-y-auto` na lista de produtos do carrinho, mantendo o rodapé de checkout sempre acessível.
