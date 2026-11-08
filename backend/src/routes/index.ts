import { Router } from "express";
import { productRoutes } from "./product.routes.js";
import { drinkRoutes } from "./drink.routes.js";
import { aboutRoutes } from "./about.routes.js";
import { authRoutes } from "./auth.routes.js";
import { orderRoutes } from "./order.routes.js";
import { SettingsController } from "../controllers/SettingsController.js";

export const routes = Router();

routes.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

routes.get("/settings", SettingsController.show);
routes.use("/products", productRoutes);
routes.use("/drinks", drinkRoutes);
routes.use("/about", aboutRoutes);
routes.use("/auth", authRoutes);
routes.use("/orders", orderRoutes);
