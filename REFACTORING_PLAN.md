# 🌭 Plano de Refatoração e Modularização da Dogueria Du Maluko

Este documento detalha o plano de ação passo a passo para transformar a aplicação monolítica (`src/app/App.tsx` com ~1.450 linhas) em uma arquitetura plana (*flat*), limpa, modular e desacoplada em camadas técnicas.

---

## 🎯 Decisões de Arquitetura Aprovadas

1. **Estrutura Plana em `src/`**:
   - Organização horizontal em camadas técnicas: `pages/`, `components/`, `context/`, `hooks/`, `services/`, `data/`, `types/`, `utils/` e `App.tsx` na raiz de `src/`.
2. **Roteamento Real com React Router**:
   - Migração para URLs declarativas: `/` (Home), `/cardapio` (Menu), `/sobre` (Sobre Nós), `/login` (Login), `/cadastro` (Cadastro).
3. **Persistência de Dados**:
   - `CartContext` e `AuthContext` integrados com `localStorage` para manter itens e sessão salvos mesmo após recarregar a página (F5).
4. **Camada de Serviços Desacoplada**:
   - Simulação assíncrona de requisições de API (`Promise` com delay de rede configurável). Para plugar no backend real no futuro, bastará alterar a URL base em `src/services/api.ts`.
5. **Garantia de Não Quebra (*Zero Downtime*)**:
   - O projeto continua compilando e funcionando a cada etapa para permitir testes manuais contínuos.

---

## 📁 Estrutura Alvo de Diretórios

```
src/
├── assets/          # Imagens, logotipos e mídias estáticas
├── components/      # Componentes visuais reutilizáveis
│   ├── auth/        # AuthLayout, FormField/Field
│   ├── cart/        # CartDropdown, CartButton
│   ├── layout/      # Header, Footer, PromoStrip
│   ├── products/    # ProductCard, DrinkCard, ProductModal
│   └── ui/          # Componentes base Shadcn / Radix
├── context/         # Provedores de estado global
│   ├── CartContext.tsx
│   └── AuthContext.tsx
├── data/            # Mock data estático puro
│   ├── products.data.ts
│   ├── drinks.data.ts
│   └── about.data.ts
├── hooks/           # Custom React hooks
│   ├── useCart.ts
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useDrinks.ts
│   └── useAbout.ts
├── pages/           # Telas da aplicação
│   ├── HomePage.tsx
│   ├── MenuPage.tsx
│   ├── AboutPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── services/        # Integração e simulação de API assíncrona
│   ├── api.ts              # Cliente base e simulador de rede
│   ├── productService.ts   # getProducts(), getProductById()
│   ├── drinkService.ts     # getDrinks(), getDrinksByCategory()
│   ├── aboutService.ts     # getAboutData()
│   └── authService.ts      # login(), register(), getCurrentUser(), logout()
├── types/           # Tipos TypeScript centralizados
│   ├── product.ts
│   ├── drink.ts
│   ├── cart.ts
│   ├── user.ts
│   └── about.ts
├── utils/           # Formatadores, máscaras e helpers
│   ├── formatters.ts       # formatPrice
│   ├── masks.ts            # formatCep
│   └── validators.ts       # validações de form
├── styles/          # Estilos e Tailwind CSS
├── App.tsx          # Roteamento e Provedores Globais
└── main.tsx         # Entry point React
```

---

## 📋 Status e Rastreamento das Etapas

### Fase 1: Fundação — Tipos e Utilitários
- [x] **Etapa 1.1**: Criar `src/types/` e tipagens completas (`product.ts`, `drink.ts`, `cart.ts`, `user.ts`, `about.ts`).
- [x] **Etapa 1.2**: Criar `src/utils/` (`formatters.ts`, `masks.ts`, `validators.ts`).
- [x] **Validação F1**: Teste de build com TypeScript para garantir zero erros.

### Fase 2: Camada de Dados e Serviços de API Assíncrona
- [x] **Etapa 2.1**: Extrair dados mockados para `src/data/` (`products.data.ts`, `drinks.data.ts`, `about.data.ts`).
- [x] **Etapa 2.2**: Criar cliente simulador de API `src/services/api.ts` (delay de rede com `Promise`).
- [x] **Etapa 2.3**: Criar `productService.ts` e `drinkService.ts`.
- [x] **Etapa 2.4**: Criar `aboutService.ts` e `authService.ts` (login, cadastro e sessão simulados).
- [x] **Validação F2**: Validação de chamadas assíncronas e tipagens de retorno.

### Fase 3: Estado Global com Persistência e Custom Hooks
- [x] **Etapa 3.1**: Criar `CartContext.tsx` e `useCart` (com persistência em `localStorage` e animação de bounce).
- [x] **Etapa 3.2**: Criar `AuthContext.tsx` e `useAuth` (com persistência em `localStorage`).
- [x] **Etapa 3.3**: Criar hooks de dados assíncronos (`useProducts`, `useDrinks`, `useAbout`).
- [x] **Validação F3**: Validar providers e hooks isoladamente.

### Fase 4: Componentes Reutilizáveis (UI, Layout e Produtos)
- [x] **Etapa 4.1**: Criar `Header.tsx`, `CartDropdown.tsx`, `Footer.tsx` e `PromoStrip.tsx` em `src/components/layout/` e `src/components/cart/`.
- [x] **Etapa 4.2**: Criar `ProductCard.tsx`, `DrinkCard.tsx` e `ProductModal.tsx` em `src/components/products/`.
- [x] **Etapa 4.3**: Criar `Field.tsx` e `AuthLayout.tsx` em `src/components/auth/`.
- [x] **Etapa 4.4**: Migrar componentes de `src/app/components/ui` para `src/components/ui`.
- [x] **Validação F4**: Testar compilação e isolamento visual dos componentes.

### Fase 5: Páginas Completas (*Pages / Views*)
- [x] **Etapa 5.1**: Criar `src/pages/HomePage.tsx`.
- [x] **Etapa 5.2**: Criar `src/pages/MenuPage.tsx`.
- [x] **Etapa 5.3**: Criar `src/pages/AboutPage.tsx`.
- [x] **Etapa 5.4**: Criar `src/pages/LoginPage.tsx`.
- [x] **Etapa 5.5**: Criar `src/pages/RegisterPage.tsx`.
- [x] **Validação F5**: Validação de páginas conectadas aos hooks e contextos.

### Fase 6: Roteamento com React Router, Orquestração e Finalização
- [x] **Etapa 6.1**: Configurar React Router DOM em `src/App.tsx` com rotas (`/`, `/cardapio`, `/sobre`, `/login`, `/cadastro`).
- [x] **Etapa 6.2**: Atualizar `src/main.tsx` para importar `src/App.tsx`.
- [x] **Etapa 6.3**: Remover o antigo `src/app/App.tsx` e diretórios obsoletos.
- [x] **Validação Final**: Build de produção (`npm run build`), teste de todas as rotas, carrinho, login/cadastro e responsividade.

---
*Este arquivo será atualizado passo a passo conforme as etapas forem concluídas.*
