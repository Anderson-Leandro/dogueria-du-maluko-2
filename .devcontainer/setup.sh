#!/usr/bin/env bash
# Preparação do ambiente (Codespaces / Dev Containers). Seguro para rodar de novo:
# não recria o .env nem apaga o banco se já existirem.
set -euo pipefail

echo "📦 Instalando dependências do front-end..."
npm ci

echo "📦 Instalando dependências do backend..."
cd backend
npm ci

if [ ! -f .env ]; then
  echo "🔐 Criando backend/.env com um JWT_SECRET aleatório..."
  cp .env.example .env
  SECRET=$(node -e "console.log(require('crypto').randomBytes(48).toString('hex'))")
  sed -i "s|^JWT_SECRET=.*|JWT_SECRET=\"${SECRET}\"|" .env
fi

npx prisma generate

if [ ! -f prisma/dev.db ]; then
  echo "🗄️  Criando o banco e populando com os dados iniciais..."
  npx prisma migrate deploy
  npm run db:seed
else
  echo "🗄️  Banco já existe: aplicando migrations pendentes (sem apagar dados)..."
  npx prisma migrate deploy
fi

echo ""
echo "✅ Ambiente pronto! Abra dois terminais:"
echo "   1) npm run dev:api     # API em :3333"
echo "   2) npm run dev         # front em :5173 (abra pela aba Portas)"
echo "   Usuário demo: demo@maluko.com / 123456"
