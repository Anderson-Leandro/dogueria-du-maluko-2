import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { requireAuth } from "../middlewares/auth.js";
import { authRateLimit } from "../middlewares/rateLimit.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authRoutes = Router();

authRoutes.post("/register", authRateLimit, asyncHandler(AuthController.register));
authRoutes.post("/login", authRateLimit, asyncHandler(AuthController.login));
authRoutes.get("/me", requireAuth, asyncHandler(AuthController.me));
