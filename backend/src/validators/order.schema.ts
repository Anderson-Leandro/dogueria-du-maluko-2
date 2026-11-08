import { z } from "zod";
import { MAX_INT } from "./common.schema.js";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.number({ invalid_type_error: "Produto inválido." }).int().positive().max(MAX_INT, "Produto inválido."),
        qty: z
          .number({ invalid_type_error: "Quantidade inválida." })
          .int("Quantidade inválida.")
          .min(1, "Quantidade mínima é 1.")
          .max(99, "Quantidade máxima é 99."),
      }),
      { required_error: "Informe os itens do pedido." }
    )
    .min(1, "O pedido precisa ter ao menos 1 item.")
    .max(50, "O pedido pode ter no máximo 50 itens."),
  notes: z.string().trim().max(500, "Observação muito longa.").optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
