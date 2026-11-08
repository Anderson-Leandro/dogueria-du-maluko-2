import { prisma } from "../lib/prisma.js";

/** Model do conteúdo institucional (página "Sobre") */
export const AboutModel = {
  async getAll() {
    const order = { position: "asc" } as const;
    const [stats, timeline, team, values] = await Promise.all([
      prisma.storeStat.findMany({ orderBy: order }),
      prisma.timelineEvent.findMany({ orderBy: order }),
      prisma.teamMember.findMany({ orderBy: order }),
      prisma.storeValue.findMany({ orderBy: order }),
    ]);
    return { stats, timeline, team, values };
  },
};
