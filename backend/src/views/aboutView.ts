import type { AboutModel } from "../models/AboutModel.js";

type AboutRecords = Awaited<ReturnType<typeof AboutModel.getAll>>;

/** Formato `AboutData` do front (src/types/about.ts) */
export function aboutView({ stats, timeline, team, values }: AboutRecords) {
  return {
    stats: stats.map(({ value, label }) => ({ value, label })),
    timeline: timeline.map(({ year, title, text }) => ({ year, title, text })),
    team: team.map(({ name, role, bio, imageUrl }) => ({ name, role, bio, img: imageUrl })),
    values: values.map(({ icon, title, text }) => ({ icon, title, text })),
  };
}
