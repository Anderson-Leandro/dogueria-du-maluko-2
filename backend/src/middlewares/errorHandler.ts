import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/HttpError.js";

/** Converte ZodError em { campo: mensagem }, no mesmo formato do FormErrors do front */
export function zodFields(error: ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, ...(err.fields && { fields: err.fields }) });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({ error: "Dados inválidos.", fields: zodFields(err) });
    return;
  }

  // JSON malformado no corpo da requisição
  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ error: "JSON inválido no corpo da requisição." });
    return;
  }

  // Demais erros de cliente do body-parser (413 corpo grande, 415 charset…)
  if (err?.expose === true && typeof err.status === "number" && err.status >= 400 && err.status < 500) {
    const messages: Record<number, string> = { 413: "Corpo da requisição muito grande." };
    res.status(err.status).json({ error: messages[err.status] ?? "Requisição inválida." });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor." });
};
