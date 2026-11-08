import { Router } from "express";
import { OrderController } from "../controllers/OrderController.js";
import { requireAuth } from "../middlewares/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const orderRoutes = Router();

orderRoutes.use(requireAuth);
orderRoutes.post("/", asyncHandler(OrderController.create));
orderRoutes.get("/", asyncHandler(OrderController.index));
orderRoutes.get("/:id", asyncHandler(OrderController.show));
