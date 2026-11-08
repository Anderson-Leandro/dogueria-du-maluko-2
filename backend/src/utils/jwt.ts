import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

const ALGORITHM = "HS256";

export function signToken(userId: string): string {
  return jwt.sign({}, env.JWT_SECRET, {
    subject: userId,
    algorithm: ALGORITHM,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
}

/** Retorna o userId (sub) ou null se o token for inválido/expirado */
export function verifyToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: [ALGORITHM] });
    return typeof payload === "object" && typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
