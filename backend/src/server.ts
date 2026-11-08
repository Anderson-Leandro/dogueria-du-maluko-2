import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

const server = app.listen(env.PORT, () => {
  console.log(`🌭 API da Dogueria Du Maluko em http://localhost:${env.PORT}/api`);
});

let shuttingDown = false;

/** Para de aceitar conexões, espera as requisições em andamento e só então desconecta o banco */
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  // Força a saída se alguma conexão travar
  setTimeout(() => process.exit(1), 10_000).unref();
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
