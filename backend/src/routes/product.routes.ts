import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const productRoutes = Router();

productRoutes.get("/", asyncHandler(ProductController.index));
productRoutes.get("/:id", asyncHandler(ProductController.show));
