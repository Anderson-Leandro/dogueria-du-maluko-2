import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/HttpError.js";
import type { RegisterInput } from "../validators/auth.schema.js";

const BCRYPT_COST = 10;
// Hash fixo usado quando o e-mail não existe, para o tempo de resposta não revelar contas
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", BCRYPT_COST);

/** Model de usuários: cadastro, autenticação e consulta */
export const UserModel = {
  async create({ password, ...data }: RegisterInput) {
    try {
      return await prisma.user.create({
        data: { ...data, passwordHash: await bcrypt.hash(password, BCRYPT_COST) },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        throw new HttpError(409, "Este e-mail já está cadastrado.", {
          email: "Este e-mail já está cadastrado.",
        });
      }
      throw err;
    }
  },

  /** Retorna o usuário se e-mail e senha conferirem; senão null */
  async authenticate(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
    return user && ok ? user : null;
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
};
