import type { User } from "@prisma/client";

/** Formato `User` do front (src/types/user.ts). Nunca expõe passwordHash. */
export function userView(u: User) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    zipCode: u.zipCode,
    street: u.street,
    number: u.number,
    ...(u.complement && { complement: u.complement }),
  };
}

export function authView(u: User, token: string) {
  return { user: userView(u), token };
}
