# 🌭 Dogueria Du Maluko — Web & Mobile (Delivery)

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

A **Dogueria Du Maluko** é uma aplicação web completa desenvolvida em **React 18**, **TypeScript**, **Tailwind CSS v4** e **React Router v7**. O projeto conta com uma arquitetura modular em camadas técnicas (*flat architecture*), separando regras de negócio, dados mockados, serviços assíncronos e componentes visuais.

---

## ✨ Funcionalidades Principais

- 🏠 **Página Inicial (Home)**:
  - Hero banner temático com chamadas promocionais.
  - Vitrine dos *Hot Dogs mais pedidos* com abertura de modal detalhado.
  - Faixa com diferenciais da dogueria (Entrega rápida, nota 4.9 no Google, produtos frescos e opções de pagamento).

- 📋 **Cardápio Completo (Menu)**:
  - Alternador de abas entre **🌭 Dogues** e **🥤 Bebidas** com contadores dinâmicos.
  - Bebidas agrupadas por categorias (Refrigerantes, Sucos da Casa, Cervejas, Águas).
  - Adição rápida de itens ao carrinho com feedback visual (*"ADICIONADO ✓"*).

- 🛒 **Carrinho de Compras Interativo**:
  - Dropdown flutuante com cálculo automático de subtotal e total do pedido.
  - Ajuste de quantidade (+ / -) e remoção individual de itens.
  - **Persistência no LocalStorage**: Os itens permanecem salvos mesmo após recarregar a página.
  - Efeito visual de animação (*bounce*) no botão do carrinho ao adicionar novos produtos.

- 🔍 **Modal Detalhado de Produto**:
  - Imagem ampliada, lista de tags de ingredientes, descrições detalhadas e seletor de quantidade com cálculo de valor em tempo real.

- 📖 **Sobre Nós (Institucional)**:
  - Estatísticas de atendimento e avaliação.
  - **Linha do Tempo**: A trajetória da dogueria desde o carrinho vermelho em 2019 até a loja física.
  - Apresentação da equipe fundadora e valores da marca.

- 🔐 **Autenticação (Login & Cadastro)**:
  - Validação de formulários em tempo real.
  - Máscara automática de CEP no cadastro.
  - Alternador para visualização de senha (*show/hide password*).
  - Simulação de autenticação com persistência de sessão.

---

## 🏛️ Arquitetura do Projeto

O projeto adota uma **estrutura plana organizada por camadas técnicas**, promovendo alta manutenibilidade e baixo acoplamento:

```
src/
├── components/          # Componentes visuais reutilizáveis
│   ├── auth/            # AuthLayout, Field (inputs com ícones e erros)
│   ├── cart/            # CartDropdown
│   ├── layout/          # Header, Footer, PromoStrip
│   ├── products/        # ProductCard, DrinkCard, ProductModal
│   └── ui/              # Componentes base Radix UI / Shadcn
├── context/             # Gerenciamento de estado global
│   ├── CartContext.tsx  # Estado do carrinho e LocalStorage
│   └── AuthContext.tsx  # Estado de sessão e usuário
├── data/                # Dados estáticos e fixtures mockadas
│   ├── products.data.ts # Catálogo de hot dogs
│   ├── drinks.data.ts   # Bebidas e categorias
│   └── about.data.ts    # Linha do tempo, time e valores
├── hooks/               # Custom hooks de consumo
│   ├── useCart.ts       # Hook de acesso ao carrinho
│   ├── useAuth.ts       # Hook de autenticação
│   ├── useProducts.ts   # Hook assíncrono para listagem de produtos
│   ├── useDrinks.ts     # Hook assíncrono para listagem de bebidas
│   └── useAbout.ts      # Hook assíncrono para dados institucionais
├── pages/               # Telas completas da aplicação
│   ├── HomePage.tsx     # Página Inicial
│   ├── MenuPage.tsx     # Cardápio
│   ├── AboutPage.tsx    # Sobre Nós
│   ├── LoginPage.tsx    # Tela de Login
│   └── RegisterPage.tsx # Tela de Cadastro
├── services/            # Camada de integração com API (assíncrona)
│   ├── api.ts           # Cliente base e simulador de latência de rede
│   ├── productService.ts# Serviços de consulta de produtos
│   ├── drinkService.ts  # Serviços de consulta de bebidas
│   ├── aboutService.ts  # Serviços institucionais
│   └── authService.ts   # Serviços de login, cadastro e logout
├── types/               # Tipagens e interfaces TypeScript
│   ├── product.ts, drink.ts, cart.ts, user.ts, about.ts
├── utils/               # Formatadores (formatPrice), máscaras (formatCep) e validadores
├── styles/              # CSS global e Tailwind v4
├── App.tsx              # Configuração do React Router e Provedores globais
└── main.tsx             # Entry point React
```

---

## 🔌 Conectando a uma API Real (Backend)

Todos os dados consumidos pela aplicação passam pela camada `src/services/`, que simula respostas assíncronas com Promises e latência de rede.

Para integrar o projeto a um backend real:
1. Configure a URL base da API no arquivo `.env`:
   ```env
   VITE_API_URL=https://api.suadogueria.com/v1
   ```
2. Altere os métodos nos arquivos de `src/services/` para realizarem requisições HTTP (`fetch` ou `axios`). **Nenhum componente ou página precisará ser alterado!**

---

## 🛠️ Tecnologias Utilizadas

- **[React 18](https://react.dev/)** — Biblioteca para interfaces reativas
- **[Vite](https://vitejs.dev/)** — Build tool ultra-rápido
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática
- **[React Router v7](https://reactrouter.com/)** — Roteamento declarativo SPA
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Estilização moderna baseada em utilitários
- **[Lucide React](https://lucide.dev/)** — Conjunto consistente de ícones
- **[Radix UI](https://www.radix-ui.com/)** — Componentes acessíveis e customizáveis

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm**, **pnpm** ou **yarn**

### Passo a Passo

1. **Clone o repositório ou acesse a pasta do projeto:**
   ```bash
   cd dogueria-du-maluko
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173`.

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```

---

## 📄 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite |
| `npm run build` | Compila o projeto com TypeScript e gera o build otimizado para produção |

---

## 📝 Licença

Desenvolvido para a **Dogueria Du Maluko**. Todos os direitos reservados.