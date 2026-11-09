#!/usr/bin/env bash
# Preparação do ambiente (Codespaces / Dev Containers). Seguro para rodar de novo:
# não recria o .env nem apaga o banco se já existirem.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "📦 Instalando dependências do front-end web (apps/web)..."
npm ci --prefix "$ROOT/apps/web"

if [ -f "$ROOT/apps/mobile/package-lock.json" ]; then
  echo "📦 Instalando dependências do app mobile (apps/mobile)..."
  npm ci --prefix "$ROOT/apps/mobile"
fi

# Túnel do Expo (npm run dev:mobile:tunnel): no Codespaces o celular não alcança a
# porta 8081, então o Expo usa o ngrok, que precisa estar instalado globalmente.
# Só dentro do Codespaces, para não instalar nada global no computador de quem roda
# este script localmente. Falha aqui não interrompe o resto da preparação.
if [ "${CODESPACES:-}" = "true" ] && ! npm ls -g @expo/ngrok >/dev/null 2>&1; then
  echo "🌐 Instalando @expo/ngrok (túnel do Expo para o app mobile)..."
  npm install -g @expo/ngrok@4.1.3 || echo "⚠️  Não foi possível instalar @expo/ngrok. Rode: npm i -g @expo/ngrok"
fi

echo "📦 Instalando dependências do backend..."
cd "$ROOT/backend"
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
echo "   2) npm run dev         # front web em :5173 (abra pela aba Portas)"
echo "   App mobile no celular: deixe a porta 3333 pública (aba Portas) e rode"
echo "   npm run dev:mobile:tunnel   (detalhes no README)"
echo "   Usuário demo: demo@maluko.com / 123456"
