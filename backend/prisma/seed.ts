/**
 * Seed do banco com o conteúdo que antes ficava mockado no front (src/data/*.data.ts).
 * Os ids dos produtos são preservados para manter válidos os carrinhos salvos no localStorage.
 * Somente para desenvolvimento: limpa TODAS as tabelas (inclusive usuários e pedidos) antes de inserir.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mockProducts } from "./seed-data/products.js";
import { mockDrinks, mockDrinkCategories } from "./seed-data/drinks.js";
import { mockAboutData } from "./seed-data/about.js";

const prisma = new PrismaClient();
const toCents = (reais: number) => Math.round(reais * 100);

async function main() {
  // O seed apaga TODAS as tabelas (inclusive usuários e pedidos): nunca em produção
  if (process.env.NODE_ENV === "production") {
    throw new Error("Seed bloqueado: NODE_ENV=production. Este script apaga usuários e pedidos.");
  }

  // Ordem respeita as FKs
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productIngredient.deleteMany();
  await prisma.product.deleteMany();
  await prisma.drinkCategory.deleteMany();
  await prisma.user.deleteMany();
  await prisma.storeStat.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.storeValue.deleteMany();

  // Categorias de bebida
  const categoryIdByKey = new Map<string, number>();
  for (const [position, cat] of mockDrinkCategories.entries()) {
    const created = await prisma.drinkCategory.create({ data: { ...cat, position } });
    categoryIdByKey.set(cat.key, created.id);
  }

  // Dogues
  for (const p of mockProducts) {
    await prisma.product.create({
      data: {
        id: p.id,
        type: "hotdog",
        name: p.name,
        shortDescription: p.shortDescription,
        fullDescription: p.fullDescription,
        priceCents: toCents(p.price),
        imageUrl: p.imageUrl,
        badge: "badge" in p ? p.badge : null,
        featured: "featured" in p ? Boolean(p.featured) : false,
        ingredients: {
          create: p.ingredients.map((name, position) => ({ name, position })),
        },
      },
    });
  }

  // Bebidas
  for (const d of mockDrinks) {
    const categoryId = categoryIdByKey.get(d.category);
    if (categoryId === undefined) {
      throw new Error(`Bebida "${d.name}" com categoria desconhecida: "${d.category}"`);
    }
    await prisma.product.create({
      data: {
        id: d.id,
        type: "drink",
        name: d.name,
        shortDescription: d.description,
        priceCents: toCents(d.price),
        imageUrl: d.imageUrl,
        categoryId,
      },
    });
  }

  // Conteúdo "Sobre"
  await prisma.storeStat.createMany({
    data: mockAboutData.stats.map((s, position) => ({ ...s, position })),
  });
  await prisma.timelineEvent.createMany({
    data: mockAboutData.timeline.map((t, position) => ({ ...t, position })),
  });
  await prisma.teamMember.createMany({
    data: mockAboutData.team.map(({ img, ...m }, position) => ({ ...m, imageUrl: img, position })),
  });
  await prisma.storeValue.createMany({
    data: mockAboutData.values.map((v, position) => ({ ...v, position })),
  });

  // Usuário de demonstração
  await prisma.user.create({
    data: {
      name: "Cliente Demo",
      email: "demo@maluko.com",
      passwordHash: await bcrypt.hash("123456", 10),
      zipCode: "09400000",
      street: "Rua das Palmeiras",
      number: "100",
    },
  });

  const [products, drinks] = await Promise.all([
    prisma.product.count({ where: { type: "hotdog" } }),
    prisma.product.count({ where: { type: "drink" } }),
  ]);
  console.log(`✅ Seed concluído: ${products} dogues, ${drinks} bebidas, usuário demo@maluko.com / 123456`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
