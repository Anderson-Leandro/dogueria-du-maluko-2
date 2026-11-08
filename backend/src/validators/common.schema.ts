import { z } from "zod";

/** Maior valor de um Int no banco (32 bits) */
export const MAX_INT = 2_147_483_647;

/** Parâmetro de rota `:id` numérico */
export const idParamSchema = z.object({
  id: z.coerce.number({ invalid_type_error: "Id inválido." }).int("Id inválido.").positive("Id inválido.").max(MAX_INT, "Id inválido."),
});
