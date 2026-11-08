import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt.js";
import { HttpError } from "../utils/HttpError.js";

/** Exige `Authorization: Bearer <token>` válido e popula `req.userId` */
export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization ?? "";
  const [scheme, token] = header.split(" ");

  const userId = scheme === "Bearer" && token ? verifyToken(token) : null;
  if (!userId) {
    next(new HttpError(401, "Sessão inválida ou expirada. Faça login novamente."));
    return;
  }

  req.userId = userId;
  next();
};
