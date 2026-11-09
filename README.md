# 🌭 Dogueria Du Maluko — Web & Mobile (Delivery)

[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-yellow.svg)](LICENSE)

> **O hot dog mais divertido de Ribeirão Pires!**  
> Aplicação completa de delivery e cardápio interativo, projetada para funcionar como ecossistema multiplataforma (**Web & Mobile**).

---

## 🎓 Informações Acadêmicas

- **Disciplina:** Programação para Dispositivos Móveis II
- **Docente:** Prof. Dr. Bruno Zolotareff dos Santos
- **Contexto:** Projeto prático de desenvolvimento com foco em arquitetura de software, prototipação ágil, desenvolvimento Web com **React** e evolução para aplicativo móvel com **React Native** (agora em `apps/mobile`).
- **Equipe / Desenvolvedores:**
  - Anderson Mendes Leandro e Ismael Alves de Almeida

---

## 📌 Sobre o Projeto

A **Dogueria Du Maluko** é um **monorepo** com três aplicações que compartilham a mesma regra de negócio:

| Parte | Pasta | Tecnologias |
|---|---|---|
| 🌐 **Front-end web** | [`apps/web/`](apps/web/) | React 18, TypeScript, Vite, Tailwind CSS v4, React Router v7 |
| 📱 **App mobile** | [`apps/mobile/`](apps/mobile/) | React Native 0.88, Expo SDK 58, Expo Router (Android, iOS e navegador) |
| 🧩 **Código compartilhado** | [`packages/core/`](packages/core/) | Tipos, serviços da API, hooks, contexts e utilitários usados pelos dois apps |
| 🔌 **API REST** | [`backend/`](backend/) | Node.js, Express, Prisma e SQLite, no padrão **MVC** |

A API fornece catálogo, conteúdo institucional, autenticação com JWT e pedidos. O web e o mobile consomem essa API pelo mesmo código de `packages/core`: uma correção numa regra (validação, cálculo, sessão) vale para os dois.

---

## ✨ Funcionalidades Principais

- 🏠 **Página Inicial (Home)**:
  - Hero banner temático com chamadas promocionais.
  - Vitrine dos *Hot Dogs mais pedidos*, com os produtos marcados como destaque (`featured`) na API e abertura de modal detalhado.
  - Faixa com diferenciais da dogueria (Entrega rápida, nota 4.9 no Google, produtos frescos e opções de pagamento).

- 📋 **Cardápio Completo (Menu)**:
  - Alternador de abas entre **🌭 Dogues** e **🥤 Bebidas** com contadores dinâmicos.
  - Bebidas agrupadas por categorias (Refrigerantes, Sucos da Casa, Cervejas, Águas).
  - Adição rápida de itens ao carrinho com feedback visual (*"ADICIONADO ✓"*).

- 🛒 **Carrinho de Compras Interativo**:
  - Dropdown flutuante com subtotal e aviso de frete (grátis acima de R$ 60,00).
  - **Confirmação de compra**: envia o pedido à API, que recalcula preços e frete no servidor; exige login. Se o usuário não estiver logado, é levado ao login e o carrinho reabre após entrar.
  - Ajuste de quantidade (+ / -) e remoção individual de itens.
  - **Persistência no LocalStorage**: Os itens permanecem salvos mesmo após recarregar a página.
  - Efeito visual de animação (*bounce*) no botão do carrinho ao adicionar novos produtos.

- 🔍 **Modal Detalhado de Produto**:
  - Imagem ampliada, lista de tags de ingredientes, descrições detalhadas e seletor de quantidade com cálculo de valor em tempo real.

- 📦 **Meus Pedidos**:
  - Histórico do usuário logado (rota protegida `/meus-pedidos`), do mais recente ao mais antigo.
  - Cada pedido mostra data, status (Recebido, Em preparo, Saiu para entrega, Entregue, Cancelado), itens, subtotal, frete, total e endereço de entrega.
  - Acesso pelo menu do usuário, pela gaveta mobile e pelo botão "Ver pedidos" no aviso de compra confirmada.
  - Sem login, o usuário é levado ao login e volta para a página depois de entrar.

- 📖 **Sobre Nós (Institucional)**:
  - Estatísticas de atendimento e avaliação.
  - **Linha do Tempo**: A trajetória da dogueria desde o carrinho vermelho em 2019 até a loja física.
  - Apresentação da equipe fundadora e valores da marca.

- 🔐 **Autenticação (Login & Cadastro)**:
  - Validação de formulários em tempo real.
  - Máscara automática de CEP no cadastro.
  - Alternador para visualização de senha (*show/hide password*).
  - Autenticação real via API (senha com bcrypt, sessão com JWT), revalidada ao abrir o app.
  - Erros de validação do servidor aparecem diretamente nos campos do formulário (ex.: "Este e-mail já está cadastrado").
  - Sessão expirada é tratada em um único ponto: o usuário é desconectado e avisado ("Sua sessão expirou").
  - Ao entrar, o usuário volta para a página protegida que tentou abrir (mesmo passando pelo cadastro).

- 🧭 **Navegação e Responsividade**:
  - **Desktop (≥ 1024px)**: links na header e botão de usuário com menu suspenso (Meus pedidos, Sair ou Entrar/Cadastrar).
  - **Telas menores (< 1024px)**: menu hambúrguer com gaveta lateral, que concentra a navegação e todas as ações da conta. Nesse modo o botão de usuário some da header, que mantém só o logo e o carrinho.
  - Logout volta para a página inicial da loja, com aviso de confirmação.
  - Avisos (toasts) para login, cadastro, pedidos e erros.

- ⏳ **Carregamento e Erros**:
  - Skeletons enquanto o catálogo e os pedidos carregam.
  - Mensagem amigável com botão **"Tentar novamente"** quando a API está indisponível.

- 📱 **App Mobile (React Native / Expo)**:
  - Abas **Início**, **Cardápio**, **Carrinho** (com contador) e **Conta**; telas de Login, Cadastro, Meus pedidos, Sobre e detalhe do produto.
  - Mesmas regras do web: destaques, bebidas por categoria, frete vindo da API, checkout que exige login e volta ao carrinho depois de entrar, erros nos campos, aviso de sessão expirada e histórico protegido.
  - Sessão (token JWT) guardada no armazenamento seguro do aparelho (**Keychain** no iOS, **Keystore** no Android); carrinho no AsyncStorage. Ambos sobrevivem ao fechar o app.
  - Mesmo visual do web (cores da marca e fontes Bangers + Nunito).

---

## 🏛️ Arquitetura do Projeto

```
apps/
├── web/                     # Front-end web (React 18 + Vite)
│   └── src/
│       ├── components/      # auth, cart, feedback, layout, products, routing (Guest/PrivateRoute), ui (Radix/Shadcn)
│       ├── pages/           # Home, Cardápio, Sobre, Login, Cadastro, Meus Pedidos
│       ├── services/ hooks/ context/ types/ utils/   # re-exportam de @dogueria/core
│       └── main.tsx         # configureCore(): API em "/api" (proxy do Vite) + localStorage
└── mobile/                  # App React Native (Expo SDK 58 + Expo Router)
    ├── src/app/             # Rotas: (tabs)/ início, cardápio, carrinho, conta; login, cadastro, meus-pedidos, sobre, produto/[id]
    ├── src/components/      # ProductCard, DrinkRow, OrderCard, Toast, Field, Button, LoadState, QtyStepper
    ├── src/lib/             # setup (configureCore), URL da API, storage (SecureStore + AsyncStorage)
    └── metro.config.js      # resolve packages/core com as dependências do app

packages/
└── core/src/                # Código compartilhado (TypeScript puro + React)
    ├── config.ts            # configureCore({ apiBaseUrl, storage }) — cada plataforma injeta os seus
    ├── services/            # apiFetch, sessão, auth, produtos, bebidas, sobre, pedidos, settings
    ├── hooks/               # useProducts, useDrinks, useAbout, useMyOrders, useSettings, useApiResource…
    ├── context/             # AuthContext (sessão JWT) e CartContext
    ├── types/ utils/        # Tipos e utilitários (formatPrice, máscaras, validadores)

backend/                     # API REST (Node + TypeScript, MVC)
├── prisma/                  # schema (Product, DrinkCategory, User, Order, OrderItem, conteúdo "Sobre"), migrations e seed
└── src/                     # routes → controllers (C) → models (M) → views (V, serializers JSON)
                             # + validators (zod), middlewares (JWT, rate limit, erros)
```

**Por que não npm workspaces?** O web usa React 18 e o mobile usa React 19 (exigência do Expo SDK 58). Com workspaces, as duas versões disputariam a mesma `node_modules` e quebrariam os hooks. Por isso cada app tem a **sua própria instalação**, e o `packages/core` é só código-fonte: o Vite (web) e o Metro (mobile) o resolvem usando as dependências de cada app.

---

## 🔌 API (Backend)

Base: `http://localhost:3333/api`. Erros seguem o formato `{ "error": "mensagem", "fields": { "campo": "mensagem" } }`.

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/health` | — | Status da API |
| GET | `/products` · `/products/:id` | — | Dogues (com ingredientes e destaque `featured`) |
| GET | `/drinks?category=` · `/drinks/categories` | — | Bebidas e categorias |
| GET | `/about` | — | Estatísticas, linha do tempo, equipe e valores |
| GET | `/settings` | — | Regras públicas (taxa de frete e mínimo para frete grátis) |
| POST | `/auth/register` · `/auth/login` | — | Retornam `{ user, token }` (com rate limit) |
| GET | `/auth/me` | Bearer | Usuário da sessão |
| POST | `/orders` | Bearer | Cria pedido `{ items: [{ productId, qty }] }`; preços e frete calculados no servidor |
| GET | `/orders` · `/orders/:id` | Bearer | Pedidos do usuário logado |

**Regras principais:** valores guardados em centavos; frete de R$ 7,00, grátis a partir de R$ 60,00 (configurável no `.env`); o endereço de entrega é copiado do cadastro; o pedido guarda o nome e o preço de cada item no momento da compra.

---

## 🛠️ Tecnologias Utilizadas

- **[React 18](https://react.dev/)** — Biblioteca para interfaces reativas
- **[Vite](https://vitejs.dev/)** — Build tool ultra-rápido
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[React Router v7](https://reactrouter.com/)** — Roteamento declarativo SPA
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Estilização moderna baseada em utilitários
- **[Lucide React](https://lucide.dev/)** — Conjunto consistente de ícones
- **[Radix UI](https://www.radix-ui.com/)** — Componentes acessíveis e customizáveis
- **[Express](https://expressjs.com/)** + **[Prisma](https://www.prisma.io/)** + **SQLite** — API REST no backend
- **[Zod](https://zod.dev/)**, **bcryptjs** e **jsonwebtoken** — validação, hash de senha e sessão
- **[React Native](https://reactnative.dev/)** + **[Expo](https://expo.dev/)** (SDK 58) + **[Expo Router](https://docs.expo.dev/router/introduction/)** — app mobile
- **expo-secure-store** e **AsyncStorage** — sessão segura e carrinho no aparelho

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** 22.13 ou superior e **npm** (o app mobile, com Expo SDK 58, exige Node 22.13+; o web e a API rodam a partir do Node 20)
- Para o celular: o app **Expo Go** (Android ou iOS), na mesma rede Wi-Fi do computador

### 1. Instalar as dependências

Na raiz do projeto (cada parte tem a sua instalação):

```bash
npm run install:all          # apps/web, backend e apps/mobile
```

### 2. Backend (API)

```bash
cd backend
cp .env.example .env          # depois troque JWT_SECRET por um valor aleatório (mín. 32 caracteres)
npx prisma migrate dev        # cria o banco SQLite (prisma/dev.db)
npm run db:seed               # popula catálogo, conteúdo e o usuário demo
npm run dev                   # API em http://localhost:3333/api (ou, da raiz: npm run dev:api)
```

Para gerar um segredo: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

**Usuário de demonstração:** `demo@maluko.com` / `123456`.

> ⚠️ `npm run db:seed` apaga **todos** os dados (inclusive usuários e pedidos) antes de popular. Por isso ele é bloqueado com `NODE_ENV=production`.

### 3. Front-end web

Em outro terminal, na raiz:

```bash
npm run dev                   # http://localhost:5173
```

O web chama a API pelo caminho relativo `/api`, e o **proxy do Vite** (`apps/web/vite.config.ts`) repassa para `http://localhost:3333`, sem precisar configurar URL nem CORS. Para usar uma API em outro endereço, defina `VITE_API_URL` em `apps/web/.env` (veja `apps/web/.env.example`).

### 4. App mobile (Expo)

Com a API rodando, em outro terminal, na raiz:

```bash
npm run dev:mobile            # abre o Expo; escaneie o QR code com o Expo Go
npm run dev:mobile:web        # ou rode o app no navegador (http://localhost:8081)
```

O app descobre a API sozinho: usa o IP da máquina que roda o `expo start`, na porta 3333. Se o celular não alcançar a API (rede diferente, firewall), defina a URL em `apps/mobile/.env`:

```bash
EXPO_PUBLIC_API_URL=http://SEU_IP:3333/api
```

A URL em uso aparece no rodapé da aba **Conta**, o que ajuda a diagnosticar problemas de conexão.

**QR code ilegível no terminal?** Alguns terminais deixam espaço entre as linhas (no VS Code, a configuração `terminal.integrated.lineHeight` maior que 1) e o QR desenhado pelo Expo fica distorcido. Alternativas:

```bash
npm run mobile:qr                              # gera o QR como imagem (PNG) e abre na tela
npm run mobile:qr -- exp://xxxx.exp.direct     # com túnel/Codespaces: passe a URL exibida pelo Expo
```

Também dá para digitar a URL no Expo Go, em **"Enter URL manually"** (ex.: `exp://192.168.0.10:8081`).

### ☁️ Rodando no GitHub Codespaces

O repositório inclui um **devcontainer** (`.devcontainer/`) que prepara tudo automaticamente:

1. No GitHub, clique em **Code → Codespaces → Create codespace** na branch desejada.
2. Aguarde a criação. O script `.devcontainer/setup.sh` instala as dependências do web, do mobile e do backend, cria o `backend/.env` com um `JWT_SECRET` aleatório e cria e popula o banco.
3. Abra **dois terminais**:
   ```bash
   npm run dev:api     # terminal 1: API na porta 3333
   npm run dev         # terminal 2: front web na porta 5173
   ```
4. Abra a porta **5173** pela aba **Portas** (ou pela notificação que aparece).

No web, o navegador fala só com a porta 5173 e o Vite repassa `/api` internamente para a API, então **a porta 3333 não precisa ser pública**.

**App mobile no Codespaces (celular com Expo Go).** O celular não está na rede do Codespace, então ele precisa alcançar a **API** e o **Metro** (servidor do Expo) pela internet:

1. **API pública.** Com a API rodando (`npm run dev:api`), deixe a porta **3333** pública: na aba **Portas**, clique com o botão direito em 3333 → **Port Visibility → Public**. Pelo terminal: `gh codespace ports visibility 3333:public -c $CODESPACE_NAME`.
   - Para conferir, abra `https://<nome-do-codespace>-3333.app.github.dev/api/health` no navegador do **celular**: deve aparecer `{"status":"ok"}`. Se aparecer a tela de login do GitHub, a porta ainda está privada.
   - O app já aponta sozinho para essa URL quando o Expo roda no Codespace (`apps/mobile/app.config.js`). A URL em uso aparece no rodapé da aba **Conta**.
2. **Metro via túnel.** Em outro terminal:
   ```bash
   npm run dev:mobile:tunnel
   ```
   O túnel usa o **ngrok** (`@expo/ngrok`), que o `setup.sh` instala globalmente ao criar o Codespace. Em um Codespace criado antes dessa mudança, instale uma vez: `npm i -g @expo/ngrok`.
3. **Abrir no Expo Go.** Escaneie o QR code. Se ele não for lido, gere a imagem com `npm run mobile:qr -- <URL exp://… exibida pelo Expo>`, ou digite a URL em **"Enter URL manually"**.
   - **iPhone:** o Expo Go só abre o projeto se o terminal e o app estiverem logados na **mesma conta Expo**. Rode `npx expo login` no terminal do Codespace e entre na mesma conta no Expo Go.
4. **Navegador.** Para mostrar o app no navegador do próprio Codespace: `npm run dev:mobile:web` e abra a porta **8081**. A porta 3333 também precisa estar pública.

> O túnel é mais lento que a rede local e depende do ngrok. Se aparecer `ngrok tunnel took too long to connect`, pare o Expo (Ctrl+C) e rode de novo.

> Com a porta 3333 pública, qualquer pessoa com a URL alcança a API do Codespace. Volte a visibilidade para **Private** depois da apresentação.

> Se o setup automático não tiver rodado, execute `bash .devcontainer/setup.sh` manualmente. Ele pode ser rodado de novo com segurança: não recria o `.env` nem apaga o banco existente.

---

## 📄 Scripts Disponíveis

**Raiz do monorepo**

| Comando | Descrição |
|---|---|
| `npm run install:all` | Instala as dependências de `apps/web`, `backend` e `apps/mobile` |
| `npm run dev` / `npm run dev:web` | Front web (Vite, com proxy de `/api` para a API) |
| `npm run dev:api` | API (`backend/`) |
| `npm run dev:mobile` | App mobile (Expo; QR code para o Expo Go) |
| `npm run dev:mobile:tunnel` | App mobile via túnel (Codespaces ou redes diferentes) |
| `npm run dev:mobile:web` | App mobile no navegador (porta 8081) |
| `npm run mobile:qr` | Gera o QR code do Expo como imagem (quando o do terminal não é lido) |
| `npm run build` | Build de produção do web |
| `npm run typecheck` | Verificação de tipos do web, do backend e do mobile |

**Backend (`backend/`)**

| Comando | Descrição |
|---|---|
| `npm run dev` | API com recarregamento automático (tsx watch) |
| `npm run build` / `npm start` | Compila para `dist/` e executa |
| `npm run typecheck` | Verificação de tipos (inclui o seed) |
| `npm run db:migrate` | Cria/aplica migrations |
| `npm run db:seed` | Popula o banco (apaga os dados atuais) |
| `npm run db:reset` | Recria o banco do zero e roda o seed |

---

## 📝 Licença

Este projeto está licenciado sob a **[Licença MIT](LICENSE)** — © 2026 **Dogueria Du Maluko**.

Em resumo: você pode usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e vender cópias do software, desde que o aviso de copyright e a permissão da licença sejam mantidos em todas as cópias. O software é fornecido "no estado em que se encontra", sem garantias de qualquer tipo. O texto completo está no arquivo [`LICENSE`](LICENSE).
