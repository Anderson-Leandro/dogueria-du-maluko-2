import { z } from "zod";

export const drinksQuerySchema = z.object({
  category: z.string().trim().min(1).max(40).optional(),
});
