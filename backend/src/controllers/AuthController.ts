import type { Request, Response } from "express";
import { UserModel } from "../models/UserModel.js";
import { authView, userView } from "../views/userView.js";
import { loginSchema, registerSchema } from "../validators/auth.schema.js";
import { signToken } from "../utils/jwt.js";
import { HttpError } from "../utils/HttpError.js";

export const AuthController = {
  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const user = await UserModel.create(data);
    res.status(201).json(authView(user, signToken(user.id)));
  },

  async login(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);
    const user = await UserModel.authenticate(email, password);
    if (!user) throw new HttpError(401, "E-mail ou senha inválidos.");
    res.json(authView(user, signToken(user.id)));
  },

  async me(req: Request, res: Response) {
    const user = await UserModel.findById(req.userId!);
    // Token válido de um usuário que não existe mais
    if (!user) throw new HttpError(401, "Sessão inválida ou expirada. Faça login novamente.");
    res.json(userView(user));
  },
};
