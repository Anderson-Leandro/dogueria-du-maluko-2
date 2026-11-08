# 🌭 Dogueria Du Maluko — Web & Mobile (Delivery)

[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-yellow.svg)](LICENSE)

> **O hot dog mais divertido de Ribeirão Pires!**  
> Aplicação completa de delivery e cardápio interativo, projetada para funcionar como ecossistema multiplataforma (**Web & Mobile**).

---

## 🎓 Informações Acadêmicas

- **Disciplina:** Programação para Dispositivos Móveis II
- **Docente:** Prof. Dr. Bruno Zolotareff dos Santos
- **Contexto:** Projeto prático de desenvolvimento com foco em arquitetura de software, prototipação ágil, desenvolvimento Web com **React** e evolução para aplicativo móvel com **React Native**.
- **Equipe / Desenvolvedores:**
  - Anderson Mendes Leandro e Ismael Alves de Almeida

---

## 📌 Sobre o Projeto

A **Dogueria Du Maluko** é uma aplicação web completa desenvolvida em **React 18**, **TypeScript**, **Tailwind CSS v4** e **React Router v7**. O projeto conta com uma arquitetura modular em camadas técnicas (*flat architecture*), separando regras de negócio, serviços assíncronos e componentes visuais.

Os dados vêm de uma **API REST própria em Node.js** (pasta [`backend/`](backend/)), no padrão **MVC**, com **Express**, **Prisma** e **SQLite**. Ela fornece catálogo, conteúdo institucional, autenticação com JWT e pedidos.

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

---

## 🏛️ Arquitetura do Projeto

O projeto adota uma **estrutura plana organizada por camadas técnicas**, promovendo alta manutenibilidade e baixo acoplamento:

```
src/                     # Front-end (React)
├── components/          # Componentes visuais reutilizáveis
│   ├── auth/            # AuthLayout, Field (inputs com ícones e erros)
│   ├── cart/            # CartDropdown
│   ├── feedback/        # LoadState (skeletons e estado de erro com "tentar novamente")
│   ├── layout/          # Header (menu do usuário), MobileNavDrawer, Footer, PromoStrip
│   ├── products/        # ProductCard, DrinkCard, ProductModal
│   ├── routing/         # GuestRoute (só para visitantes) e PrivateRoute (exige login)
│   └── ui/              # Componentes base Radix UI / Shadcn
├── context/             # Estado global: CartContext (localStorage) e AuthContext (sessão JWT)
├── hooks/               # useProducts, useDrinks, useAbout, useMyOrders (via useApiResource), useCart, useAuth, useSettings
├── pages/               # Home, Cardápio, Sobre, Login, Cadastro, Meus Pedidos
├── services/            # Integração com a API
│   ├── api.ts           # apiFetch (base URL, JSON, Bearer token) e ApiError
│   ├── productService.ts, drinkService.ts, aboutService.ts, settingsService.ts
│   ├── authService.ts   # login, cadastro, /auth/me e logout
│   └── orderService.ts  # criação e listagem de pedidos
├── types/               # product, drink, cart, user, about, order, settings
├── utils/               # formatPrice, formatCep, validadores de formulário
└── App.tsx / main.tsx   # Rotas, provedores globais e Toaster

backend/                 # API REST (Node + TypeScript, MVC)
├── prisma/
│   ├── schema.prisma    # Entidades: Product, ProductIngredient, DrinkCategory, User, Order, OrderItem, StoreStat, TimelineEvent, TeamMember, StoreValue
│   ├── migrations/      # Migrations do SQLite
│   ├── seed.ts          # Popula catálogo, conteúdo "Sobre" e usuário demo
│   └── seed-data/       # Dados iniciais do catálogo e da página Sobre
└── src/
    ├── routes/          # Mapeamento de URLs → controllers
    ├── controllers/     # (C) validam a entrada e orquestram
    ├── models/          # (M) acesso a dados (Prisma) e regras de negócio
    ├── views/           # (V) serializers: banco → JSON no formato dos types do front
    ├── validators/      # Schemas zod (mesmas regras e mensagens do front)
    ├── middlewares/     # Auth JWT, rate limit, tratamento de erros
    └── config/, lib/, utils/
```

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

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** 20 ou superior
- **npm**

### 1. Backend (API)

```bash
cd backend
npm install
cp .env.example .env          # depois troque JWT_SECRET por um valor aleatório (mín. 32 caracteres)
npx prisma migrate dev        # cria o banco SQLite (prisma/dev.db)
npm run db:seed               # popula catálogo, conteúdo e o usuário demo
npm run dev                   # API em http://localhost:3333/api
```

Para gerar um segredo: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.

**Usuário de demonstração:** `demo@maluko.com` / `123456`.

> ⚠️ `npm run db:seed` apaga **todos** os dados (inclusive usuários e pedidos) antes de popular. Por isso ele é bloqueado com `NODE_ENV=production`.

### 2. Front-end

Em outro terminal, na raiz do projeto:

```bash
npm install
cp .env.example .env          # opcional: VITE_API_URL (padrão http://localhost:3333/api)
npm run dev                   # http://localhost:5173
```

---

## 📄 Scripts Disponíveis

**Front-end (raiz)**

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento Vite |
| `npm run build` | Build de produção |
| `npm run typecheck` | Verificação de tipos (TypeScript) |

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
